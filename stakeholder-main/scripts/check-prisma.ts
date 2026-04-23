import { prisma } from '../lib/prisma'

async function test() {
  console.log("Starting Transaction & Template Bypass Check...");
  
  try {
    console.log("1. Testing Transaction...");
    const result = await (prisma as any).$transaction(async (tx: any) => {
        console.log("   Inside transaction...");
        const u = await tx.user.findFirst();
        return u;
    });
    console.log("   Transaction result (user):", result ? result.email : "None");
    
    console.log("2. Testing Sprint Templates...");
    const templates = await (prisma as any).sprintTemplate.findMany();
    console.log("   Templates found:", templates.length);
    if (templates.length > 0) {
        console.log("   First Template Tools:", templates[0].tools?.length || 0);
    }

    console.log("3. Testing Student Journey (nested sprints)...");
    const journey = await (prisma.studentJourney.findUnique({
        where: { userId: 'some-user-id' },
        include: { sprints: true } as any
    }) as any);
    console.log("   Journey Sprints found:", journey?.sprints?.length || 0);
    
    await prisma.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error("TRANSACTION/TEMPLATE BYPASS ERROR:", err);
    process.exit(1);
  }
}

test();
