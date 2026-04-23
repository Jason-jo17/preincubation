import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { processUserIntelligence } from "@/lib/intelligence-worker"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId } = await req.json()
    
    if (userId) {
      // Trigger for specific user
      const result = await processUserIntelligence(userId)
      return NextResponse.json(result)
    } else {
      // Trigger for all active students (placeholder logic for scaling)
      const students = await prisma.studentProfile.findMany({
        take: 20, // Limit for manual trigger
        select: { userId: true }
      })
      
      const results = await Promise.all(
        students.map(s => processUserIntelligence(s.userId).catch(e => ({ error: e.message })))
      )
      
      return NextResponse.json({ success: true, processed: results.length })
    }
    
  } catch (error) {
    console.error("Intelligence Trigger Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
