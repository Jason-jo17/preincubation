'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-utils';

export async function getCohorts() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'MENTOR') throw new Error('Unauthorized');

  const mentees = await prisma.menteeProfile.findMany({
    include: {
      user: true,
      sprintNodes: true,
    },
  });

  // Group by cohort
  const cohortsMap = mentees.reduce((acc, mentee) => {
    const cohortName = mentee.cohort || 'Unassigned';
    if (!acc[cohortName]) {
      acc[cohortName] = {
        name: cohortName,
        mentees: [],
        avgTrl: 0,
      };
    }
    acc[cohortName].mentees.push(mentee);
    return acc;
  }, {} as Record<string, any>);

  return Object.values(cohortsMap).map(cohort => {
    const totalTrl = cohort.mentees.reduce((sum: number, m: any) => sum + m.trlLevel, 0);
    return {
      ...cohort,
      avgTrl: totalTrl / cohort.mentees.length,
      activeSprints: cohort.mentees.filter((m: any) => m.sprintNodes.some((s: any) => s.status === 'ACTIVE')).length,
    };
  });
}

export async function getCohortDetails(cohortName: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'MENTOR') throw new Error('Unauthorized');

  const mentees = await prisma.menteeProfile.findMany({
    where: { cohort: cohortName },
    include: {
      user: true,
      sprintNodes: {
        orderBy: { sprintNumber: 'asc' }
      },
    },
  });

  if (mentees.length === 0) return null;

  const totalTrl = mentees.reduce((sum, m) => sum + m.trlLevel, 0);
  const avgTrl = totalTrl / mentees.length;
  
  // Framework aggregation
  const activeSprints = mentees.filter(m => m.sprintNodes.some(s => s.status === 'ACTIVE')).length;
  const completedSprints = mentees.reduce((acc, m) => acc + m.sprintNodes.filter(s => s.status === 'COMPLETED').length, 0);

  return {
    name: cohortName,
    mentees,
    stats: {
      totalMentees: mentees.length,
      avgTrl,
      activeSprints,
      completedSprints,
      retention: 100, // Placeholder
    }
  };
}

