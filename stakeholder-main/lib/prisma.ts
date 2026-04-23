
import { PrismaClient, Prisma } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Manual definition of the Role enum to avoid export issues
export const UserRole = {
  STAKEHOLDER: 'STAKEHOLDER',
  STUDENT: 'STUDENT',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
  RESEARCHER: 'RESEARCHER'
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export { prisma, Prisma }
export default prisma
