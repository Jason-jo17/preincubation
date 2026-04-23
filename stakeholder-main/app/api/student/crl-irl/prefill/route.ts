import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DIMENSION_TOOLS, extractToolContext } from '@/lib/crl-tool-extractor'
import { getToolConfig } from '@/lib/sprint-registry'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const dimension = searchParams.get('dimension')  // e.g. 'customer_validation'
    const type = searchParams.get('type') || 'crl'   // 'crl' | 'irl'

    if (!dimension) return NextResponse.json({ error: 'Missing dimension' }, { status: 400 })

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id },
      include: {
        sprints: {
          include: { toolSubmissions: true }
        }
      }
    })

    if (!journey) return NextResponse.json({ error: 'Journey not found' }, { status: 404 })

    // Flatten all tool submissions across all sprints
    const allSubmissions = journey.sprints.flatMap(s => s.toolSubmissions)

    // Get the tool IDs relevant for this dimension
    const dimensionToolIds = DIMENSION_TOOLS[dimension] || []

    // Find completed submissions for this dimension
    const relevantSubmissions = allSubmissions.filter(sub =>
      dimensionToolIds.includes(sub.toolId) &&
      (sub.status === 'gate_passed' || sub.status === 'submitted') &&
      sub.submittedData != null &&
      !sub.isDraft
    )

    // Build the pre-fill context for each matching tool
    const prefillItems = relevantSubmissions.map(sub => {
      const context = extractToolContext(sub.toolId, sub.submittedData)
      const config = getToolConfig(sub.toolId)
      return {
        toolId: sub.toolId,
        toolName: sub.toolName,
        iterationName: sub.iterationName,
        status: sub.status,
        submittedAt: sub.submittedAt,
        context: context.trim(),
        crlDimension: config?.crlDimension,
        irlDimension: config?.irlDimension,
        maxPercent: config?.maxPercent
      }
    }).filter(item => item.context.length > 0)

    // Build a combined evidence draft text that the student can edit
    const draftText = prefillItems.length > 0
      ? `[Auto-assembled from your completed tools — edit and expand this before submitting]\n\n` +
        prefillItems.map(item =>
          `--- From: ${item.toolName}${item.iterationName ? ` (${item.iterationName})` : ''} ---\n${item.context}`
        ).join('\n\n')
      : ''

    return NextResponse.json({
      dimension,
      type,
      prefillItems,
      draftText,
      citedToolIds: prefillItems.map(i => i.toolId),
      toolCount: prefillItems.length
    })
  } catch (error: any) {
    console.error("Prefill Error:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}
