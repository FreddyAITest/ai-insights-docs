# 📈 ETF Dashboard

Interactive stock price dashboard for tracking global ETFs with live charts and historical data.

## ETFs Tracked

| Ticker | Name | Exchange | Currency |
|--------|------|----------|----------|
| IWDA.AS | iShares Core MSCI World UCITS ETF | Euronext Amsterdam | EUR |
| VWRL.L | Vanguard FTSE All-World UCITS ETF | London Stock Exchange | GBP |
| IDVY.L | iShares Euro Dividend UCITS ETF | London Stock Exchange | GBP |

## Features

- ✅ Real-time price display with daily changes
- ✅ Interactive charts (Chart.js)
- ✅ Multiple time periods: 1D, 5D, 1M, 3M, 6M, 1Y, 5Y, MAX
- ✅ Auto-refresh data every 24 hours
- ✅ Mobile responsive design
- ✅ Local JSON caching for fast loading

## Installation

### Prerequisites

- Python 3.9+
- pip

### Install Dependencies

```bash
pip3 install yfinance
```

## Usage

### Manual Data Fetch

```bash
cd /root/.openclaw/workspace/stock-dashboard
python3 fetch-stock-data.py
```

### Quick Price Check

```bash
python3 fetch-stock-data.py --prices
```

### Force Refresh Data

```bash
python3 fetch-stock-data.py --force
```

## File Structure

```
stock-dashboard/
├── fetch-stock-data.py      # Main data fetching script
├── cache/                   # Cached JSON data files
│   ├── IWDA.AS_1d.json
│   ├── IWDA.AS_1mo.json
│   ├── IWDA.AS_1y.json
│   ├── VWRL.L_*.json
│   └── IDVY.L_*.json
├── stock-data.log          # Update logs
└── README.md               # This file
```

## Automated Updates (Cron Job)

Data is automatically updated every 24 hours via cron job.

### Cron Schedule

```bash
0 6 * * * cd /root/.openclaw/workspace/stock-dashboard && /usr/bin/python3 fetch-stock-data.py >> stock-data.log 2>&1
```

This runs daily at 6:00 AM UTC.

### View Logs

```bash
tail -f stock-data.log
```

## Dashboard Access

The dashboard is available at:
- Local: `/tmp/docs-website/stocks.html`
- Live: https://silver-cheesecake-cd9dfd.netlify.app/stocks.html

## Data Source

All data is fetched from Yahoo Finance using the `yfinance` library.

- **Library**: https://github.com/ranaroussi/yfinance
- **Charts**: https://www.chartjs.org/

## Troubleshooting

### No Data Showing

1. Check if cache files exist: `ls -la cache/`
2. Run manual fetch: `python3 fetch-stock-data.py`
3. Check logs: `tail stock-data.log`

### API Errors

If Yahoo Finance API is unavailable, the script will use the most recent cached data.

### Chart Not Loading

Ensure Chart.js CDN is accessible. The dashboard requires an internet connection to load the Chart.js library.

## License

MIT License - Feel free to use and modify.
