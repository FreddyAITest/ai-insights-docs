# 🤖 Daily Newsletter Automation - Setup Guide

## ✅ Files Created

```
/root/.openclaw/workspace/
├── .env                              # API credentials (ADD YOUR BREVO API KEY!)
└── newsletter/
    ├── send-daily.js                 # Main automation script
    ├── run-daily.sh                  # Cron job wrapper
    ├── archive/                      # Newsletter archive (auto-created)
    └── cron.log                      # Execution logs (auto-created)
```

---

## 🔑 STEP 1: Add Your Brevo API Key (2 MINUTES)

### Get API Key from Brevo:

1. **Login:** https://app.brevo.com/
2. **Click** your profile name (top right)
3. **Select** "SMTP & API"
4. **Tab** "API Keys"
5. **Click** "Create a New API Key"
6. **Name:** `OpenClaw Automation`
7. **Copy** the key (starts with `xkey-`)

### Add to .env file:

```bash
nano /root/.openclaw/workspace/.env
```

Replace this line:
```
BREVO_API_KEY=xkey-PLACEHOLDER-replace-with-your-actual-key
```

With your real key:
```
BREVO_API_KEY=xkey-your-actual-key-here
```

Save (Ctrl+O, Enter, Ctrl+X)

---

## ⏰ STEP 2: Install Cron Job (1 MINUTE)

### Option A: Automatic Install
```bash
crontab /tmp/newsletter-crontab.txt
```

### Option B: Manual Install
```bash
crontab -e
```

Add this line at the bottom:
```
0 7 * * 1-5 /bin/bash /root/.openclaw/workspace/newsletter/run-daily.sh
```

Save and exit.

### Verify Installation:
```bash
crontab -l
```

You should see your newsletter cron job listed.

---

## 🧪 STEP 3: Test Run (2 MINUTES)

### Manual Test:
```bash
cd /root/.openclaw/workspace/newsletter
export $(cat ../.env | grep -v '^#' | xargs)
node send-daily.js
```

### Expected Output:
```
🚀 Starting Daily AI Newsletter Automation...

Date: 2026-03-05T...
Timezone: Europe/Berlin
Send Time: 09:00

==================================================

📰 Fetching latest KI news...
💡 Selecting project spotlight...
🎯 Generating use case...
🛠️ Compiling tips & tricks...
✅ Content generated

✅ HTML generated

✅ Archive saved: /root/.openclaw/workspace/newsletter/archive/2026-03-05_newsletter.html

📧 Sending newsletter via Brevo API...
✅ Newsletter sent successfully!
Campaign ID: 12345

==================================================
🎉 Newsletter automation completed successfully!
```

### Check Logs:
```bash
tail -f /root/.openclaw/workspace/newsletter/cron.log
```

---

## 📊 STEP 4: Verify in Brevo

1. **Login:** https://app.brevo.com/
2. **Go to:** Campaigns → Emails
3. **You should see:** Your newsletter campaign with status "Sent"
4. **Check:** Your email inbox (you should receive the test)

---

## 🔧 Configuration Options

### Change Send Time:

Edit crontab:
```bash
crontab -e
```

Change time (format: `minute hour * * *`):
- **9:00 CET (winter):** `0 7 * * 1-5`
- **9:00 CET (summer):** `0 8 * * 1-5`
- **Every day at 6:00:** `0 6 * * *`

### Change Sender Email:

Edit `/root/.openclaw/workspace/.env`:
```
BREVO_SENDER_EMAIL=your@email.com
BREVO_SENDER_NAME=Your Name
```

### Change Subscriber List:

Edit `/root/.openclaw/workspace/newsletter/send-daily.js`:
```javascript
const CONFIG = {
    listId: 1, // Change to your list ID
    // ...
};
```

Find your list ID in Brevo:
1. Brevo → Contacts → Lists
2. Click on your list
3. ID is in the URL: `.../lists/123` → ID is `123`

---

## 📁 Newsletter Archive

All sent newsletters are automatically saved to:
```
/root/.openclaw/workspace/newsletter/archive/YYYY-MM-DD_newsletter.html
```

View latest:
```bash
ls -lt /root/.openclaw/workspace/newsletter/archive/ | head -5
```

---

## 🚨 Troubleshooting

### Newsletter not sending?

1. **Check API Key:**
   ```bash
   cat /root/.openclaw/workspace/.env | grep BREVO_API_KEY
   ```

2. **Check cron job:**
   ```bash
   crontab -l
   ```

3. **Check logs:**
   ```bash
   tail -20 /root/.openclaw/workspace/newsletter/cron.log
   ```

4. **Manual test:**
   ```bash
   cd /root/.openclaw/workspace/newsletter
   export $(cat ../.env | grep -v '^#' | xargs)
   node send-daily.js
   ```

### Cron job not running?

1. **Check cron service:**
   ```bash
   systemctl status cron
   ```

2. **Start if not running:**
   ```bash
   sudo systemctl start cron
   sudo systemctl enable cron
   ```

3. **Check cron logs:**
   ```bash
   grep CRON /var/log/syslog | tail -20
   ```

### Brevo API error?

- **Invalid API Key:** Check key in `.env` file
- **Invalid List ID:** Check list ID in Brevo dashboard
- **Sender not verified:** Verify sender email in Brevo (SMTP & API → Sender Management)

---

## 📈 Monitoring

### Daily Check:
```bash
# Last 10 newsletter runs
tail -20 /root/.openclaw/workspace/newsletter/cron.log

# Check if cron job is scheduled
crontab -l

# Check archive
ls -lh /root/.openclaw/workspace/newsletter/archive/
```

### Weekly Stats:
```bash
# Count newsletters sent this month
ls /root/.openclaw/workspace/newsletter/archive/$(date +%Y)-$(date +%m)* | wc -l
```

---

## 🎯 What Happens Daily (9:00 CET)

```
┌─────────────────────────────────────┐
│  1. Cron Job Triggers               │
│     (run-daily.sh)                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. Load Environment Variables      │
│     (API keys, config)              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  3. Fetch KI News (<24h)            │
│     (Google Search API)             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  4. Select Project Spotlight        │
│     (Rotate through projects)       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  5. Generate Use Case               │
│     (Practical application)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  6. Compile Tips & Tricks           │
│     (Tools, prompts, hacks)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  7. Generate HTML Newsletter        │
│     (Beautiful, responsive)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  8. Send via Brevo API              │
│     (To all subscribers)            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  9. Save to Archive                 │
│     (For future reference)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 10. Log Results                     │
│     (Success/failure, campaign ID)  │
└─────────────────────────────────────┘
```

---

## ✅ Checklist

- [ ] **Brevo API Key obtained**
- [ ] **API Key added to `.env`**
- [ ] **Cron job installed**
- [ ] **Test run successful**
- [ ] **Newsletter received in inbox**
- [ ] **Archive file created**
- [ ] **Logs show success**

---

## 🎉 You're Done!

Your newsletter will now send **automatically every weekday at 9:00 CET**.

**Next steps:**
1. Wait for tomorrow 9:00 CET
2. Check your inbox
3. Check Brevo dashboard for stats
4. Enjoy your automated newsletter! 🚀

---

**Questions?** Check the logs or run a manual test!
