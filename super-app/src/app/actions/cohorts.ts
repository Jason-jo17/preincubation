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
