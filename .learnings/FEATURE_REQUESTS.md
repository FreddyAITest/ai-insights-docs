## [FEAT-20260304-001] newsletter-marketing-automation

**Logged**: 2026-03-04T23:47:00Z  
**Priority**: high  
**Status**: ✅ Implemented (pending Brevo verification)  
**Area**: backend  

### Requested Capability
Build a DSGVO-compliant newsletter marketing automation system using OpenClaw + ClawHub skills to:
1. Automatically generate weekly AI newsletter content
2. Send to Netlify Forms email list
3. Track engagement (opens, clicks) anonymously
4. Segment subscribers based on interests

### User Context
Lord Elias has a new AI Newsletter landing page collecting emails via Netlify Forms. Now needs to actually send weekly updates to subscribers without manual work.

### Complexity Estimate
medium

### Suggested Implementation

**Architecture:**
```
Netlify Forms (email collection)
    ↓
OpenClaw Marketing Agent (weekly cron job)
    ↓
Content Generation (AI blog posts, project updates)
    ↓
Email Service (Brevo/Rapidmail - EU-based)
    ↓
Subscribers (Double Opt-In verified)
```

**Required Skills:**
1. **Email Integration Skill** — Connect to Brevo/Rapidmail API
2. **Content Generator Skill** — AI writes weekly AI news summaries
3. **Scheduler Skill** — Cron job runs weekly (e.g., Monday 9 AM)
4. **Analytics Skill** — Track opens/clicks (anonymized for DSGVO)

**DSGVO Requirements (from research):**
- ✅ Double Opt-In already implemented
- ✅ Consent checkbox with legal text
- ✅ Datenschutzerklärung includes Netlify Forms disclosure
- ⚠️ Need AVV (Auftragsverarbeitungsvertrag) with email provider
- ⚠️ Need abmeldung (unsubscribe) link in every email
- ⚠️ Need impressum in every email
- ✅ EU-based email provider recommended (Brevo, Rapidmail, CleverReach)

**Weekly Workflow:**
1. **Monday 8 AM**: OpenClaw cron job triggers
2. **8:05 AM**: Agent scrapes latest AI news (web_search tool)
3. **8:15 AM**: Agent summarizes 3-5 top stories (German)
4. **8:20 AM**: Agent adds client's project updates (from GitHub)
5. **8:30 AM**: Agent formats HTML email with impressum + unsubscribe
6. **9:00 AM**: Email sent via Brevo/Rapidmail API
7. **9:05 AM**: Agent logs send report to `.learnings/`

**Email Provider Options:**
| Provider | DSGVO | Free Tier | API | Recommendation |
|----------|-------|-----------|-----|----------------|
| Brevo (ex-Sendinblue) | ✅ EU | 300/day | ✅ REST | **Best choice** |
| Rapidmail | ✅ DE | Paid (~€10) | ✅ REST | Very easy |
| CleverReach | ✅ DE | 250 subs | ✅ REST | Good alternative |
| Mailjet | ✅ EU | 200/day | ✅ REST | Solid |

**Next Steps:**
1. Choose email provider (recommend Brevo - free, EU, good API)
2. Create custom ClawHub skill: `newsletter-automator`
3. Set up cron job in OpenClaw
4. Configure email templates with impressum + unsubscribe
5. Test with small list, then scale

### Metadata
- **Frequency**: recurring (weekly newsletter)
- **Related Features**: Netlify Forms integration, OpenClaw cron, web_search tool
- **Tags**: newsletter, marketing, automation, dsgvo, email

---
