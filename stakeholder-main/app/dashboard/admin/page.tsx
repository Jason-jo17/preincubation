import { prisma } from "@/lib/prisma"
import AdminConsoleClient from "@/components/admin/AdminConsoleClient"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

async function getStats() {
    // 1. User Counts by Role
    const roleCounts = await prisma.user.groupBy({
        by: ['role'],
        _count: {
            _all: true
        }
    });

    const usersByRole = {
        STUDENT: 0,
        MANAGER: 0,
        STAKEHOLDER: 0,
        ADMIN: 0,
        RESEARCHER: 0
    };

    roleCounts.forEach(rc => {
        (usersByRole as any)[rc.role] = rc._count._all;
    });

    // 2. Aggregate Stats
    const [
        totalProblems,
        totalSolutions,
        totalStakeholders,
        totalInteractions
    ] = await Promise.all([
        prisma.problemStatement.count(),
        prisma.solution.count(),
        prisma.stakeholderProfile.count(),
        prisma.interaction.count(),
    ]);

    // 3. Recent Signups
    const recentSignups = await prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        }
    });

    // 4. System Health
    let dbStatus = "Operational";
    try {
        await prisma.$queryRaw`SELECT 1`;
    } catch (e) {
        dbStatus = "Error Connecting";
    }

    return {
        usersByRole,
        stats: {
            totalProblems,
            totalSolutions,
            totalStakeholders,
            totalInteractions,
            totalUsers: Object.values(usersByRole).reduce((a, b) => a + b, 0)
        },
        recentSignups,
        system: {
            dbStatus,
            prismaVersion: "5.22.0",
            nextVersion: "16.1.1"
        }
    };
}

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/auth/signin")
    }

    const initialStats = await getStats()

    return <AdminConsoleClient initialStats={initialStats} />
}
