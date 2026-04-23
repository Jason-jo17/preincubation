const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const StuckEvidenceId = "cmmn3p6910007t10qxcbg"; // From earlier output
  
  console.log("Fetching stuck evidence...");
  const evidence = await prisma.cRLEvidence.findUnique({
    where: { id: StuckEvidenceId }
  });
  
  if (!evidence) {
    console.error("Evidence not found!");
    return;
  }
  
  console.log("Triggering assessment via internal API call simulation...");
  // Note: We can't easily call the API route here due to session requirements, 
  // but we can check if there are any other logs in the console from previous attempts.
  
  // Let's just check the last 10 evidences again to see if ANY updated.
  const allEvidences = await prisma.cRLEvidence.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  
  console.log("Current status of last 10 CRL evidences:");
  allEvidences.forEach(e => {
    console.log(`${e.id} | ${e.status} | Score: ${e.aiScore} | Created: ${e.createdAt}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
