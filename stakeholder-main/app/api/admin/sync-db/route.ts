import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        // Basic security check - ensure it's a valid session
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.log("Starting emergency DB sync...")

        const queries = [
            { name: "SprintToolSubmission:aiScore", sql: `ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "aiScore" INTEGER;` },
            { name: "SprintToolSubmission:assessmentNotes", sql: `ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "assessmentNotes" TEXT;` },
            { name: "CRLEvidence:aiScore", sql: `ALTER TABLE "CRLEvidence" ADD COLUMN IF NOT EXISTS "aiScore" INTEGER;` },
            { name: "CRLEvidence:assessmentNotes", sql: `ALTER TABLE "CRLEvidence" ADD COLUMN IF NOT EXISTS "assessmentNotes" TEXT;` },
            { name: "IRLEvidence:aiScore", sql: `ALTER TABLE "IRLEvidence" ADD COLUMN IF NOT EXISTS "aiScore" INTEGER;` },
            { name: "IRLEvidence:assessmentNotes", sql: `ALTER TABLE "IRLEvidence" ADD COLUMN IF NOT EXISTS "assessmentNotes" TEXT;` }
        ]

        const results = []

        for (const query of queries) {
            try {
                await prisma.$executeRawUnsafe(query.sql)
                results.push(`${query.name}: Success (or already exists)`)
            } catch (e: any) {
                results.push(`${query.name} Error: ${e.message}`)
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: "Emergency sync complete. Please check logs.",
            results 
        })
    } catch (error: any) {
        console.error('Sync-DB Error:', error)
        return NextResponse.json({ 
            error: error.message || 'Internal server error' 
        }, { status: 500 })
    }
}
