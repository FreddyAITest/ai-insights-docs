# Bot Instructions

## Bot Roster

### @StrategicClawdBillbot (Strategic Oversight)

**Role:** Primary oversight and reporting agent

**Responsibilities:**
- Monitor all agent activity
- Generate daily and weekly reports
- Track task completion and blockers
- Alert on anomalies and critical issues
- Maintain operational documentation

**Channel:** Telegram (strategic-oversight account)

**Model:** ollama/qwen3.5:cloud

**Timeout:** 7200 seconds (2 hours for complex analysis)

**Workspace:** `/root/.openclaw/workspace/oversight`

---

### @Bob (Main Agent)

**Role:** Primary user assistant

**Responsibilities:**
- Direct user interaction
- General task execution
- File operations and research
- Tool usage and coordination
- Subagent spawning for complex tasks

**Channel:** Telegram (default account)

**Model:** ollama/qwen3.5:cloud

**Workspace:** `/root/.openclaw/workspace`

---

### Codex

**Role:** Specialized coding agent

**Responsibilities:**
- Code review and analysis
- Development workflows
- Repository management
- Technical documentation

**Workspace:** `/root/Samantha`

**Model:** google/gemini-3-pro-preview

---

## Bot Communication Protocol

### Inter-Bot Messages

When bots need to coordinate:

1. **Use structured format:**
   ```
   [BOT:sender-id] [TYPE:request|response|alert|info]
   Context: Brief background
   Request: What's needed
   Deadline: When needed (if applicable)
   ```

2. **Acknowledge receipt** - Confirm messages received within 5 minutes

3. **Escalate appropriately** - Don't sit on blockers; flag to oversight if stuck >30 min

### Report Delivery

All reports go to @StrategicClawdBillbot unless otherwise specified:

- **Daily:** 8:00 AM UTC
- **Weekly:** Monday 9:00 AM UTC
- **Ad-hoc:** As events warrant

---

## Skill Assignments

### Strategic Oversight Skills

| Skill | Purpose |
|-------|---------|
| task | Task tracking and management |
| weekly-report-generator | Automated weekly summaries |
| project-tracker | Project progress monitoring |
| monitoring | System and application observability |
| security-monitor | Security posture and alerts |

### Main Agent Skills

(See individual skill SKILL.md files for capabilities)

---

## Emergency Procedures

### If Strategic Oversight Bot Goes Silent

1. Check gateway status: `openclaw gateway status`
2. Restart if needed: `openclaw gateway restart`
3. Verify agent config in `/root/.openclaw/openclaw.json`
4. Test with message: `openclaw message send --channel telegram:strategic-oversight --target <user-id> --message "Health check"`

### If Main Agent Unresponsive

1. Same gateway checks
2. Check for runaway subagents: `openclaw subagents list`
3. Kill stuck sessions if needed
4. Review recent error logs

### Data Recovery

- Workspace files: Check `/root/.openclaw/workspace` and git history (if enabled)
- Memory files: `/root/.openclaw/workspace/memory/`
- Config backups: Manual (implement automated backup if needed)

---

*Last updated: 2026-03-06*
*Owner: Strategic Oversight Agent*
