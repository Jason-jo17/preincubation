# MSME Intelligence Platform

A comprehensive AI-powered platform for Micro, Small & Medium Enterprises (MSMEs) to analyze gaps, generate strategic roadmaps, and connect with relevant service providers.

## 🚀 Two Versions Available

This repository contains two distinct versions of the platform:

1.  **Full Platform** (`/frontend` + `/backend`)
    *   Complete architecture with FastAPI, Supabase (pgvector), and Next.js.
    *   Fully functional AI Agents, Vector Search, and Authentication.
    *   Requires local setup of Python, Node.js, and Databases.

2.  **Demo Version** (`/msme-demo`)
    *   Standalone Next.js application.
    *   **No backend required** (Mock data).
    *   Optimized for presentations, investor pitches, and quick walkthroughs.
    *   Instant deployment to Vercel.

---

## ✨ Key Features

### Core Capabilities
*   **AI-Powered Gap Analysis**: Uses Claude Sonnet 4 to analyze companies across 6 verticals (HR, Marketing, Finance, etc.) and 9 strategic dimensions.
*   **Automated Roadmap Generation**: Creates detailed 6-month growth plans using frameworks like ExO, OKR, and Blue Ocean.
*   **Sector Thesis & Intelligence**: Deep-dive sector analysis with "Living Build Notes" for continuously updating insights.
*   **Financial Health Monitoring**: detailed financials tab including MCA registration details (CIN, PAN, Capital) and balance sheet highlights.

### Tech Stack

#### Frontend (`/frontend` & `/msme-demo`)
*   **Next.js 14** (App Router)
*   **TypeScript** & **Tailwind CSS**
*   **shadcn/ui** components
*   **Recharts** for visualizations
*   **React Query** (TanStack Query)

#### Backend (`/backend`)
*   **FastAPI** (Python 3.11+)
*   **Supabase PostgreSQL** with `pgvector`
*   **LangChain** & **Anthropic Claude**
*   **Redis** & **Celery** for async tasks

---

## 🏁 Getting Started

### Option A: Running the Demo Version (Fastest)

Perfect for viewing the UI and user flow without complex setup.

```bash
cd msme-demo
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Option B: Running the Full Platform

#### 1. Database Setup
1.  Create a project at [Supabase](https://supabase.com).
2.  Run the schema in `database/schema.sql` in the Supabase SQL Editor.
3.  Note your `SUPABASE_URL` and `SUPABASE_KEY`.

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp ../.env.example .env
# Fill in your API keys in .env
uvicorn app.main:app --reload
```
API running at [http://localhost:8000](http://localhost:8000).

#### 3. Frontend Setup
```bash
cd frontend
npm install
# Create .env.local with: NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```
App running at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
msme-intelligence-platform/
├── msme-demo/              # ⚡ Standalone Demo App (Next.js)
│   ├── app/
│   └── lib/demo-data/      # Mock data for companies, thesis, etc.
│
├── frontend/               # 🌐 Full Platform Frontend (Next.js)
│   ├── app/
│   └── lib/api/            # Real API integrations
│
├── backend/                # 🧠 AI & Logic Backend (FastAPI)
│   ├── app/agents/         # AI Agents (Gap Analysis, Roadmap)
│   └── app/services/       # Business Logic
│
├── database/               # 💾 SQL Schemas & Migrations
└── n8n-workflows/          # 🔄 Automation workflows
```

## 🛠️ Development & Linting

We use ESLint and standard code formatting.

```bash
# Fix CSS/Tailwind linting issues locally (handled by .vscode settings)
cd frontend
npm run lint
```

## 📄 License

MIT License.
