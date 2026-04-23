import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useStakeholders() {
    return useQuery({
        queryKey: ['stakeholders-directory'],
        queryFn: async () => {
            const res = await fetch('/api/stakeholders')
            if (!res.ok) throw new Error('Failed to fetch stakeholders')
            return res.json()
        }
    })
}

export async function getCalendarEvents() {
    const res = await fetch('/api/calendar')
    if (!res.ok) throw new Error('Failed to fetch events')
    const events = await res.json()
    
    // Map DB fields to FullCalendar format
    return events.map((e: any) => ({
        id: e.id,
        title: e.title,
        start: e.startTime,
        end: e.endTime,
        type: e.eventType,
        description: e.description,
        location: e.location,
        meetingLink: e.meetingLink,
        stakeholderId: e.stakeholderIds?.[0],
        status: e.status
    }))
}

export function useCalendarEvents() {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['calendar-events'],
        queryFn: getCalendarEvents
    })

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch('/api/calendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Failed to create event')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['calendar-events'] })
            toast.success("Event scheduled successfully")
        },
        onError: () => toast.error("Failed to schedule event")
    })

    const updateMutation = useMutation({
        mutationFn: async ({ id, ...data }: any) => {
            const res = await fetch(`/api/calendar/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Failed to update event')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['calendar-events'] })
            toast.success("Event updated successfully")
        },
        onError: () => toast.error("Failed to update event")
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/calendar/${id}`, {
                method: 'DELETE'
            })
            if (!res.ok) throw new Error('Failed to delete event')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['calendar-events'] })
            toast.success("Event deleted")
        },
        onError: () => toast.error("Failed to delete event")
    })

    return {
        ...query,
        createEvent: createMutation.mutateAsync,
        updateEvent: updateMutation.mutateAsync,
        deleteEvent: deleteMutation.mutateAsync
    }
}
