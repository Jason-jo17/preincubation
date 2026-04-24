import { PrismaClient as StakeholderClient } from './prisma/stakeholders'
import { PrismaClient as ShowcaseClient } from './prisma/showcase'

// Helper to create a defensive Prisma client
function createSafePrismaClient<T extends { $connect: () => Promise<void> }>(
  ClientClass: new (args: any) => T,
  envVarName: string,
  name: string
): T {
  const url = process.env[envVarName]
  
  if (!url) {
    console.warn(`[Prisma] ${name} database URL not found (${envVarName}). Returning mock client.`)
    // Return a Proxy that intercepts all calls to prevent crashes
    return new Proxy({} as T, {
      get: (target, prop) => {
        if (prop === '$connect') return () => Promise.resolve()
        if (prop === '$disconnect') return () => Promise.resolve()
        
        // Return a function that returns an empty array or null for common Prisma methods
        return () => {
          console.warn(`[Prisma] Attempted to call ${String(prop)} on missing ${name} database.`)
          return Promise.resolve([])
        }
      }
    })
  }

  try {
    return new ClientClass({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  } catch (error) {
    console.error(`[Prisma] Failed to initialize ${name} client:`, error)
    return new Proxy({} as T, {
      get: () => () => Promise.resolve([])
    })
  }
}

const globalForPrisma = global as unknown as {
  stakeholderPrisma: StakeholderClient | undefined
  showcasePrisma: ShowcaseClient | undefined
}

export const stakeholderDb =
  globalForPrisma.stakeholderPrisma ??
  createSafePrismaClient(StakeholderClient, 'STAKEHOLDERS_DATABASE_URL', 'Stakeholders')

export const showcaseDb =
  globalForPrisma.showcasePrisma ??
  createSafePrismaClient(ShowcaseClient, 'SHOWCASE_DATABASE_URL', 'Showcase')

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.stakeholderPrisma = stakeholderDb
  globalForPrisma.showcasePrisma = showcaseDb
}
