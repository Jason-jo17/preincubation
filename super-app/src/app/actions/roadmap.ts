"use server";

export async function saveToolData(toolId: string, data: any, options?: any) {
  console.log("Mock saveToolData called for tool:", toolId, options);
  console.log("Data:", data);
  return { success: true, message: "Tool data saved locally (mock).", error: undefined as string | undefined };
}

export async function getToolData(toolId: string) {
  console.log("Mock getToolData called for tool:", toolId);
  return { success: true, data: null, error: undefined as string | undefined };
}

export async function getAllStakeholders() {
  console.log("Mock getAllStakeholders called");
  return [] as any[];
}

export async function deleteToolData(toolId: string) {
  console.log("Mock deleteToolData called for tool:", toolId);
  return { success: true, error: undefined as string | undefined };
}
