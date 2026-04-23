
import { prisma } from '../lib/prisma';

async function check() {
  try {
    const roles = await prisma.user.groupBy({
      by: ['role'],
      _count: { id: true }
    });
    console.log('User roles in DB:', roles);
  } catch (err) {
    console.error('Check failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
