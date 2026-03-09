# 🔍 Find Your Brevo List ID

## Quick Steps:

1. **Login:** https://app.brevo.com/
2. **Go to:** **Contacts** (left sidebar)
3. **Click:** **Lists** tab
4. **Find your list:** You should see "Newsletter Subscribers" or similar
5. **Look at the URL:** 
   ```
   https://app.brevo.com/contacts/lists/123
   ```
   The number at the end is your **List ID** (e.g., `123`)

## Or Create a New List:

If you don't have a list yet:

1. **Contacts** → **Lists** → **Create a List**
2. **Name:** `AI Insights Newsletter`
3. **Description:** `Daily newsletter subscribers`
4. **Click:** **Save**
5. **Copy the List ID** from the URL

## Update Config:

Once you have the List ID, update `.env`:

```bash
nano /root/.openclaw/workspace/.env
```

Change this line:
```
BREVO_LIST_ID=1
```

To your actual list ID:
```
BREVO_LIST_ID=123
```

Save: `Ctrl+O` → `Enter` → `Ctrl+X`

## Test Again:

```bash
cd /root/.openclaw/workspace/newsletter
export $(cat ../.env | grep -v '^#' | xargs)
node send-daily.js
```

---

**Your email is already in the subscriber list, right?** ✅
