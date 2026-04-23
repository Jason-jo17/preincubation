import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const transcript = await prisma.transcript.create({
    data: {
      title: "Strategic Stakeholder Interview - Agriculture Sector",
      description: "Discussion about irrigation challenges in rural districts.",
      transcriptType: "Interview",
      originalFile: "test-transcript.txt",
      fileName: "test-transcript.txt",
      fileType: "text/plain",
      uploadedBy: "system",
      rawText: `
Interviewer: Today we are talking with Mr. Sharma about irrigation. Mr. Sharma, what are the primary challenges?
Mr. Sharma: The main issue is the aging infrastructure of the canals. In the rural districts, almost 40% of the water is lost due to seepage before it reaches the fields.
Interviewer: That sounds critical. What are the proposed solutions?
Mr. Sharma: We need to implement concrete lining for the main channels and introduce solar-powered drip irrigation kits for small-scale farmers. This would decrease dependency on the monsoon and save water significantly.
Interviewer: What's the biggest blocker for these implementations?
Mr. Sharma: Funding and awareness. Most farmers are used to traditional flood irrigation. We need localized workshops to demonstrate the benefits of drip irrigation and provide micro-financing options.
Interviewer: Thank you for the insights. 
Action Items:
1. Conduct field visits to the Western canal.
2. Draft a proposal for the solar-powered kit subsidy.
3. Organize a workshop in District A.
`
    }
  });
  console.log("Created transcript:", transcript.id);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
