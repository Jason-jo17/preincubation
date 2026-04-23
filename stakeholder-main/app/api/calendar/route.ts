import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const events = await prisma.calendarEvent.findMany({
            where: {
                organizerId: session.user.id
            },
            include: {
                // If we need to fetch stakeholder names later, we'd do it here
                // But for now, let's just return the events
            },
            orderBy: {
                startTime: 'asc'
            }
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error("GET /api/calendar error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, startTime, endTime, type, locationType, venue, virtualLink, stakeholderId } = body;

        const event = await prisma.calendarEvent.create({
            data: {
                title,
                description,
                eventType: type, // Map 'type' to 'eventType'
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                location: venue || (locationType === "Virtual" ? "Virtual" : null),
                meetingLink: virtualLink,
                organizerId: session.user.id,
                stakeholderIds: stakeholderId ? [stakeholderId] : [],
                status: "scheduled"
            }
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error("POST /api/calendar error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
