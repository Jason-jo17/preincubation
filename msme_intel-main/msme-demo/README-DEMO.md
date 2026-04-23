# MSME Funnel - Demo Version

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

```bash
vercel --prod
```

## What's Included

- ✅ 30 pre-loaded sample companies
- ✅ All 6 funnel stages functional
- ✅ Animated loading states (3-5 second simulations)
- ✅ Pre-generated thesis scores, RAG classifications, gap analyses, roadmaps
- ✅ Interactive visualizations (radar charts, ROI calculator)
- ✅ NO backend required
- ✅ NO database required

## Demo Flow

1. **Landing Page** → Overview of platform
2. **Funnel Overview** → See 30 companies at various stages
3. **Select Company** → Choose any company (comp-001 to comp-030)
4. **Run Through Stages:**
   - Thesis Scoring (animated, 3 sec)
   - Financials (pre-filled)
   - RAG Classification (animated, 4 sec)
   - Gap Analysis (animated, 5 sec)
   - Roadmap Generation (animated, 4 sec)
5. **View Complete Report** → Export-ready

## Perfect For

- 📊 Investor pitches
- 🎤 Client demos
- 🏆 Competition showcases (DISRUPT, etc.)
- 🎓 Product walkthroughs

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Recharts
- NO backend dependencies

## File Size

- Total bundle: ~500 KB
- Deployment time: <2 minutes
- Cold start: Instant (static)

## Customization

To add your own sample companies:
1. Edit `lib/demo-data/companies.ts`
2. Add thesis scores in `lib/demo-data/thesis-scores.ts`
3. Deploy: `vercel --prod`
