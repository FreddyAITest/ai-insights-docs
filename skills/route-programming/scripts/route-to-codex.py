#!/usr/bin/env python3
"""
Route programming tasks to Samantha (codex agent)

This script detects programming-related requests and routes them to codex.
Usage: python3 route-to-codex.py "<user message>"
"""

import sys
import json
import subprocess

# Programming keywords that trigger routing
PROGRAMMING_KEYWORDS = [
    'code', 'coding', 'program', 'script', 'function', 'api', 'database',
    'sql', 'python', 'javascript', 'typescript', 'react', 'node', 'npm',
    'debug', 'bug', 'error', 'exception', 'stack trace', 'compile',
    'build', 'deploy', 'docker', 'kubernetes', 'container',
    'git', 'commit', 'push', 'pull', 'merge', 'branch',
    'frontend', 'backend', 'fullstack', 'web', 'app', 'mobile',
    'refactor', 'optimize', 'performance', 'testing', 'unit test',
    'integration', 'endpoint', 'rest', 'graphql', 'webhook',
    'json', 'yaml', 'config', 'environment', 'variable',
    'class', 'object', 'method', 'interface', 'type', 'schema',
    'library', 'package', 'dependency', 'module', 'import',
    'async', 'await', 'promise', 'callback', 'thread', 'process',
    'memory', 'cpu', 'optimization', 'algorithm', 'data structure'
]

def is_programming_task(message: str) -> bool:
    """Check if message contains programming-related keywords."""
    message_lower = message.lower()
    return any(keyword in message_lower for keyword in PROGRAMMING_KEYWORDS)

def spawn_codex_task(task: str, label: str = "programming-task"):
    """Spawn a subagent task for codex."""
    cmd = [
        'openclaw', 'sessions', 'spawn',
        '--runtime', 'subagent',
        '--mode', 'run',
        '--label', label,
        '--task', task
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"Error spawning subagent: {result.stderr}")
        return None
    
    return json.loads(result.stdout) if result.stdout else None

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 route-to-codex.py \"<user message>\"")
        sys.exit(1)
    
    message = sys.argv[1]
    
    if not is_programming_task(message):
        print("NOT_PROGRAMMING_TASK")
        sys.exit(0)
    
    print(f"🔧 Detected programming task, routing to Samantha (codex)...")
    
    result = spawn_codex_task(message)
    
    if result:
        print(f"✅ Task routed successfully")
        print(f"Session: {result.get('sessionKey', 'N/A')}")
    else:
        print("❌ Failed to route task")
        sys.exit(1)

if __name__ == "__main__":
    main()
