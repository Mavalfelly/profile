#!/bin/bash

echo "Testing Analytics Email Report with Mock Data..."
echo ""
echo "Creating mock analytics data..."

# Track some page views
curl -s -X POST http://localhost:3001/api/track/pageview \
  -H "Content-Type: application/json" \
  -d '{"page":"/","visitorId":"test_visitor_1"}'

curl -s -X POST http://localhost:3001/api/track/pageview \
  -H "Content-Type: application/json" \
  -d '{"page":"/about","visitorId":"test_visitor_1"}'

curl -s -X POST http://localhost:3001/api/track/pageview \
  -H "Content-Type: application/json" \
  -d '{"page":"/projects","visitorId":"test_visitor_2"}'

# Track form submissions
curl -s -X POST http://localhost:3001/api/track/form \
  -H "Content-Type: application/json" \
  -d '{"formName":"contact_form","success":true}'

curl -s -X POST http://localhost:3001/api/track/form \
  -H "Content-Type: application/json" \
  -d '{"formName":"contact_form","success":false}'

# Track downloads
curl -s -X POST http://localhost:3001/api/track/download \
  -H "Content-Type: application/json" \
  -d '{"fileName":"resume.pdf"}'

curl -s -X POST http://localhost:3001/api/track/download \
  -H "Content-Type: application/json" \
  -d '{"fileName":"resume.pdf"}'

# Track project views
curl -s -X POST http://localhost:3001/api/track/project \
  -H "Content-Type: application/json" \
  -d '{"projectName":"Portfolio Website"}'

curl -s -X POST http://localhost:3001/api/track/project \
  -H "Content-Type: application/json" \
  -d '{"projectName":"E-commerce App"}'

curl -s -X POST http://localhost:3001/api/track/project \
  -H "Content-Type: application/json" \
  -d '{"projectName":"Portfolio Website"}'

echo ""
echo "Mock data created successfully!"
echo ""
echo "Current stats:"
curl -s http://localhost:3001/api/stats | jq '.daily' 2>/dev/null || curl -s http://localhost:3001/api/stats

echo ""
echo ""
echo "Mock data created! The cron job runs every minute and will send an email shortly."
echo "Check your inbox at the NOTIFICATION_EMAIL address specified in server/.env"
echo ""
echo "Note: In production, change the cron schedule back to '59 23 * * *' for daily emails at 11:59 PM"
