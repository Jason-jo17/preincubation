'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth-utils';

export async function getMentorReviews() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'MENTOR') throw new Error('Unauthorized');

  return prisma.review.findMany({
    where: { reviewerId: user.id },
    include: {
      candidate: {
        include: {
          menteeProfile: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function submitReview(data: {
  candidateId: string;
  title: string;
  score: number;
  sentiment: string;
  feedback: string;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'MENTOR') throw new Error('Unauthorized');

  const review = await prisma.review.create({
    data: {
      reviewerId: user.id,
      candidateId: data.candidateId,
      title: data.title,
      score: data.score,
      sentiment: data.sentiment,
      feedback: data.feedback,
      status: 'COMPLETED',
    },
  });

  revalidatePath('/mentor/review');
  return review;
}

export async function getReviewCandidates() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'MENTOR') throw new Error('Unauthorized');

  return prisma.user.findMany({
    where: { role: 'STUDENT' },
    include: {
      menteeProfile: true,
    },
  });
}
