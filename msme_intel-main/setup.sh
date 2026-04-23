#!/bin/bash

# MSME Intelligence Platform - Quick Setup Script

echo "🚀 MSME Intelligence Platform Setup"
echo "===================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Python
if ! command -v python &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.11+"
    exit 1
fi
echo "✅ Python found"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
echo "✅ Node.js found"

echo ""
echo "📦 Setting up backend..."
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # For Mac/Linux

# Install dependencies
pip install -r requirements.txt

echo ""
echo "📦 Setting up frontend..."
cd ../frontend

# Install dependencies
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Execute database/schema.sql in Supabase SQL Editor"
echo "3. Copy .env.example to .env and add your API keys"
echo "4. Run 'uvicorn app.main:app --reload' in backend/"
echo "5. Run 'npm run dev' in frontend/"
echo ""
echo "📚 See README.md for detailed instructions"
