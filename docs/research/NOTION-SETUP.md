# 🔗 Notion Integration Setup Guide

## Connect Your Notion Workspace for Research Storage

---

## 📋 **What You'll Get:**

- ✅ Auto-upload research to Notion pages
- ✅ Formatted documents with headings & links
- ✅ Searchable knowledge base
- ✅ Sync with Tavily research automation
- ✅ Export to Word/HTML/Markdown

---

## 🔑 **STEP 1: Create Notion Integration (3 minutes)**

### 1. Go to Notion Integrations:
```
https://www.notion.com/my-integrations
```

### 2. Click "+ New integration"

### 3. Fill in details:
- **Name:** `AI Research Automation`
- **Logo:** (optional) Upload AI/robot icon
- **Description:** `Automated research uploads`
- **Workspace:** Select your workspace

### 4. Configure capabilities:
- ✅ **Read content**
- ✅ **Update content**
- ✅ **Insert content**

### 5. Click **Submit**

### 6. Copy your **Internal Integration Token**:
- Looks like: `secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Save this!** You'll need it for `.env`

---

## 📄 **STEP 2: Create Research Database/Page in Notion**

### Option A: Create a Database (Recommended)

1. **Open Notion**
2. **Click** "+ Add a page" or "+ New page"
3. **Choose:** "Database - Full page"
4. **Name:** `AI Research Archive`
5. **Add properties:**
   - `Topic` (Title)
   - `Date` (Date)
   - `Sources` (Number)
   - `Tags` (Multi-select)
6. **Click** "..." → "Connect to** → Select your integration

### Option B: Use Existing Page

1. **Open** any page in Notion
2. **Click** "..." (top right)
3. **Scroll down** → "Connect to"
4. **Select:** `AI Research Automation`

---

## 🔗 **STEP 3: Get Page/Database ID**

### For Database:
1. **Open** your database in Notion
2. **Look at URL:**
   ```
   https://www.notion.so/your-workspace/abc123def456?v=xyz789
   ```
3. **Copy** the ID before `?v=`: `abc123def456`

### For Page:
1. **Open** the page in Notion
2. **Click** "..." (top right)
3. **Click** "Copy link"
4. **Paste** somewhere
5. **Extract ID** from URL:
   ```
   https://www.notion.so/your-workspace/Research-abc123def456
   ```
   ID is: `abc123def456` (remove dashes if present)

---

## ⚙️ **STEP 4: Update .env Configuration**

```bash
nano /root/.openclaw/workspace/.env
```

Add these lines:

```env
# Notion API Configuration
# Get from: https://www.notion.com/my-integrations

NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=abc123def456
NOTION_PAGE_ID=abc123def456
```

**Replace:**
- `secret_xxx...` with your Integration Token
- `abc123def456` with your Page/Database ID

Save: `Ctrl+O` → `Enter` → `Ctrl+X`

---

## 🧪 **STEP 5: Test Integration**

### Test Script:
```bash
cd /root/.openclaw/workspace/research
export $(cat ../.env | grep -v '^#' | xargs)
node test-notion.js
```

### Expected Output:
```
✅ Notion connection successful!
✅ Test page created: https://notion.so/your-page-id
```

---

## 🚀 **STEP 6: Run Research Automation**

### With Notion Upload:
```bash
cd /root/.openclaw/workspace/research
export $(cat ../.env | grep -v '^#' | xargs)
node research-automation.js "Your research topic here"
```

### Example:
```bash
node research-automation.js "Latest AI developments March 2026"
```

### Output:
```
🚀 AI Research Automation

🔍 Researching: "Latest AI developments March 2026"...
✅ Found 10 results
📤 Uploading to Notion...
✅ Uploaded to Notion successfully!
💾 Saving as Word document...
✅ Saved as HTML (Word-compatible): archive/research-latest-ai...html
✅ Saved as Markdown: archive/research-latest-ai...md

✅ Research completed successfully!
📊 Summary:
   Topic: Latest AI developments March 2026
   Sources: 10
   Date: 05.03.2026, 13:15

📤 Notion: https://notion.so/abc123def456
📁 Files saved:
   HTML: archive/research-latest-ai...html
   Markdown: archive/research-latest-ai...md
```

---

## 📊 **What Gets Uploaded to Notion:**

### Page Structure:
```
# Research Topic Title

**Research Date:** DD.MM.YYYY

## 📋 Summary
AI-generated summary from Tavily

## 🔍 Findings

### 1. Article Title
Article content here...

**Source:** https://example.com/article
*Published: DD.MM.YYYY*

---

### 2. Next Article Title
...

## 📊 Metadata
- Total Sources: 10
- Research Date: DD.MM.YYYY HH:MM
- API: Tavily Search
```

---

## 🔧 **Troubleshooting**

### Error: "Could not find the page"
**Solution:** Make sure you shared the page with your integration!
1. Open page in Notion
2. Click "..." → "Connect to"
3. Select your integration

### Error: "Unauthorized"
**Solution:** Check your API key in `.env`
- Make sure it starts with `secret_`
- No extra spaces or quotes

### Error: "Rate limit exceeded"
**Solution:** Notion allows 3 requests/second
- Wait a few seconds between uploads
- Batch multiple blocks together

---

## 🎯 **Advanced: Auto-Upload Daily Research**

### Create Cron Job:
```bash
crontab -e
```

Add:
```bash
# Daily research at 8:00 CET
0 7 * * 1-5 cd /root/.openclaw/workspace/research && export $(cat ../.env | grep -v '^#' | xargs) && node research-automation.js "Daily AI news $(date +\%Y-\%m-\%d)" >> /root/.openclaw/workspace/research/research.log 2>&1
```

---

## 📁 **File Structure:**

```
/root/.openclaw/workspace/
├── .env                          # API keys (Brevo, Tavily, Notion)
└── research/
    ├── research-automation.js    # Main script
    ├── test-notion.js            # Test Notion connection
    ├── archive/                  # Saved research files
    │   ├── research-topic-date.html
    │   └── research-topic-date.md
    └── RESEARCH-SETUP.md         # This file
```

---

## ✅ **Checklist:**

- [ ] **Notion integration created**
- [ ] **Integration token copied**
- [ ] **Page/Database created**
- [ ] **Page shared with integration**
- [ ] **Page/Database ID extracted**
- [ ] **.env updated with Notion credentials**
- [ ] **Test script run successfully**
- [ ] **First research uploaded to Notion**

---

## 🎉 **You're Done!**

Now every research topic automatically:
1. ✅ Searches web with Tavily
2. ✅ Compiles findings
3. ✅ Uploads to Notion (formatted)
4. ✅ Saves locally (HTML + Markdown)
5. ✅ Ready for export to Word

**Your knowledge base grows automatically!** 🚀

---

**Need help?** Check the test script or run with `--verbose` flag!
