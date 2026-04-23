import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const t = await prisma.transcript.findUnique({
    where: { id: "cmmorcv7b0000dc371wd7j1rq" },
    select: { 
      processingStatus: true, 
      processingError: true, 
      summary: true,
      keyPoints: true,
      embeddings: {
        select: { id: true }
      }
    }
  });
  console.log(JSON.stringify(t, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
