# Operational Rules

## Daily Procedures

### Morning Check (8:00 AM UTC)

1. **System Health Review**
   - Check gateway status
   - Verify all agents are responsive
   - Review overnight error logs
   - Confirm cron jobs executed

2. **Task Queue Review**
   - List pending tasks
   - Identify stalled items (>24h old)
   - Prioritize by urgency and impact
   - Assign or escalate as needed

3. **Communication Check**
   - Review unread messages in priority channels
   - Check for @mentions requiring response
   - Scan for urgent external notifications (email, calendar)

4. **Daily Report Generation**
   - Compile activity summary from previous 24h
   - Highlight completions and blockers
   - Include key metrics (tasks done, errors, uptime)
   - Deliver to @StrategicClawdBillbot

### Throughout the Day

**Continuous Monitoring:**
- Agent heartbeats (every 30 min)
- Error rate spikes
- Resource utilization (CPU, memory, disk)
- External API health (if configured)

**Event-Driven Actions:**
- Task completion → Update tracker, notify if requested
- Error detected → Log, categorize, alert if critical
- User message → Route to appropriate agent, respond if direct

### Evening Wrap (Optional, ~20:00 UTC)

- Quick health check
- Flag any overnight risks
- Prepare morning brief context

---

## Weekly Procedures

### Monday Review (9:00 AM UTC)

1. **Week-at-a-Glance Report**
   - Previous week's accomplishments
   - Unresolved blockers
   - Resource consumption trends
   - Skill/tool usage statistics

2. **Planning Support**
   - List carry-over tasks
   - Identify capacity constraints
   - Suggest priority order based on dependencies

3. **System Maintenance**
   - Review and rotate logs (if >7 days old)
   - Check for skill updates
   - Verify backup integrity (if configured)
   - Clean temporary files

### Monthly Review (First of Month)

- Long-term trend analysis
- Configuration audit
- Security review
- Capacity planning recommendations

---

## Incident Response

### When Something Breaks

1. **Assess** - What's broken? What's the impact?
2. **Contain** - Stop the bleeding (pause affected processes)
3. **Diagnose** - Check logs, recent changes, dependencies
4. **Fix** - Apply solution or escalate
5. **Learn** - Document root cause, update monitoring to catch earlier

### Escalation Path

```
Level 1: Auto-retry (transient errors, max 3 attempts)
Level 2: Alert user via Telegram (persistent errors, degraded function)
Level 3: Emergency stop + detailed report (data risk, security concern)
```

---

## Communication Standards

### Report Format

```markdown
## [Report Type] - [Date]

### Summary
2-3 sentence overview

### Key Metrics
- Metric 1: value
- Metric 2: value

### Accomplishments
- Item 1
- Item 2

### Blockers
- ⚠️ Item requiring attention

### Next Steps
- Planned action 1
- Planned action 2
```

### Alert Format

```
🚨 [SEVERITY] [Brief Title]

**What:** Description of the issue
**When:** Timestamp of first occurrence
**Impact:** What's affected
**Action:** Recommended response

[Optional: Relevant logs or context]
```

---

*Last updated: 2026-03-06*
*Owner: Strategic Oversight Agent*
