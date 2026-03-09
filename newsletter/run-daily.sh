#!/bin/bash
# Daily AI Newsletter - Cron Job Script
# Runs every day at 9:00 CET (7:00 UTC in winter, 8:00 UTC in summer)

# Load environment variables
export $(cat /root/.openclaw/workspace/.env | grep -v '^#' | xargs)

# Change to newsletter directory
cd /root/.openclaw/workspace/newsletter

# Log start
echo "[$(date)] Starting Daily Newsletter..." >> /root/.openclaw/workspace/newsletter/cron.log

# Run the newsletter script
/usr/bin/node /root/.openclaw/workspace/newsletter/send-daily.js >> /root/.openclaw/workspace/newsletter/cron.log 2>&1

# Log completion
echo "[$(date)] Newsletter job completed" >> /root/.openclaw/workspace/newsletter/cron.log
