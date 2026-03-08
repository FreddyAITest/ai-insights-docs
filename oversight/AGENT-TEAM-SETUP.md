# 🤖 AI Insights Multi-Agent Team

## ✅ Setup Complete

Your multi-agent architecture is now configured with **5 specialized workers** managed by **Strategic Oversight**.

---

## 📋 Agent Registry

| Agent | Role | Skills Installed | Max Runtime |
|-------|------|------------------|-------------|
| **web-designer** | Websites & web apps | web, frontend-design-3 | 2 hours |
| **blog-manager** | Content strategy & publishing | writing, business-writing | 1 hour |
| **blog-writer** | SEO blog posts | writing, technical-blog-writing* | 1.5 hours |
| **blog-researcher** | Deep research & fact-checking | deep-research-pro, in-depth-research | 1.5 hours |
| **personal-assistant** | Todos, tasks, personal org | todo-manager, todo-management | 24 hours |

\* _technical-blog-writing flagged as suspicious - review before installing_

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    TELEGRAM (You)                            │
│              @StrategicOversightBot                          │
│              (ONLY chat interface)                           │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│         Strategic Oversight (MANAGER)                        │
│  - Routes tasks to workers                                   │
│  - Monitors progress                                         │
│  - Handles errors & retries                                  │
│  - Reports to you                                            │
└──────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼────┐          ┌────▼────┐          ┌────▼────┐
   │ Web     │          │ Blog    │          │Personal │
   │ Designer│          │ Team*   │          │Assistant│
   └─────────┘          └─────────┘          └─────────┘
                        (manager, writer,
                         researcher)
```

---

## 🎯 How It Works

### 1. You Send a Task
```
You: "Create a landing page for AI Insights"
```

### 2. Manager Routes It
```
Manager: "Routing to web-designer..."
```

### 3. Worker Executes
- Spawns as subagent
- Works with checkpoints
- Manager monitors progress

### 4. Manager Reports
```
Manager: "✅ Landing page complete!
         Preview: https://ai-insights.github.io/landing"
```

---

## 📍 Task Routing Rules

| Keywords | Routes To |
|----------|-----------|
| website, web, html, css, react, landing page, deploy | **web-designer** |
| blog strategy, editorial, content calendar, publish schedule | **blog-manager** |
| write blog, blog post, article, seo content | **blog-writer** |
| research, sources, facts, data, analyze | **blog-researcher** |
| todo, task, reminder, schedule, personal, organize | **personal-assistant** |

---

## 🛠️ Available Commands

### In Telegram Chat

| Command | Description |
|---------|-------------|
| `status` | Show active workers and tasks |
| `report` | Generate daily summary |
| `spawn [worker] [task]` | Manually spawn a worker |
| `check [task]` | Check status of specific task |
| `alerts` | Show recent issues/alerts |
| `help` | Show all commands |

### Examples

```
/status
/spawn web-designer Build a portfolio site
/spawn blog-researcher Research AI trends 2026
/spawn personal-assistant Remind me to call John at 3pm
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `/root/.openclaw/workspace/oversight/agent-registry.json` | Agent definitions & routing |
| `/root/.openclaw/workspace/oversight/manager-module.md` | Manager logic documentation |
| `/root/.openclaw/agents/*/agent.json` | Individual agent configs |
| `/root/.openclaw/agents/strategic-oversight/agent/subagents.json` | Allowed subagents list |

---

## ⚠️ Pending Actions

### 1. Install Flagged Skills (Review First)

These skills were flagged as suspicious by VirusTotal. Review before installing:

```bash
cd /root/.openclaw/workspace/oversight/skills
clawhub inspect blog-master
clawhub inspect technical-blog-writing
clawhub inspect web-deploy-github
```

If they look safe, install with:
```bash
clawhub install blog-master --force
clawhub install technical-blog-writing --force
clawhub install web-deploy-github --force
```

### 2. Test the System

Try spawning a worker:
```
/spawn personal-assistant Create a todo list for this week
```

### 3. Install Additional Skills (Rate Limited)

These hit rate limits - try again later:
- `website`
- `writing-assistant`
- `business-writing`

---

## 🔧 Next Steps

1. **Review flagged skills** - Check if they're safe to install
2. **Test a worker** - Spawn personal-assistant with a simple task
3. **Monitor first run** - Watch how manager routes and tracks
4. **Customize routing** - Adjust keyword rules if needed
5. **Set up cron reports** - Daily at 8 AM, weekly on Monday 9 AM

---

## 🚨 Alert Configuration

Alerts are sent when:
- ❌ Worker crashes without restart
- ❌ Task running > maxRuntime
- ❌ Retry count exceeded
- ❌ Quality check failed
- ❌ API quota > 80%

**Quiet Hours:** 8 PM - 9 AM Berlin time (no non-critical alerts)

---

## 📞 Support

- Docs: `/usr/lib/node_modules/openclaw/docs`
- Community: https://discord.com/invite/clawd
- Skills: https://clawhub.com

---

_Your multi-agent team is ready. Start delegating!_ 🚀
