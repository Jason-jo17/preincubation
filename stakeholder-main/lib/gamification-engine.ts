import { prisma } from "./prisma"

export const XP_TABLE = {
  TOOL_SUBMISSION: 50,
  GATE_PASS: 200,
  INTERACTION_LOG: 30,
  STAKEHOLDER_ADD: 20,
  WEEKLY_SUMMARY_READ: 10,
}

/**
 * Awards XP to a student and handles level-up logic.
 * @param userId The ID of the student user
 * @param action The action type from XP_TABLE
 * @returns Object with newXP, oldLevel, newLevel
 */
export async function awardXP(userId: string, action: keyof typeof XP_TABLE) {
  const points = XP_TABLE[action]
  
  const student = await prisma.studentProfile.findUnique({
    where: { userId },
    select: { id: true, xp: true, level: true, points: true }
  })
  
  if (!student) return null
  
  const oldXP = student.xp
  const newXP = oldXP + points
  const oldLevel = student.level
  const newLevel = calculateLevel(newXP)
  
  const updated = await prisma.studentProfile.update({
    where: { id: student.id },
    data: {
      xp: newXP,
      points: student.points + points, // Currency (points) matches XP for now
      level: newLevel
    }
  })
  
  return {
    xpAwarded: points,
    totalXP: newXP,
    oldLevel,
    newLevel,
    leveledUp: newLevel > oldLevel
  }
}

/**
 * Calculates level based on XP.
 * Formula: Level = floor(sqrt(XP / 100)) + 1
 * Level 1: 0-99 XP
 * Level 2: 100-399 XP
 * Level 3: 400-899 XP
 * etc.
 */
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

/**
 * Gets XP needed for the next level.
 */
export function getXPForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100
}
