import { prisma } from "@/lib/prisma"
import { AnalyticsClient } from "@/components/analytics/AnalyticsClient"
import { subDays, subWeeks, startOfWeek, format } from "date-fns"

export const dynamic = "force-dynamic"

export default async function AnalyticsPage() {
  const now = new Date()
  const thirtyDaysAgo = subDays(now, 30)
  const eightWeeksAgo = subWeeks(now, 8)

  // 1. Total Stakeholders
  const stakeholderCount = await prisma.stakeholderProfile.count()

  // 2. Recent Interactions (last 30 days)
  const recentInteractions = await prisma.interaction.count({
    where: {
      occurredAt: {
        gte: thirtyDaysAgo
      }
    }
  })

  // 3. Problem Severity Distribution
  const problemsBySeverity = await prisma.problemStatement.groupBy({
    by: ['severity'],
    _count: {
      _all: true
    }
  })

  const problemSeverityData = problemsBySeverity.map(item => ({
    severity: item.severity,
    count: item._count._all
  }))

  // Ensure all severities are present for the chart
  const severities = ['Critical', 'High', 'Medium-High', 'Medium', 'Low']
  const formattedProblemData = severities.map(s => ({
    severity: s,
    count: problemSeverityData.find(d => d.severity === s)?.count || 0
  }))

  // 4. Top 5 Sectors
  const topSectorsRaw = await prisma.sector.findMany({
    select: {
      name: true,
      _count: {
        select: { stakeholders: true }
      }
    },
    orderBy: {
      stakeholders: {
        _count: 'desc'
      }
    },
    take: 5
  })

  const topSectors = topSectorsRaw.map(s => ({
    name: s.name,
    count: s._count.stakeholders
  }))

  // 5. Sprint Completions per week (last 8 weeks)
  const completedSprints = await prisma.sprint.findMany({
    where: {
      status: 'completed',
      completedAt: {
        gte: eightWeeksAgo
      }
    },
    select: {
      completedAt: true
    }
  })

  // Group by week
  const sprintWeeklyMap: Record<string, number> = {}
  for (let i = 0; i < 8; i++) {
    const weekStart = startOfWeek(subWeeks(now, i))
    const label = format(weekStart, 'MMM dd')
    sprintWeeklyMap[label] = 0
  }

  completedSprints.forEach(s => {
    if (s.completedAt) {
      const weekStart = startOfWeek(s.completedAt)
      const label = format(weekStart, 'MMM dd')
      if (sprintWeeklyMap[label] !== undefined) {
        sprintWeeklyMap[label]++
      }
    }
  })

  const sprintCompletions = Object.entries(sprintWeeklyMap)
    .map(([week, count]) => ({ week, count }))
    .reverse() // Chronological order

  // 6. CRL/IRL Pass Rates
  const [crlTotal, crlPassed, irlTotal, irlPassed] = await Promise.all([
    prisma.cRLEvidence.count(),
    prisma.cRLEvidence.count({ where: { passed: true } }),
    prisma.iRLEvidence.count({ where: { passed: true } }), // Wait, IRL total is separate
    prisma.iRLEvidence.count({ where: { passed: true } })  // Typo in my head, let's fix
  ])
  
  // Correction:
  const crlCount = await prisma.cRLEvidence.count()
  const crlPassCount = await prisma.cRLEvidence.count({ where: { passed: true } })
  const irlCount = await prisma.iRLEvidence.count()
  const irlPassCount = await prisma.iRLEvidence.count({ where: { passed: true } })

  const passRate = {
    crl: {
      total: crlCount,
      passed: crlPassCount,
      rate: crlCount > 0 ? Math.round((crlPassCount / crlCount) * 100) : 0
    },
    irl: {
      total: irlCount,
      passed: irlPassCount,
      rate: irlCount > 0 ? Math.round((irlPassCount / irlCount) * 100) : 0
    }
  }

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#6b6bfa] to-[#8b5cf6] bg-clip-text text-transparent">
          Platform Analytics
        </h1>
        <p className="text-lg text-muted-foreground">
          Real-time strategic insights across stakeholders, problems, and student journeys.
        </p>
      </div>

      <AnalyticsClient
        stakeholderCount={stakeholderCount}
        recentInteractions={recentInteractions}
        problemSeverity={formattedProblemData}
        topSectors={topSectors}
        sprintCompletions={sprintCompletions}
        passRate={passRate}
      />
    </div>
  )
}
