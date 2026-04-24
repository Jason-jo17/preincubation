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
    const createRecursiveProxy = (targetName: string): any => {
      return new Proxy(() => {}, {
        get: (target, prop) => {
          if (prop === '$connect' || prop === '$disconnect') return () => Promise.resolve()
          
          const fullName = `${targetName}.${String(prop)}`
          // If it looks like a Prisma method (common ones), return the mock resolver
          const prismaMethods = ['findMany', 'findUnique', 'findFirst', 'create', 'update', 'delete', 'upsert', 'count', 'aggregate', 'groupBy']
          if (prismaMethods.includes(String(prop))) {
            return () => {
              console.warn(`[Prisma] Attempted to call ${fullName} on missing database.`)
              return Promise.resolve([])
            }
          }

          // Otherwise, return another proxy for the next level
          return createRecursiveProxy(fullName)
        },
        // Handle direct calls if the proxy is called as a function
        apply: (target, thisArg, argumentsList) => {
          console.warn(`[Prisma] Attempted to call ${targetName} as a function on missing database.`)
          return Promise.resolve([])
        }
      })
    }

    return createRecursiveProxy(name) as T
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
