import { z } from 'zod'

// Session schemas
export const sessionPatchSchema = z.object({
  id: z.string().uuid().optional(),
  ids: z.array(z.string().uuid()).optional(),
  status: z.enum(['Scheduled', 'Recording', 'Review', 'Published']).optional(),
  user_id: z.string().uuid().nullable().optional(),
}).refine(data => data.id || data.ids, {
  message: "Either 'id' or 'ids' must be provided"
})

export const sessionDeleteSchema = z.object({
  id: z.string().uuid(),
})

// Stakeholder schemas
export const stakeholderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  company: z.string().optional(),
  sector: z.string().optional(),
  employees: z.string().optional(),
  revenue: z.string().optional(),
  geography: z.string().optional(),
  domain: z.string().optional(),
  address: z.string().optional(),
  pincode: z.string().optional(),
})

// Opportunity schemas
export const opportunitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  tag: z.enum(['Core', 'Efficiency', 'Expansion', 'Disrupt']),
  problemClarity: z.number().min(1).max(4).optional(),
  budgetScore: z.number().min(1).max(4).optional(),
  isPaid: z.boolean().optional(),
  duration: z.string().optional(),
  origin: z.enum(['Customer', 'Interviewer']).optional(),
  activelySeeking: z.boolean().optional(),
  skillset: z.array(z.string()).optional(),
  toolset: z.array(z.string()).optional(),
  mindset: z.array(z.string()).optional(),
})

// Synthesize request schema
export const synthesizeRequestSchema = z.object({
  recordingUrl: z.string().url().optional(),
  opportunities: z.array(opportunitySchema).optional(),
  stakeholder: stakeholderSchema.optional(),
})

// Helper to validate and return typed result
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): 
  { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, error: result.error }
}

export type SessionPatchInput = z.infer<typeof sessionPatchSchema>
export type StakeholderInput = z.infer<typeof stakeholderSchema>
export type OpportunityInput = z.infer<typeof opportunitySchema>
export type SynthesizeRequestInput = z.infer<typeof synthesizeRequestSchema>
