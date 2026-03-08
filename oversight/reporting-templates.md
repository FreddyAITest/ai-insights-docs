# Reporting Templates

**Purpose:** Standardized templates for automated reports  
**Delivery:** Telegram via Oversight Bot

---

## 📅 Daily Report Template

**Schedule:** 8:00 AM UTC  
**Recipient:** Lord Elias (Telegram)

```
📊 **Daily Report - {DATE}**

━━━━━━━━━━━━━━━━━━━━

✅ **Tasks Completed** ({COUNT})
{LIST_COMPLETED_TASKS}

🔄 **Tasks In Progress** ({COUNT})
{LIST_IN_PROGRESS_TASKS}
  - {Task Name}: {Progress %}, Next: {Next Action}

🚧 **Blockers/Issues** ({COUNT})
{LIST_BLOCKERS}
  - 🔴 {Blocker}: {Impact}, Action: {Mitigation}

📈 **Resource Usage**
  • API Calls: {TOTAL} ({BREAKDOWN_BY_SERVICE})
  • Tokens: {TOTAL} (Main: {X}, Oversight: {Y}, Subagents: {Z})
  • Costs: ${AMOUNT} (Daily), ${AMOUNT} (MTD)

🎯 **Key Decisions**
{LIST_KEY_DECISIONS}

━━━━━━━━━━━━━━━━━━━━

**Summary:** {ONE_SENTENCE_SUMMARY}
**Focus for Today:** {TOP_PRIORITY}
```

---

## 📆 Weekly Report Template

**Schedule:** Monday 9:00 AM UTC  
**Recipient:** Lord Elias (Telegram)

```
📈 **Weekly Report - {WEEK_START} to {WEEK_END}**

━━━━━━━━━━━━━━━━━━━━

🏆 **Week's Accomplishments**
{LIST_MAJOR_COMPLETIONS}
  • {Accomplishment 1}
  • {Accomplishment 2}
  • {Accomplishment 3}

📊 **Progress Toward Goals**
{LIST_STRATEGIC_GOALS}
  • {Goal 1}: {PROGRESS}% → {PROGRESS}% ({CHANGE})
  • {Goal 2}: {PROGRESS}% → {PROGRESS}% ({CHANGE})

📉 **Metrics Summary**
  • Tasks Completed: {COUNT} (vs {LAST_WEEK} last week)
  • Avg Completion Time: {DURATION} (vs {LAST_WEEK})
  • Checkpoint Compliance: {PERCENTAGE}%
  • Publishing Workflow Pass Rate: {PERCENTAGE}%

💰 **Resource Summary**
  • Total API Calls: {COUNT}
  • Total Tokens: {COUNT}
  • Total Costs: ${AMOUNT}
  • Budget Remaining: ${AMOUNT} ({PERCENTAGE}%)

⚠️ **Challenges & Learnings**
{LIST_CHALLENGES_AND_LESSONS}
  • {Challenge}: {Lesson Learned}

🎯 **Strategic Recommendations**
{LIST_RECOMMENDATIONS}
  • {Recommendation 1}
  • {Recommendation 2}

📋 **Next Week's Focus**
{LIST_PRIORITIES}
  • {Priority 1}
  • {Priority 2}
  • {Priority 3}

━━━━━━━━━━━━━━━━━━━━

**Week Rating:** {RATING}/10
**Confidence Level:** {HIGH/MEDIUM/LOW}
```

---

## 🚨 Alert Templates

### Critical Alert (🔴 URGENT)

```
🔴 **URGENT ALERT**

**Type:** {ALERT_TYPE}
**Time:** {TIMESTAMP}
**Impact:** {SEVERITY_DESCRIPTION}

{DETAILED_DESCRIPTION}

**Immediate Action Required:**
{ACTION_STEPS}

**Status:** AWAITING RESPONSE
```

### Warning Alert (🟡 NOTICE)

```
🟡 **NOTICE**

**Type:** {ALERT_TYPE}
**Time:** {TIMESTAMP}

{DESCRIPTION}

**Current Status:** {STATUS}
**Recommended Action:** {RECOMMENDATION}

**Auto-Resolution:** {YES/NO} - {TIMEFRAME}
```

### Info Alert (🟢 INFO)

```
🟢 **INFO**

{MESSAGE}

**Details:** {ADDITIONAL_CONTEXT}
```

---

## 📊 Subagent Status Report

**Trigger:** On-demand or scheduled  
**Format:** JSON + Human Summary

```json
{
  "timestamp": "ISO8601",
  "activeSubagents": [
    {
      "id": "subagent-id",
      "task": "Task name",
      "status": "RUNNING|BLOCKED|COMPLETE|FAILED",
      "startTime": "ISO8601",
      "duration": "minutes",
      "lastCheckpoint": "ISO8601",
      "progress": "percentage",
      "nextAction": "Description"
    }
  ],
  "completedToday": 0,
  "failedToday": 0,
  "avgDuration": 0,
  "checkpointCompliance": "percentage"
}
```

**Human Summary:**
```
👥 **Subagent Status - {TIME}**

Active: {COUNT}
  • {Subagent 1}: {Task}, {PROGRESS}%, Last checkpoint: {TIME}
  • {Subagent 2}: {Task}, {PROGRESS}%, Last checkpoint: {TIME}

Completed Today: {COUNT}
Failed Today: {COUNT}
Avg Duration: {DURATION}
Checkpoint Compliance: {PERCENTAGE}%
```

---

## 📋 Publishing Workflow Report

**Trigger:** On task completion  
**Purpose:** Verify workflow compliance before announcement

```
✅ **Publishing Workflow Check**

Task: {TASK_NAME}
Completed: {TIMESTAMP}

Checklist:
  [✓] Self-review complete
  [✓] Quality check passed
  [✓] Kanban updated
  [✓] Documentation updated
  [✓] Deliverables verified

Status: READY FOR ANNOUNCEMENT
```

---

## 💾 Checkpoint Summary Report

**Trigger:** On session end or on-demand  
**Purpose:** Summary of all active checkpoints

```
💾 **Checkpoint Summary - {DATE}**

Active Checkpoints: {COUNT}

{LIST_CHECKPOINTS}
  • {Task Name}
    - Saved: {TIMESTAMP}
    - Progress: {PERCENTAGE}%
    - Next Action: {DESCRIPTION}
    - Location: {FILE_PATH}

Oldest Checkpoint: {TIME_AGO}
Newest Checkpoint: {TIME_AGO}
```

---

**Template Version:** 1.0.0  
**Last Updated:** 2026-03-06
