const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const evidences = await prisma.cRLEvidence.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
        id: true,
        dimension: true,
        evidenceText: true,
        status: true,
        aiScore: true,
        assessmentNotes: true
    }
  });
  console.log(JSON.stringify(evidences, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
