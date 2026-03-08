const https = require('https');

// ETF Configuration (matches your Python script)
const ETFS = {
  'IWDA.AS': {
    name: 'MSCI World',
    description: 'iShares Core MSCI World UCITS ETF',
    currency_symbol: '€',
    finnhub_symbol: 'IWDA.AS'
  },
  'VWRL.L': {
    name: 'FTSE All-World',
    description: 'Vanguard FTSE All-World UCITS ETF',
    currency_symbol: '$',
    finnhub_symbol: 'VWRL.L'
  },
  'IDVY.L': {
    name: 'High Dividend',
    description: 'iShares Euro Dividend UCITS ETF',
    currency_symbol: '€',
    finnhub_symbol: 'IDVY.L'
  }
};

const PERIODS = {
  '1d': 1,
  '5d': 5,
  '1mo': 30,
  '3mo': 90,
  '6mo': 180,
  '1y': 365,
  '5y': 1825,
  'max': 1825 // Finnhub free tier: max 1 year
};

/**
 * Fetch historical stock data from Finnhub API
 */
async function fetchStockData(symbol, days) {
  const apiKey = process.env.FINNHUB_API_KEY;
  const finnhubSymbol = ETFS[symbol]?.finnhub_symbol || symbol;
  
  return new Promise((resolve, reject) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const fromTime = currentTime - (days * 24 * 60 * 60);
    
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${finnhubSymbol}&resolution=D&from=${fromTime}&to=${currentTime}&token=${apiKey}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (e) {
          reject(new Error('Failed to parse API response'));
        }
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

/**
 * Fetch current quote from Finnhub API
 */
async function fetchQuote(symbol) {
  const apiKey = process.env.FINNHUB_API_KEY;
  const finnhubSymbol = ETFS[symbol]?.finnhub_symbol || symbol;
  
  return new Promise((resolve, reject) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${finnhubSymbol}&token=${apiKey}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (e) {
          reject(new Error('Failed to parse quote response'));
        }
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { symbol, period } = event.queryStringParameters || {};
    
    // Validate symbol
    if (!symbol || !ETFS[symbol]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid symbol. Use: IWDA.AS, VWRL.L, or IDVY.L'
        })
      };
    }

    // Validate period
    if (!period || !PERIODS[period]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid period. Use: 1d, 5d, 1mo, 3mo, 6mo, 1y, 5y, max'
        })
      };
    }

    const days = PERIODS[period];
    const etfInfo = ETFS[symbol];

    // Fetch historical data
    const historicalData = await fetchStockData(symbol, days);
    
    if (historicalData.s !== 'ok') {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'No data available from Finnhub',
          status: historicalData.s
        })
      };
    }

    // Fetch current quote
    const quote = await fetchQuote(symbol);
    
    // Calculate price change
    const closes = historicalData.c || [];
    const currentPrice = quote.c || closes[closes.length - 1] || 0;
    const previousClose = closes.length > 1 ? closes[closes.length - 2] : currentPrice;
    const priceChange = currentPrice - previousClose;
    const priceChangePercent = previousClose > 0 ? (priceChange / previousClose) * 100 : 0;

    // Build response
    const responseData = {
      ticker: symbol,
      name: etfInfo.name,
      description: etfInfo.description,
      currency: 'USD', // Finnhub returns USD for most ETFs
      currency_symbol: etfInfo.currency_symbol,
      current_price: currentPrice,
      price_change: parseFloat(priceChange.toFixed(2)),
      price_change_percent: parseFloat(priceChangePercent.toFixed(2)),
      period: period,
      fetched_at: new Date().toISOString(),
      data_points: closes.length,
      dates: historicalData.t.map(ts => new Date(ts * 1000).toISOString().split('T')[0]),
      prices: closes.map(p => parseFloat(p.toFixed(2))),
      volumes: historicalData.v || [],
      highs: historicalData.h ? historicalData.h.map(p => parseFloat(p.toFixed(2))) : [],
      lows: historicalData.l ? historicalData.l.map(p => parseFloat(p.toFixed(2))) : []
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseData)
    };

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch stock data',
        message: error.message
      })
    };
  }
};
