import { createClient } from '@/lib/supabase-server'
import { sessionPatchSchema } from '@/lib/validators'
import { apiError, apiSuccess, checkRateLimit, getClientIp } from '@/lib/api-utils'

export async function GET() {
  const supabase = await createClient()

  // Verify the requester is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError('Unauthorized', 401)

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return apiError('Forbidden', 403)
  }

  // Fetch ALL sessions — this works because the admin RLS policy allows it
  const { data: sessions, error: sessionsError } = await supabase
    .from('sessions')
    .select('*, stakeholders(*), opportunities(*), evidence(*)')
    .order('created_at', { ascending: false })

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .order('full_name', { ascending: true })

  const { data: stakeholders, error: stakeholdersError } = await supabase
    .from('stakeholders')
    .select('*')
    .order('name', { ascending: true })

  if (sessionsError) {
    return apiError(sessionsError.message, 500)
  }

  return apiSuccess({ 
    sessions: sessions || [], 
    profiles: profiles || [],
    stakeholders: stakeholders || []
  })
}

export async function DELETE(req: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return apiError('Missing ID', 400)

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError('Unauthorized', 401)

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return apiError('Forbidden', 403)

  const { error } = await supabase.from('sessions').delete().eq('id', id)
  if (error) return apiError(error.message, 500)

  return apiSuccess({ success: true })
}

export async function PATCH(req: Request) {
  // Rate limiting
  const ip = getClientIp(req)
  const rateLimit = checkRateLimit(`admin-patch-${ip}`, 30, 60000)
  if (!rateLimit.success) {
    return apiError('Too many requests', 429)
  }

  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError('Unauthorized', 401)

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return apiError('Forbidden', 403)

  // Validate input
  const body = await req.json()
  const validation = sessionPatchSchema.safeParse(body)
  
  if (!validation.success) {
    return apiError('Validation failed', 400, { details: validation.error.flatten() })
  }

  const { id, ids, status, user_id } = validation.data
  const targetIds = ids || (id ? [id] : [])

  const updateData: Record<string, unknown> = {}
  if (status) updateData.status = status
  if (user_id !== undefined) updateData.user_id = user_id

  const { error } = await supabase.from('sessions').update(updateData).in('id', targetIds)

  if (error) return apiError(error.message, 500)

  return apiSuccess({ success: true, count: targetIds.length })
}
