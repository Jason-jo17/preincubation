import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const rubrics = await prisma.rubricDefinition.findMany({
      orderBy: { toolId: 'asc' }
    })

    return NextResponse.json(rubrics)
  } catch (error: any) {
    console.error("Rubrics GET Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    // Basic auth check: should be ADMIN (session interface might need cast)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { toolId, name, criteria } = body

    if (!toolId || !name || !criteria) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const rubric = await prisma.rubricDefinition.upsert({
      where: { toolId },
      update: { name, criteria },
      create: { toolId, name, criteria }
    })

    return NextResponse.json(rubric)
  } catch (error: any) {
    console.error("Rubric POST Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
