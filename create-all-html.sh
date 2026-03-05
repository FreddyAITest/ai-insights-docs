#!/bin/bash

# Create proper HTML for Newsletter Guide
cat > docs/newsletter/SETUP-GUIDE.html << 'HTML'
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter Automation Setup - AI Insights</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #334155; background: #ffffff; padding: 2rem; }
        .container { max-width: 900px; margin: 0 auto; }
        header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; border-radius: 12px; margin-bottom: 2rem; }
        header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        nav { margin-bottom: 2rem; }
        nav a { display: inline-block; background: #f8fafc; color: #2563eb; padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none; font-weight: 500; margin-right: 0.5rem; }
        nav a:hover { background: #e2e8f0; }
        h1 { color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 0.5rem; margin: 2rem 0 1rem; }
        h2 { color: #0f172a; margin: 2rem 0 1rem; font-size: 1.5rem; }
        h3 { color: #334155; margin: 1.5rem 0 0.75rem; }
        a { color: #2563eb; text-decoration: none; }
        a:hover { text-decoration: underline; }
        p { margin-bottom: 1rem; }
        ul, ol { margin-left: 2rem; margin-bottom: 1rem; }
        li { margin-bottom: 0.5rem; }
        pre { background: #f8fafc; padding: 1rem; border-radius: 8px; overflow-x: auto; border: 1px solid #e2e8f0; margin-bottom: 1rem; }
        code { background: #f8fafc; padding: 0.2rem 0.4rem; border-radius: 4px; }
        pre code { background: none; padding: 0; border: none; }
        .step { background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #2563eb; }
        .back-link { display: inline-block; margin-bottom: 2rem; background: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .back-link:hover { background: #1d4ed8; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <a href="../../index.html" class="back-link">← Back to Documentation</a>
        <nav>
            <a href="../../index.html">🏠 Home</a>
            <a href="https://github.com/FreddyAITest/ai-insights-docs">GitHub</a>
        </nav>

        <header>
            <h1>📧 Newsletter Automation Setup</h1>
            <p>Set up fully automated daily newsletters with Brevo</p>
        </header>

        <div class="step">
            <h2>🔑 STEP 1: Get Brevo API Key</h2>
            <ol>
                <li>Login: <a href="https://app.brevo.com/" target="_blank">app.brevo.com</a></li>
                <li>Click your profile → SMTP & API → API Keys</li>
                <li>Create New API Key, name: "OpenClaw Automation"</li>
                <li>Copy the key (starts with <code>xkey-</code>)</li>
                <li>Add to <code>/root/.openclaw/workspace/.env</code></li>
            </ol>
        </div>

        <div class="step">
            <h2>⏰ STEP 2: Install Cron Job</h2>
            <pre><code>crontab /tmp/newsletter-crontab.txt</code></pre>
            <p>This schedules newsletters for Monday-Friday at 9:00 CET.</p>
        </div>

        <div class="step">
            <h2>🧪 STEP 3: Test Run</h2>
            <pre><code>cd /root/.openclaw/workspace/newsletter
export $(cat ../.env | grep -v '^#' | xargs)
node send-daily.js</code></pre>
        </div>

        <div class="step">
            <h2>📊 STEP 4: Verify in Brevo</h2>
            <ol>
                <li>Login to Brevo</li>
                <li>Go to: Campaigns → Emails</li>
                <li>You should see your newsletter with status "Sent"</li>
                <li>Check your email inbox</li>
            </ol>
        </div>

        <h2>🎯 What Happens Daily (9:00 CET)</h2>
        <ol>
            <li>Cron job triggers</li>
            <li>Fetch latest KI news (&lt;24h old)</li>
            <li>Select project spotlight</li>
            <li>Generate use case</li>
            <li>Compile tips & tricks</li>
            <li>Generate HTML newsletter</li>
            <li>Send via Brevo API to all subscribers</li>
            <li>Save to archive</li>
            <li>Log results</li>
        </ol>

        <h2>📁 Files Created</h2>
        <ul>
            <li><code>send-daily.js</code> - Main automation script</li>
            <li><code>run-daily.sh</code> - Cron job wrapper</li>
            <li><code>archive/</code> - Newsletter archive</li>
            <li><code>cron.log</code> - Execution logs</li>
        </ul>

        <p style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0; color: #64748b;">
            <strong>Questions?</strong> Check the logs or run a manual test! 🚀
        </p>
    </div>
</body>
</html>
HTML

echo "✅ Newsletter guide created"
