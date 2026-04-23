import { NextResponse } from 'next/server'

export interface ApiErrorResponse {
  error: string
  code?: string
  details?: unknown
  timestamp: string
}

export function apiError(
  message: string, 
  status: number = 500, 
  options?: { code?: string; details?: unknown }
): NextResponse<ApiErrorResponse> {
  const response: ApiErrorResponse = {
    error: message,
    timestamp: new Date().toISOString()
  }
  
  if (options?.code) response.code = options.code
  if (options?.details) response.details = options.details
  
  return NextResponse.json(response, { status })
}

export function apiSuccess<T>(data: T, status: number = 200): NextResponse<T> {
  return NextResponse.json(data, { status })
}

export const ApiErrors = {
  UNAUTHORIZED: () => apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' }),
  FORBIDDEN: () => apiError('Forbidden', 403, { code: 'FORBIDDEN' }),
  NOT_FOUND: (resource?: string) => apiError(
    resource ? `${resource} not found` : 'Not found', 
    404, 
    { code: 'NOT_FOUND' }
  ),
  BAD_REQUEST: (message: string, details?: unknown) => apiError(
    message, 400, { code: 'BAD_REQUEST', details }
  ),
  VALIDATION_ERROR: (details: unknown) => apiError(
    'Validation failed', 400, { code: 'VALIDATION_ERROR', details }
  ),
  INTERNAL_ERROR: (message?: string) => apiError(
    message || 'Internal server error', 500, { code: 'INTERNAL_ERROR' }
  ),
  RATE_LIMITED: () => apiError('Too many requests', 429, { code: 'RATE_LIMITED' }),
}

// Rate limiting
interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

export function checkRateLimit(
  identifier: string, 
  limit: number = 100, 
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)
  
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) rateLimitStore.delete(key)
    }
  }
  
  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs
    rateLimitStore.set(identifier, { count: 1, resetTime })
    return { success: true, remaining: limit - 1, resetAt: resetTime }
  }
  
  if (record.count >= limit) {
    return { success: false, remaining: 0, resetAt: record.resetTime }
  }
  
  record.count++
  return { success: true, remaining: limit - record.count, resetAt: record.resetTime }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  if (forwarded) return forwarded.split(',')[0].trim()
  return realIp || 'unknown'
}
