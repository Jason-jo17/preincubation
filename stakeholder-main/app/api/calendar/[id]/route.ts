import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, startTime, endTime, type, locationType, venue, virtualLink, stakeholderId } = body;

        // Verify ownership
        const existingEvent = await prisma.calendarEvent.findUnique({
            where: { id }
        });

        if (!existingEvent) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        if (existingEvent.organizerId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedEvent = await prisma.calendarEvent.update({
            where: { id },
            data: {
                title,
                description,
                eventType: type,
                startTime: startTime ? new Date(startTime) : undefined,
                endTime: endTime ? new Date(endTime) : undefined,
                location: venue !== undefined ? venue : (locationType === "Virtual" ? "Virtual" : undefined),
                meetingLink: virtualLink,
                stakeholderIds: stakeholderId ? [stakeholderId] : undefined,
            }
        });

        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error("PATCH /api/calendar/[id] error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify ownership
        const existingEvent = await prisma.calendarEvent.findUnique({
            where: { id }
        });

        if (!existingEvent) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        if (existingEvent.organizerId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.calendarEvent.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/calendar/[id] error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
