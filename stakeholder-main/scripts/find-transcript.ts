import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const transcript = await prisma.transcript.findFirst({
    select: { id: true, title: true }
  });
  console.log(JSON.stringify(transcript));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
