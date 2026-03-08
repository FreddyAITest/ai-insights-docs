# 📚 AI Insights Documentation

Welcome to the complete documentation for AI Insights automation tools!

## 🌐 Live Website

**Deployed on Netlify:** [Coming Soon]

## 📖 Available Guides

### 📝 Blog Posts

- **[Die Zukunft der Generativen KI](blog/post-1.html)** - Was kommt nach ChatGPT? (German)
- **[Machine Learning in der Praxis](blog/post-2.html)** - Erfolgsbeispiele aus der Industrie (German)
- **[KI-Sicherheit](blog/post-3.html)** - Herausforderungen und Lösungen für 2026 (German)
- **[The Digital Paper Empire](blog/post-4.html)** - Building an AI Documentation System (English)

### 📦 System & Setup

- **[DNF Package Manager Guide](docs/DNF-GUIDE.md)** - Complete guide to installing software on AlmaLinux

### 📧 Newsletter Automation

- **[Newsletter Setup Guide](docs/newsletter/SETUP-GUIDE.md)** - Set up fully automated daily newsletters with Brevo

### 🔍 Research Automation

- **[Free Search APIs Comparison](docs/research/FREE-SEARCH-APIS-2026.md)** - Comparison of free web search APIs (Tavily, Serper, etc.)
- **[Notion Integration Guide](docs/research/NOTION-SETUP.md)** - Connect research to Notion for automatic uploads

## 🚀 Quick Start

### Newsletter Automation

```bash
cd /root/.openclaw/workspace/newsletter
export $(cat ../.env | grep -v '^#' | xargs)
node send-daily.js
```

### Research Automation

```bash
cd /root/.openclaw/workspace/research
export $(cat ../.env | grep -v '^#' | xargs)
node research-automation.js "Your research topic"
```

### Upload to GitHub

```bash
cd /root/.openclaw/workspace/research
node upload-to-github.js
```

## 📁 Project Structure

```
/workspace
├── docs/                      # Documentation
│   ├── DNF-GUIDE.md
│   ├── newsletter/
│   │   └── SETUP-GUIDE.md
│   └── research/
│       ├── FREE-SEARCH-APIS-2026.md
│       └── NOTION-SETUP.md
├── newsletter/                # Newsletter automation
│   ├── send-daily.js
│   └── run-daily.sh
└── research/                  # Research automation
    ├── research-automation.js
    ├── upload-to-github.js
    └── archive/
```

## 🔗 External Links

- **Brevo Dashboard:** https://app.brevo.com/
- **Tavily Dashboard:** https://app.tavily.com/
- **Notion:** https://www.notion.so/
- **GitHub:** https://github.com/FreddyAITest/TestingClawd

## 📞 Support

For questions or issues, check the individual guides or contact the team.

---

**Last Updated:** March 5, 2026
**Version:** 1.0.0
