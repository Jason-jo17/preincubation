import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import SettingsClient from "@/components/dashboard/SettingsClient"

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/auth/signin")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { apiKey: true }
    })

    const initialHasKey = !!user?.apiKey

    return (
        <main className="min-h-screen bg-background">
            <SettingsClient initialHasKey={initialHasKey} />
        </main>
    )
}
