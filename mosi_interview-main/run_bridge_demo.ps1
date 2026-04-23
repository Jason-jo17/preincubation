# MOSI Intelligence Bridge: Local Hosting Script
Write-Host "🚀 Launching MOSI Interview Platform (Bridge Mode)..." -ForegroundColor Cyan

# Check for node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies (First-time setup)..." -ForegroundColor Yellow
    npm install
}

# Launch Next.js
Write-Host "🌐 Dashboard will be at: http://localhost:3000" -ForegroundColor Green
Write-Host "🔗 Syncing with MSME API at: http://localhost:8000" -ForegroundColor Green

$env:NEXT_PUBLIC_MSME_API_URL = "http://localhost:8000"
npm run dev
