import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const resolvedParams = await params
    const id = resolvedParams.id

    // Verify ownership
    const evidence = await prisma.iRLEvidence.findUnique({
      where: { id },
      include: { journey: true }
    })

    if (!evidence) return NextResponse.json({ error: "Evidence not found" }, { status: 404 })
    if (evidence.journey.userId !== session.user.id) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

    await prisma.iRLEvidence.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("IRL DELETE Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
