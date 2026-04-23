import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

interface HealthCheck {
  status: 'ok' | 'degraded' | 'error'
  timestamp: string
  version: string
  services: {
    database: 'ok' | 'error' | 'unknown'
    auth: 'ok' | 'error' | 'unknown'
  }
  latency?: { database_ms: number }
  errors?: string[]
}

export async function GET() {
  const startTime = Date.now()
  const errors: string[] = []
  
  const checks: HealthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    services: { database: 'unknown', auth: 'unknown' }
  }

  try {
    const supabase = await createClient()
    
    const dbStart = Date.now()
    try {
      const { error: dbError } = await supabase.from('profiles').select('id').limit(1)
      checks.services.database = dbError ? 'error' : 'ok'
      checks.latency = { database_ms: Date.now() - dbStart }
      if (dbError) errors.push(`Database: ${dbError.message}`)
    } catch (e) {
      checks.services.database = 'error'
      errors.push(`Database: ${e instanceof Error ? e.message : 'Connection failed'}`)
    }
    
    try {
      const { error: authError } = await supabase.auth.getSession()
      checks.services.auth = authError ? 'error' : 'ok'
      if (authError) errors.push(`Auth: ${authError.message}`)
    } catch (e) {
      checks.services.auth = 'error'
      errors.push(`Auth: ${e instanceof Error ? e.message : 'Service unavailable'}`)
    }

    const serviceStatuses = Object.values(checks.services)
    if (serviceStatuses.every(s => s === 'ok')) {
      checks.status = 'ok'
    } else if (checks.services.database === 'error' || checks.services.auth === 'error') {
      checks.status = 'error'
    } else {
      checks.status = 'degraded'
    }

    if (errors.length > 0) checks.errors = errors

  } catch (e) {
    checks.status = 'error'
    checks.errors = [e instanceof Error ? e.message : 'Health check failed']
  }

  return NextResponse.json(checks, { 
    status: checks.status === 'error' ? 503 : 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Response-Time': `${Date.now() - startTime}ms`
    }
  })
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
