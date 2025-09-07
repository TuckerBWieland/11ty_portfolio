#!/bin/bash

echo "🧪 Testing PostHog Worker Endpoints..."
echo "======================================="

echo ""
echo "1️⃣ Testing static assets (should work):"
curl -s -o /dev/null -w "Status: %{http_code} | Time: %{time_total}s\n" https://logs.tuckerwieland.com/static/array.js

echo ""
echo "2️⃣ Testing OPTIONS (CORS preflight):"
curl -s -o /dev/null -w "Status: %{http_code} | Time: %{time_total}s\n" -X OPTIONS https://logs.tuckerwieland.com/e/ -H "Origin: https://tuckerwieland.com"

echo ""
echo "3️⃣ Testing POST to /e/ (events endpoint):"
curl -s -o /dev/null -w "Status: %{http_code} | Time: %{time_total}s\n" -X POST https://logs.tuckerwieland.com/e/ -H "Content-Type: application/json" -d '{"test": true}'

echo ""
echo "4️⃣ Testing POST to /capture/ (alternative endpoint):"
curl -s -o /dev/null -w "Status: %{http_code} | Time: %{time_total}s\n" -X POST https://logs.tuckerwieland.com/capture/ -H "Content-Type: application/json" -d '{"test": true}'

echo ""
echo "✅ Expected results after fixing bot protection:"
echo "   - Static assets: 200"
echo "   - OPTIONS: 204 (no content)"  
echo "   - POST endpoints: 200 or 400 (400 is OK - means Worker is processing)"
echo ""
echo "❌ If you still see 403, bot protection is still active"
echo ""
echo "📝 WORKER REQUIREMENTS (logs.tuckerwieland.com):"
echo "   - Map /static/* -> https://us-assets.i.posthog.com/*"
echo "   - Map /e/*, /i/*, /decide/*, /s/*, /rum, /batch -> https://us.i.posthog.com/*"
echo "   - Add CORS headers: Access-Control-Allow-Origin: *"
echo "   - Add CORS headers: Timing-Allow-Origin: *" 
echo "   - Add CORS headers: Cross-Origin-Resource-Policy: cross-origin"

