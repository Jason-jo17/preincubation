
import { prisma } from '../lib/prisma';

async function check() {
  try {
    const studentCount = await prisma.user.count({
      where: { role: 'STUDENT' }
    });
    console.log('Student count:', studentCount);

    const journeyCount = await prisma.studentJourney.count();
    console.log('StudentJourney count:', journeyCount);

    // Find a student who has a journey
    const studentWithJourney = await prisma.user.findFirst({
        where: { role: 'STUDENT', studentJourney: { isNot: null } },
        include: { studentJourney: true }
    });
    console.log('Student with journey:', studentWithJourney ? studentWithJourney.email : 'None');

  } catch (err) {
    console.error('Check failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
