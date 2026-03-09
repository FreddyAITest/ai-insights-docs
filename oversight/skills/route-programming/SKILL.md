---
name: route-programming
description: Detects programming/coding tasks and routes them to Samantha (codex agent). Use when the user request involves: writing code, debugging, software development, API integration, database queries, scripting, web development, or any technical implementation work.
---

# Route Programming Tasks to Samantha

This skill automatically detects programming-related requests and routes them to Samantha (the `codex` agent) for specialized handling.

## When to Use This Skill

Trigger this skill when the user request involves:

- **Writing code** - Any programming language (Python, JavaScript, TypeScript, Go, Rust, etc.)
- **Debugging** - Fixing errors, troubleshooting code issues
- **Software development** - Building features, refactoring, architecture
- **API integration** - REST, GraphQL, webhook implementations
- **Database work** - SQL queries, schema design, migrations
- **Scripting** - Bash, Python scripts, automation
- **Web development** - Frontend, backend, full-stack work
- **Code review** - Analyzing code quality, suggesting improvements
- **Technical implementation** - Any hands-on coding task

## Routing Process

### Step 1: Confirm Task Type

Before routing, quickly verify:
1. Is this a programming/coding task?
2. Does it require hands-on implementation?
3. Would Samantha (codex) be better suited than the current agent?

If **yes** to all → proceed with routing.

If **no** → handle the task yourself or route to another appropriate agent.

### Step 2: Spawn Samantha

Use `sessions_spawn` to route the task:

```bash
sessions_spawn(
  runtime="subagent",
  task="<original user request with full context>",
  mode="run",
  label="programming-task"
)
```

**Then steer the subagent to use codex:**

After spawning, use `subagents(action="steer", target=<sessionKey>, message="...")` to direct the task, OR configure the subagent allowlist to include codex.

**Parameters:**
- `runtime="subagent"` - Uses OpenClaw's native subagent runtime (no acpx required)
- `task` - Pass the complete user request with all context
- `mode="run"` - One-shot execution (use `"session"` for ongoing work)
- `label` - Optional label for tracking

**Note:** The `agentId` parameter is not allowed for `sessions_spawn` in subagent mode. Instead, include the routing instruction in the task itself, or update the subagent allowlist.

### Step 3: Notify User

After spawning, inform the user:

```
🔧 Routing this programming task to Samantha (codex agent).

**Task:** <brief summary>
**Agent:** Samantha (@codex)
**Workspace:** /root/Samantha

She'll handle the implementation and report back when complete.
```

## Task Examples

### ✅ Route to Samantha

- "Build me a React component for a todo list"
- "Debug this Python script that's failing"
- "Create an API endpoint for user authentication"
- "Write a SQL query to find duplicate records"
- "Set up a CI/CD pipeline for my project"
- "Refactor this code to use async/await"

### ❌ Handle Yourself

- "What's the weather today?"
- "Summarize this document"
- "Schedule a meeting for tomorrow"
- "Check the status of my subagents"
- "Generate a daily report"

## Monitoring Routed Tasks

After routing:

1. **Track progress** - Use `subagents action=list` to monitor Samantha's session
2. **Check for blockers** - Alert if task runs >4 hours without checkpoint
3. **Verify completion** - Ensure work passes quality checks before announcing

## Fallback

If Samantha is unavailable or the task fails:

1. Alert the user with the failure reason
2. Offer to handle the task yourself or suggest alternatives
3. Log the failure in memory for future reference

## Notes

- Samantha's workspace: `/root/Samantha`
- Samantha's model: `google/gemini-3-pro-preview` (per openclaw.json)
- Programming tasks should always go to Samantha unless explicitly requested otherwise
- For complex multi-step projects, use `mode="session"` for persistent context
