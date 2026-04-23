
import { prisma } from '../lib/prisma';

async function debug() {
  console.log('Testing Prisma synchronization...');
  try {
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);

    const sprintTemplates = await prisma.sprintTemplate.findMany({
      include: { tools: true },
      take: 1
    });
    console.log('Sprint templates found:', sprintTemplates.length);

    const journeys = await prisma.studentJourney.findMany({
      take: 1,
      include: { sprints: true }
    });
    console.log('Journeys found:', journeys.length);

    console.log('All basic checks passed!');
  } catch (error: any) {
    console.error('DIAGNOSTIC FAILURE:');
    console.error(error);
    if (error.code) console.error('Error Code:', error.code);
    if (error.meta) console.error('Error Meta:', error.meta);
  } finally {
    await prisma.$disconnect();
  }
}

debug();
