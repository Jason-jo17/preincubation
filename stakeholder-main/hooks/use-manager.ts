import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { StakeholderProfile } from "@/types"

export function useManagerProfile() {
    return useQuery({
        queryKey: ['manager-profile'],
        queryFn: async () => {
            return {
                id: "manager-1",
                user: { name: "Dr. Sharma", email: "sharma@example.com", avatar: null },
                organization: "Innovation Incubation Center",
                role: "Senior Program Manager"
            }
        }
    })
}

export function useMyMentees() {
    return useQuery({
        queryKey: ['my-mentees'],
        queryFn: async () => {
            const res = await fetch('/api/manager/mentees')
            if (!res.ok) throw new Error("Failed to fetch mentees")
            return res.json()
        }
    })
}

export function useMentee(id: string) {
    return useQuery({
        queryKey: ['mentee', id],
        queryFn: async () => {
            const res = await fetch(`/api/manager/mentees/${id}`)
            if (!res.ok) throw new Error("Failed to fetch mentee details")
            return res.json()
        }
    })
}

export function useMenteeSubmissions(menteeId: string) {
    return useQuery({
        queryKey: ['manager-submissions', menteeId],
        queryFn: async () => {
            const res = await fetch(`/api/manager/submissions/${menteeId}`)
            if (!res.ok) throw new Error("Failed to fetch submissions")
            return res.json()
        }
    })
}

export function useReviewSubmission() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ taskId, status, feedback, score, rubricScores, rubricChecks }: { 
            taskId: string, 
            status: 'approved' | 'rejected', 
            feedback?: string,
            score?: number,
            rubricScores?: Record<string, number>,
            rubricChecks?: any
        }) => {
            const res = await fetch(`/api/manager/submissions/${taskId}/approve`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, feedback, score, rubricScores, rubricChecks })
            })
            if (!res.ok) throw new Error("Failed to review submission")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['manager-submissions'] })
        }
    })
}
