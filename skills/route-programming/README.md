# Route Programming Skill

Automatically detects programming tasks and routes them to Samantha (codex agent).

## How It Works

1. **Auto-detection** - Scans messages for programming keywords
2. **Smart routing** - Spawns codex as a subagent for the task
3. **Monitoring** - Tracks progress and alerts on issues

## Programming Keywords

The skill detects these topics:
- Code, coding, programming, scripting
- Languages: Python, JavaScript, TypeScript, etc.
- Frameworks: React, Node, etc.
- DevOps: Docker, Kubernetes, Git, CI/CD
- Databases: SQL, schema, queries
- APIs: REST, GraphQL, endpoints
- Debugging: errors, exceptions, bugs

## Usage

**Automatic:** Just send a programming-related message and the skill will trigger.

**Manual:** Use the detection script:
```bash
python3 /root/.openclaw/workspace/skills/route-programming/scripts/route-to-codex.py "Build me a Python API"
```

## Configuration

**Subagent Allowlist:** `/root/.openclaw/agents/strategic-oversight/agent/subagents.json`

```json
{
  "allowAny": false,
  "allow": ["strategic-oversight", "codex"]
}
```

## Files

- `SKILL.md` - Skill definition and instructions
- `scripts/route-to-codex.py` - Auto-detection script
- `README.md` - This file
