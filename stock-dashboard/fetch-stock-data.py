#!/usr/bin/env python3
"""
ETF Data Fetcher Script
Fetches historical stock data for ETFs and caches it as JSON files.
Auto-updates via cron job every 24 hours.

ETFs tracked:
- IWDA.AS: iShares Core MSCI World UCITS ETF
- VWRL.L: Vanguard FTSE All-World UCITS ETF
- IDVY.L: iShares Euro Dividend UCITS ETF (High Dividend alternative)
"""

import yfinance as yf
import json
import os
import logging
from datetime import datetime
from pathlib import Path

# Configuration
CONFIG = {
    'tickers': {
        'IWDA.AS': {
            'name': 'MSCI World',
            'description': 'iShares Core MSCI World UCITS ETF',
            'currency_symbol': '€'
        },
        'VWRL.L': {
            'name': 'FTSE All-World',
            'description': 'Vanguard FTSE All-World UCITS ETF',
            'currency_symbol': '$'
        },
        'IDVY.L': {
            'name': 'High Dividend',
            'description': 'iShares Euro Dividend UCITS ETF',
            'currency_symbol': '€'
        }
    },
    'periods': {
        '1d': '1d',
        '5d': '5d',
        '1mo': '1mo',
        '3mo': '3mo',
        '6mo': '6mo',
        '1y': '1y',
        '5y': '5y',
        'max': 'max'
    }
}

# Paths
SCRIPT_DIR = Path(__file__).parent.resolve()
CACHE_DIR = SCRIPT_DIR / 'cache'
LOG_FILE = SCRIPT_DIR / 'stock-data.log'

# Ensure cache directory exists
CACHE_DIR.mkdir(exist_ok=True)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


def fetch_ticker_data(ticker_symbol: str, period: str) -> dict:
    """
    Fetch historical data for a single ticker and period.
    
    Args:
        ticker_symbol: Yahoo Finance ticker symbol (e.g., 'IWDA.AS')
        period: Time period (e.g., '1mo', '1y', 'max')
    
    Returns:
        Dictionary with dates, prices, and metadata
    """
    try:
        ticker = yf.Ticker(ticker_symbol)
        
        # Fetch historical data
        data = ticker.history(period=period)
        
        if data.empty:
            logger.warning(f"No data found for {ticker_symbol} period {period}")
            return None
        
        # Get current price info
        info = ticker.info
        current_price = info.get('currentPrice', info.get('regularMarketPrice', data['Close'].iloc[-1]))
        
        # Calculate price change
        if len(data) > 1:
            previous_close = data['Close'].iloc[-2]
            price_change = current_price - previous_close
            price_change_percent = (price_change / previous_close) * 100
        else:
            price_change = 0
            price_change_percent = 0
        
        # Prepare data for JSON
        result = {
            'ticker': ticker_symbol,
            'name': CONFIG['tickers'].get(ticker_symbol, {}).get('name', ticker_symbol),
            'description': CONFIG['tickers'].get(ticker_symbol, {}).get('description', ''),
            'currency': info.get('currency', 'USD'),
            'currency_symbol': CONFIG['tickers'].get(ticker_symbol, {}).get('currency_symbol', '$'),
            'current_price': current_price,
            'price_change': price_change,
            'price_change_percent': price_change_percent,
            'period': period,
            'fetched_at': datetime.now().isoformat(),
            'data_points': len(data),
            'dates': data.index.strftime('%Y-%m-%d').tolist(),
            'prices': data['Close'].round(2).tolist(),
            'volumes': data['Volume'].tolist() if 'Volume' in data.columns else [],
            'highs': data['High'].round(2).tolist() if 'High' in data.columns else [],
            'lows': data['Low'].round(2).tolist() if 'Low' in data.columns else []
        }
        
        return result
        
    except Exception as e:
        logger.error(f"Error fetching {ticker_symbol} {period}: {str(e)}")
        return None


def save_to_cache(data: dict, ticker_symbol: str, period: str) -> bool:
    """
    Save fetched data to JSON cache file.
    
    Args:
        data: Dictionary with price data
        ticker_symbol: Yahoo Finance ticker symbol
        period: Time period
    
    Returns:
        True if successful, False otherwise
    """
    try:
        filename = f"{ticker_symbol}_{period}.json"
        filepath = CACHE_DIR / filename
        
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        
        logger.info(f"Saved {filename} ({data['data_points']} data points)")
        return True
        
    except Exception as e:
        logger.error(f"Error saving cache for {ticker_symbol} {period}: {str(e)}")
        return False


def load_from_cache(ticker_symbol: str, period: str) -> dict:
    """
    Load data from cache file.
    
    Args:
        ticker_symbol: Yahoo Finance ticker symbol
        period: Time period
    
    Returns:
        Dictionary with price data or None if not found
    """
    try:
        filename = f"{ticker_symbol}_{period}.json"
        filepath = CACHE_DIR / filename
        
        if not filepath.exists():
            return None
        
        with open(filepath, 'r') as f:
            return json.load(f)
            
    except Exception as e:
        logger.error(f"Error loading cache for {ticker_symbol} {period}: {str(e)}")
        return None


def fetch_all_data(force_refresh: bool = False) -> dict:
    """
    Fetch data for all tickers and periods.
    
    Args:
        force_refresh: If True, fetch from API even if cache exists
    
    Returns:
        Dictionary with all fetched data
    """
    logger.info("=" * 60)
    logger.info("Starting ETF data fetch")
    logger.info("=" * 60)
    
    results = {
        'tickers': {},
        'last_updated': datetime.now().isoformat(),
        'status': 'success'
    }
    
    success_count = 0
    total_count = len(CONFIG['tickers']) * len(CONFIG['periods'])
    
    for ticker_symbol, ticker_info in CONFIG['tickers'].items():
        results['tickers'][ticker_symbol] = {
            'name': ticker_info['name'],
            'description': ticker_info['description'],
            'currency_symbol': ticker_info['currency_symbol'],
            'periods': {}
        }
        
        for period_key, period_value in CONFIG['periods'].items():
            # Try cache first
            if not force_refresh:
                cached_data = load_from_cache(ticker_symbol, period_value)
                if cached_data:
                    # Check if cache is less than 24 hours old
                    fetched_at = datetime.fromisoformat(cached_data.get('fetched_at', '2000-01-01'))
                    age_hours = (datetime.now() - fetched_at).total_seconds() / 3600
                    
                    if age_hours < 24:
                        logger.info(f"Using cached data for {ticker_symbol} {period_key} ({age_hours:.1f}h old)")
                        results['tickers'][ticker_symbol]['periods'][period_key] = cached_data
                        success_count += 1
                        continue
            
            # Fetch from API
            logger.info(f"Fetching {ticker_symbol} {period_key}...")
            data = fetch_ticker_data(ticker_symbol, period_value)
            
            if data:
                if save_to_cache(data, ticker_symbol, period_value):
                    results['tickers'][ticker_symbol]['periods'][period_key] = data
                    success_count += 1
            else:
                # Try to use old cache if fetch fails
                cached_data = load_from_cache(ticker_symbol, period_value)
                if cached_data:
                    logger.warning(f"Using stale cache for {ticker_symbol} {period_key}")
                    results['tickers'][ticker_symbol]['periods'][period_key] = cached_data
                    success_count += 1
    
    results['success_count'] = success_count
    results['total_count'] = total_count
    
    if success_count == total_count:
        logger.info(f"✓ All {total_count} data fetches successful")
    else:
        logger.warning(f"⚠ {success_count}/{total_count} data fetches successful")
    
    return results


def get_current_prices() -> dict:
    """
    Get current prices for all tickers (quick summary).
    
    Returns:
        Dictionary with current prices and changes
    """
    prices = {}
    
    for ticker_symbol, ticker_info in CONFIG['tickers'].items():
        try:
            ticker = yf.Ticker(ticker_symbol)
            info = ticker.info
            data = ticker.history(period='1d')
            
            current_price = info.get('currentPrice', info.get('regularMarketPrice'))
            
            if len(data) > 1:
                previous_close = data['Close'].iloc[-2]
                price_change = current_price - previous_close
                price_change_percent = (price_change / previous_close) * 100
            else:
                price_change = 0
                price_change_percent = 0
            
            prices[ticker_symbol] = {
                'name': ticker_info['name'],
                'currency_symbol': ticker_info['currency_symbol'],
                'current_price': current_price,
                'price_change': price_change,
                'price_change_percent': price_change_percent
            }
            
        except Exception as e:
            logger.error(f"Error getting current price for {ticker_symbol}: {str(e)}")
            # Try cache
            cached = load_from_cache(ticker_symbol, '1d')
            if cached:
                prices[ticker_symbol] = {
                    'name': ticker_info['name'],
                    'currency_symbol': ticker_info['currency_symbol'],
                    'current_price': cached.get('current_price'),
                    'price_change': cached.get('price_change', 0),
                    'price_change_percent': cached.get('price_change_percent', 0)
                }
    
    return prices


if __name__ == '__main__':
    import sys
    
    # Parse command line arguments
    force_refresh = '--force' in sys.argv or '-f' in sys.argv
    quick_prices = '--prices' in sys.argv or '-p' in sys.argv
    
    if quick_prices:
        # Quick price summary
        prices = get_current_prices()
        print("\n=== Current ETF Prices ===\n")
        for ticker, data in prices.items():
            change = data['price_change_percent']
            sign = '+' if change >= 0 else ''
            print(f"{ticker} ({data['name']}): {data['currency_symbol']}{data['current_price']:.2f} {sign}{change:.2f}%")
        print()
    else:
        # Full data fetch
        results = fetch_all_data(force_refresh=force_refresh)
        print(f"\n{'=' * 60}")
        print(f"Fetch complete: {results['success_count']}/{results['total_count']} successful")
        print(f"{'=' * 60}\n")
