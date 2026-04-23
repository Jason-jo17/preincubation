
async function triggerProcessing() {
  const transcriptId = "cmmorcv7b0000dc371wd7j1rq";
  const url = "http://localhost:3005/api/transcripts/process";

  console.log(`Triggering processing for ${transcriptId}...`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcriptId }),
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error triggering processing:", error);
  }
}

triggerProcessing();
