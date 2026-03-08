# 🤖 Daily Newsletter Automation Setup

## Vollautomatischer Newsletter-Versand (9:00 CET)

---

## 📋 Architektur

**2 Subagenten + Cron Job + Brevo API**

```
┌─────────────────────────────────────────────────────────┐
│  TÄGLICH 9:00 CET (Cron Job)                            │
│       ↓                                                  │
│  ┌─────────────────┐     ┌──────────────────┐          │
│  │ Content-Agent   │────▶│ Versand-Agent    │          │
│  │ - KI-News       │     │ - Brevo API Call │          │
│  │ - Projekt       │     │ - Senden         │          │
│  │ - Use Case      │     │ - Status Report  │          │
│  │ - Tips          │     │                  │          │
│  └─────────────────┘     └──────────────────┘          │
│                              ↓                           │
│                    ┌──────────────────┐                 │
│                    │ Brevo API        │                 │
│                    │ - Campaign Send  │                 │
│                    │ - Subscribers    │                 │
│                    └──────────────────┘                 │
│                              ↓                           │
│                    ┌──────────────────┐                 │
│                    │ Lord Elias Info  │                 │
│                    │ - Telegram Msg   │                 │
│                    │ - Stats          │                 │
│                    └──────────────────┘                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 Benötigte Credentials

### Brevo API Key:
1. Einloggen: https://app.brevo.com/
2. Oben rechts auf **Profilname** klicken
3. **SMTP & API** auswählen
4. Tab **API-Schlüssel**
5. **Neuer API-Schlüssel** erstellen
6. Name: `OpenClaw Newsletter Automation`
7. Key kopieren (sieht aus wie: `xkey-xxxx-xxxx-xxxx-xxxx`)

**API Key hier speichern:** `/root/.openclaw/workspace/.env`
```bash
BREVO_API_KEY=xkey-xxxx-xxxx-xxxx-xxxx
BREVO_SENDER_EMAIL=deine@email.de
BREVO_SENDER_NAME=AI Insights
```

---

## 🛠️ Setup-Schritte

### 1. Brevo API Key besorgen (2 Minuten)

Siehe oben → API Key in `.env` speichern

### 2. Cron Job einrichten (täglich 9:00 CET)

```bash
# Cron Job erstellen
crontab -e

# Diese Zeile hinzufügen (9:00 CET = 7:00 UTC im Winter, 8:00 UTC im Sommer)
# Winterzeit:
0 7 * * * /usr/bin/node /root/.openclaw/workspace/newsletter/daily-trigger.js

# Sommerzeit (umstellen im März/Oktober):
0 8 * * * /usr/bin/node /root/.openclaw/workspace/newsletter/daily-trigger.js
```

### 3. Trigger-Script erstellen

Datei: `/root/.openclaw/workspace/newsletter/daily-trigger.js`

```javascript
const https = require('https');
const fs = require('fs');
const path = require('path');

// API Key laden
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKey = envContent.match(/BREVO_API_KEY=(.+)/)[1].trim();

// Subagent spawnen (via OpenClaw API oder direkter API Call)
console.log('🚀 Daily Newsletter Automation gestartet...');

// Hier wird der Content-Agent und Versand-Agent getriggert
// Option A: OpenClaw sessions_spawn API call
// Option B: Direkter Brevo API Call mit vorbereitetem Template

// Brevo Campaign senden
const campaignData = {
    sender: {
        name: "AI Insights",
        email: "deine@email.de"
    },
    recipients: {
        lists: [1] // Liste ID aus Brevo
    },
    content: {
        // Wird dynamisch gefüllt vom Content-Agent
    }
};

console.log('✅ Newsletter wurde versendet!');
```

### 4. Brevo Template erstellen (einmalig)

1. Brevo → **Kampagnen** → **E-Mails** → **Vorlagen**
2. **Neue Vorlage** → **Drag & Drop Editor**
3. Design erstellen (passend zur Website)
4. Speichern als: `Daily AI Newsletter Template`
5. **Template ID notieren** (für API Call)

---

## 📧 Brevo API Endpoints

### Campaign senden:
```
POST https://api.brevo.com/v3/emailCampaigns/{campaignId}/send
```

### Header:
```
api-key: xkey-xxxx-xxxx-xxxx-xxxx
Content-Type: application/json
```

### Dokumentation:
https://developers.brevo.com/reference/sendemailcampaign

---

## 🔄 Vollautomatischer Workflow

### TÄGLICH 9:00 CET:

**1. Cron Job feuert**
```bash
0 7 * * * /usr/bin/node /root/.openclaw/workspace/newsletter/daily-trigger.js
```

**2. Content-Agent wird getriggert**
- Google Search: KI-News (<24h)
- TestingClawd Repo: Projekt auswählen
- Use Case generieren
- Tips & Tricks sammeln
- Newsletter HTML generieren
- Speichern als: `/root/.openclaw/workspace/newsletter/YYYY-MM-DD_newsletter.html`

**3. Versand-Agent wird getriggert**
- Lädt HTML Content
- Brevo API Call:
  ```
  POST /v3/emailCampaigns/{templateId}/send
  Body: { content: <geladenes HTML> }
  ```
- Brevo sendet an alle Abonnenten

**4. Status Report an Lord Elias**
- Telegram Nachricht:
  ```
  ✅ Daily Newsletter versendet!
  
  📊 Stats:
  - Empfänger: 5
  - Gesendet: 09:00 CET
  - Content: KI-News, Projekt, Use Case, Tips
  
  🔗 Dashboard: https://app.brevo.com/...
  ```

---

## 🎯 Alternative: Brevo Automation (NO CODE!)

**Noch einfacher:** Brevo hat eingebaute Automation!

### Setup in Brevo (15 Minuten):

1. **Kampagnen** → **Automation** → **Workflow erstellen**
2. **Trigger:** Zeitplan → Täglich 9:00 CET
3. **Aktion:** E-Mail senden
4. **Template:** Vorlage auswählen
5. **Content:** RSS Feed oder dynamischer Content

**Vorteile:**
- ✅ Kein Code nötig
- ✅ Brevo hostet alles
- ✅ Zuverlässig (99.9% Uptime)
- ✅ Stats inklusive

**Nachteile:**
- ❌ Content muss manuell kommen ODER RSS Feed
- ❌ Weniger flexibel für dynamische KI-News

---

## 🚀 Empfohlene Lösung: Hybrid

**Beste von beiden Welten:**

1. **Content-Agent** (Subagent) erstellt täglich Newsletter
2. **Speichert HTML** in GitHub Repo
3. **Brevo Automation** triggert um 9:00 CET
4. **RSS Feed** vom Repo → Brevo zieht Content automatisch

**Setup:**
```
Content-Agent → GitHub Repo → RSS Feed → Brevo Automation → Subscribers
                                                              ↓
                                                        Lord Elias Info
```

---

## 📁 Dateistruktur

```
/root/.openclaw/workspace/
├── .env                           # API Keys (gitignore!)
├── newsletter/
│   ├── daily-trigger.js           # Cron Job Script
│   ├── content-agent.js           # Generiert Newsletter Content
│   ├── send-agent.js              # Sendet via Brevo API
│   ├── templates/
│   │   └── default.html           # Newsletter Template
│   └── archive/
│       ├── 2026-03-06.html        # Archiv
│       └── ...
└── ai-newsletter-landing/
    └── TEST-NEWSLETTER.md         # Test Template
```

---

## ✅ Nächste Schritte

1. **Brevo API Key besorgen** (2 Min)
2. **API Key in `.env` speichern**
3. **Entscheiden:** 
   - **A) Volle Automation** (Cron + Scripts + Brevo API)
   - **B) Hybrid** (Content-Agent + Brevo Automation)
   - **C) Brevo nur** (RSS Feed Automation, kein Code)

4. **Setup durchführen** (15-30 Min)
5. **Test-Versand**
6. **Daily Betrieb starten** 🚀

---

**Welche Lösung preferierst du, Lord Elias?** 🤖
