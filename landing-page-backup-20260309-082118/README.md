# Landing Page with Stock Dashboard

## Setup Instructions

### 1. Get a Finnhub API Key

1. Go to https://finnhub.io/
2. Click "Get Free API Key"
3. Sign up with your email
4. Copy your API key

### 2. Add API Key to Netlify

1. Log in to your Netlify dashboard
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable**
5. Add:
   - **Key:** `FINNHUB_API_KEY`
   - **Value:** (paste your API key from Finnhub)
6. Click **Save**

### 3. Deploy to Netlify

Push your changes to GitHub and Netlify will auto-deploy, or run:

```bash
npm run build
netlify deploy --prod
```

### 4. Test the Stock Dashboard

1. Open your deployed site
2. Click "View Stock Dashboard"
3. Select an ETF and time period
4. Data will load from the Netlify Function

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
landing-page/
├── netlify/
│   └── functions/
│       └── get-stock-data.js    # Serverless function for stock data
├── src/
│   ├── App.jsx                   # Main app component
│   └── StockDashboard.jsx        # Stock dashboard component
├── netlify.toml                  # Netlify configuration
├── package.json
└── vite.config.js
```

## API Limits (Finnhub Free Tier)

- **60 API calls per minute**
- **1 year of historical data**
- US market ETFs (LSE and AMS tickers supported)

If you hit rate limits, wait a minute and refresh.
