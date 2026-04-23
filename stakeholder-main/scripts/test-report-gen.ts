
async function verifyReportAPI() {
  const url = "http://localhost:3005/api/research/generate";
  const payload = {
    title: "Regional Agricultural Impact Assessment 2026",
    reportType: "Sector-Analysis",
    districts: ["Mysuru", "Mandya", "Hassan"],
    sectorIds: ["energy"], // Using IDs found in DB earlier or dummy
    researchQuestions: [
      "How is irrigation affecting crop yield?",
      "What are the primary blockers for solar adoption?"
    ]
  };

  console.log("Triggering report generation...");
  
  try {
    // Note: This will fail with 401 if unauthenticated, but we can check logs to see if it reached the guard
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

verifyReportAPI();
