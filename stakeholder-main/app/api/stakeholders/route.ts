
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        
        // Basic security: only allow logged in users (further admin check recommended)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { 
            name, 
            email, 
            organization, 
            organizationType, 
            role, // designation in schema
            district,
            notes,
            mode // 'admin' or 'student'
        } = body

        if (!name || !email || !role || !district) {
            return NextResponse.json({ error: 'Missing required fields (name, email, role, district)' }, { status: 400 })
        }

        // 1. Create or get user
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                name,
                role: 'STAKEHOLDER'
            },
            create: {
                email,
                name,
                role: 'STAKEHOLDER'
            }
        })

        // 2. Create or update stakeholder profile
        const profile = await prisma.stakeholderProfile.upsert({
            where: { userId: user.id },
            update: {
                designation: role,
                organization,
                organizationType,
                district,
                verificationStatus: mode === 'admin' ? 'verified' : 'pending',
                verificationNotes: notes || undefined
            },
            create: {
                userId: user.id,
                designation: role,
                organization,
                organizationType,
                district,
                verificationStatus: mode === 'admin' ? 'verified' : 'pending',
                verificationNotes: notes || undefined
            }
        })

        return NextResponse.json({ 
            success: true, 
            message: mode === 'admin' ? 'Stakeholder created successfully' : 'Stakeholder proposal submitted',
            data: profile 
        })

    } catch (error: any) {
        console.error('Stakeholder creation error:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
