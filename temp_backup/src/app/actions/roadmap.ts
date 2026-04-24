"use server";

export async function saveToolData(toolId: string, data: any, options: any) {
  console.log("Mock saveToolData called for tool:", toolId);
  console.log("Data:", data);
  console.log("Options:", options);
  
  // Return a success mock
  return { success: true, message: "Tool data saved locally (mock)." };
}
