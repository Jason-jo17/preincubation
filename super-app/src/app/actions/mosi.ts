'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth-utils';

export async function scheduleMosiSession(formData: {
  stakeholderName: string;
  company?: string;
  location: string;
  date: string;
  time: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const session = await prisma.mosiSession.create({
    data: {
      userId: user.id,
      stakeholderName: formData.stakeholderName,
      company: formData.company,
      location: formData.location,
      date: new Date(formData.date),
      time: formData.time,
      status: 'Scheduled',
    },
  });

  revalidatePath('/mosi/schedule');
  return session;
}

export async function getMosiSessions() {
  const user = await getCurrentUser();
  if (!user) return [];

  return prisma.mosiSession.findMany({
    where: { userId: user.id },
    orderBy: { date: 'asc' },
  });
}

export async function cancelMosiSession(sessionId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await prisma.mosiSession.updateMany({
    where: {
      id: sessionId,
      userId: user.id,
    },
    data: {
      status: 'Cancelled',
    },
  });

  revalidatePath('/mosi/schedule');
}
