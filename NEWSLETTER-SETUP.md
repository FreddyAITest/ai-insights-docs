# Newsletter Setup Guide - DSGVO Compliant

## Quick Setup with Brevo (Recommended)

**Brevo** (formerly Sendinblue) is EU-based (France), DSGVO-compliant, and has a generous free tier.

### Step 1: Create Free Brevo Account

1. Go to: **https://www.brevo.com/de/**
2. Click "Kostenlos testen" (Free trial)
3. Sign up with your email
4. Verify your email address
5. Complete the onboarding (company info optional)

**Free Tier Includes:**
- ✅ 300 emails/day (9,000/month)
- ✅ Unlimited contacts
- ✅ Double Opt-In (required for DSGVO)
- ✅ Email templates
- ✅ Basic analytics

### Step 2: Create a Subscription Form

1. In Brevo dashboard, go to **Grow** → **Forms**
2. Click **Create a form**
3. Choose **Subscription form**
4. Select **Inline form** (matches our design)

### Step 3: Configure Form Settings

**Form Settings:**
- **Form name:** `AI Insights Newsletter`
- **List:** Create new list called `Newsletter Subscribers`
- **Double Opt-In:** ✅ **ENABLED** (required for DSGVO!)
- **Language:** German
- **Confirmation page:** Use default Brevo confirmation

**GDPR/DSGVO Settings:**
- ✅ Add consent checkbox (pre-checked is NOT allowed!)
- Link to your privacy policy: `https://silver-cheesecake-cd9dfd.netlify.app/datenschutz.html`
- Consent text suggestion:
  ```
  Ich habe die Datenschutzerklärung gelesen und stimme zu, dass meine E-Mail-Adresse 
  für den Newsletter-Versand gespeichert wird. Ich kann meine Einwilligung jederzeit 
  widerrufen.
  ```

### Step 4: Get Your Form ID

1. After creating the form, click **Publish**
2. Choose **Integrate** → **HTML form**
3. Look for the `form_id` in the code (looks like: `abc123-def456-ghi789`)
4. Copy this ID

### Step 5: Update the Website

1. Open `index.html` in your repo
2. Find line with: `<input type="hidden" name="form_id" value="YOUR_FORM_ID">`
3. Replace `YOUR_FORM_ID` with your actual Brevo form ID
4. Commit and push to GitHub

Example:
```html
<input type="hidden" name="form_id" value="abc123-def456-ghi789">
```

### Step 6: Test the Form

1. Go to your live site: https://silver-cheesecake-cd9dfd.netlify.app/
2. Enter your email in the newsletter form
3. Submit
4. **Check your email** - you should receive a Double Opt-In confirmation
5. Click the confirmation link
6. Check Brevo dashboard - your email should be in the `Newsletter Subscribers` list

---

## Alternative: Netlify Forms (Simpler but Less Features)

If you prefer a simpler setup without Brevo:

### Option A: Netlify Forms Built-in

1. Add `netlify` attribute to the form:
   ```html
   <form name="newsletter" method="POST" data-netlify="true" netlify>
   ```

2. Add hidden honeypot field (spam protection):
   ```html
   <input type="text" name="bot-field" style="display: none;">
   ```

3. Netlify will collect submissions in your dashboard
4. **⚠️ Warning:** You'll need to manually handle Double Opt-In and exports

### Option B: Netlify Functions + Brevo API

More control, but requires coding a serverless function.

---

## DSGVO Compliance Checklist

✅ **Double Opt-In** - User must confirm via email link  
✅ **Consent checkbox** - Not pre-checked, links to privacy policy  
✅ **Privacy policy** - Links to your Datenschutzerklärung  
✅ **Unsubscribe link** - Every email must have one (Brevo adds automatically)  
✅ **Data processing agreement** - Sign Brevo's DPA in dashboard  
✅ **Minimal data** - Only collect email (and optionally name)  
✅ **Export capability** - You can export/delete subscriber data anytime  

---

## Sending Your First Newsletter

Once you have subscribers:

1. In Brevo: **Campaigns** → **Emails** → **Create a campaign**
2. Choose your `Newsletter Subscribers` list
3. Design your email (drag & drop editor)
4. Send test email to yourself first
5. Schedule or send immediately

**Best Practices:**
- Send consistently (e.g., weekly or bi-weekly)
- Include valuable content, not just promotions
- Always include unsubscribe link (automatic with Brevo)
- Track open rates and click-through rates

---

## Costs

**Free Tier (Brevo):**
- 300 emails/day
- Unlimited contacts
- Perfect for getting started

**Paid Plans (when you grow):**
- **Starter:** ~€25/month (500 emails/day, no daily limit)
- **Business:** ~€65/month (advanced features)

---

## Need Help?

- **Brevo Support:** https://help.brevo.com/
- **German Support:** Available via chat/email
- **Documentation:** https://www.brevo.com/de/features/email-marketing/

---

## Next Steps

1. ✅ Create Brevo account
2. ✅ Create subscription form
3. ✅ Get form ID
4. ✅ Update `index.html` with form ID
5. ✅ Push to GitHub
6. ✅ Test the form
7. ✅ Start collecting subscribers! 🚀
