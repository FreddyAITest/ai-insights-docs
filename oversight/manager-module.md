# Agent Manager Module for Strategic Oversight

## Purpose
Route tasks to appropriate worker agents, monitor progress, handle errors, and report status.

## Core Functions

### 1. Task Routing
```javascript
// Load agent registry
const registry = require('./agent-registry.json');

function routeTask(taskDescription) {
  const rules = registry.routing.keywordRules;
  
  for (const rule of rules) {
    if (rule.keywords.some(kw => taskDescription.toLowerCase().includes(kw))) {
      return rule.worker;
    }
  }
  
  return registry.routing.defaultWorker;
}
```

### 2. Spawn Worker
```javascript
async function spawnWorker(workerId, task) {
  const worker = registry.workers[workerId];
  
  const session = await sessions_spawn({
    task: task,
    agentId: workerId,
    runtime: "subagent",
    mode: "session",
    thread: true,
    label: `${workerId}-${Date.now()}`,
    cleanup: "keep"
  });
  
  return session;
}
```

### 3. Monitor Progress
```javascript
async function monitorWorker(sessionKey, maxRuntime, checkpointInterval) {
  const startTime = Date.now();
  
  while (true) {
    const elapsed = (Date.now() - startTime) / 1000;
    
    if (elapsed > maxRuntime) {
      alert(`Worker running too long: ${elapsed}s`);
      break;
    }
    
    const subagents = await subagents({ action: "list" });
    const worker = subagents.active.find(s => s.sessionKey === sessionKey);
    
    if (!worker) {
      // Worker completed or crashed
      break;
    }
    
    await sleep(checkpointInterval * 1000);
  }
}
```

### 4. Error Handling
```javascript
async function handleError(workerId, error, retryCount) {
  const worker = registry.workers[workerId];
  
  if (retryCount < worker.retryCount) {
    // Retry
    console.log(`Retrying ${workerId} (${retryCount + 1}/${worker.retryCount})`);
    return true;
  }
  
  // Max retries exceeded - alert user
  await alert(`Worker ${workerId} failed after ${retryCount} retries: ${error}`);
  return false;
}
```

### 5. Status Reporting
```javascript
async function getStatusReport() {
  const subagents = await subagents({ action: "list" });
  const sessions = await sessions_list({ limit: 20 });
  
  const report = {
    activeWorkers: subagents.active.length,
    workers: subagents.active.map(w => ({
      id: w.agentId,
      runtime: w.runtime,
      status: "running"
    })),
    recentCompletions: sessions.filter(s => s.kind === "subagent" && !s.abortedLastRun)
  };
  
  return report;
}
```

## Usage in Strategic Oversight

```javascript
// When user sends a task
const workerId = routeTask(userMessage);
const session = await spawnWorker(workerId, userMessage);
await monitorWorker(session.sessionKey, 7200, 900);

// Report completion
await message({
  action: "send",
  to: "telegram:8530872637",
  message: `✅ Task completed by ${workerId}`
});
```

## Alert Triggers

Alert Lord Elias when:
- Worker crashes without restart
- Task running > maxRuntime
- Retry count exceeded
- Quality check failed
- API quota > 80%

## Commands

- `status` - Show active workers
- `route [task]` - Test routing logic
- `spawn [worker] [task]` - Manually spawn worker
- `monitor [session]` - Monitor specific session
- `report` - Generate status report
