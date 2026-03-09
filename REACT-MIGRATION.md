# React App Migration - AI Insights Website

## Overview

The AI Insights website has been migrated from static HTML files to a single-page React application with client-side routing.

## Project Structure

```
/root/.openclaw/workspace/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Navigation header with dark mode toggle
│   │   ├── Footer.jsx       # Site footer
│   │   └── ThemeToggle.jsx  # Dark/light mode toggle button
│   ├── context/
│   │   └── ThemeContext.jsx # Dark mode state management
│   ├── pages/
│   │   ├── Home.jsx         # Homepage (from index.html)
│   │   ├── About.jsx        # About page (from about.html)
│   │   ├── Blog.jsx         # Blog listing (from blog.html)
│   │   ├── Contact.jsx      # Contact form (from contact.html)
│   │   └── Legal.jsx        # Privacy & Impressum (from datenschutz.html + impressum.html)
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   ├── index.css            # Tailwind styles
│   └── StockDashboard.jsx   # Stock dashboard component
├── index.html               # HTML entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
├── netlify.toml
└── backup/
    └── html-files/          # Original HTML files backed up
```

## Routes

- `/` → Home
- `/about` → About
- `/blog` → Blog listing
- `/blog/:slug` → Blog post (placeholder)
- `/contact` → Contact form
- `/dashboard` → Stock Dashboard
- `/legal/privacy` → Datenschutzerklärung
- `/legal/impressum` → Impressum

## Features

### Dark Mode
- Toggle between light and dark themes
- Preference persisted in localStorage
- System-wide theme support via Tailwind's `dark:` classes

### React Router
- Client-side routing for smooth navigation
- SPA redirects configured in netlify.toml

### Newsletter Signup
- Brevo (Sendinblue) integration maintained
- Form validation and error handling
- Double opt-in compliance (DSGVO)

### Contact Form
- Netlify forms integration ready
- Form validation
- Success/error states

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The app is configured for Netlify deployment:

1. Build command: `npm run build`
2. Publish directory: `dist`
3. SPA redirects handled automatically

## Backup

Original files backed up to:
- `landing-page-backup-YYYYMMDD-HHMMSS/` - Original React app structure
- `backup/html-files/` - Static HTML files

## Migration Date

March 9, 2026
