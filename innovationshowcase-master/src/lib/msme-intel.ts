// src/lib/msme-intel.ts

const MSME_INTEL_URL = process.env.NEXT_PUBLIC_MSME_INTEL_URL || 'https://api.msme-intel.inunity.in';

export const msmeIntelClient = {
  // Fetch companies
  async getCompanies(params?: { sector?: string; size?: string; page?: number }) {
    if (process.env.NEXT_PUBLIC_USE_LOCAL_BRIDGE === 'true') {
      const searchParams = new URLSearchParams(params as any);
      const response = await fetch(`/api/intel/companies?${searchParams}`);
      return response.json();
    }
    const searchParams = new URLSearchParams(params as any);
    const response = await fetch(`${MSME_INTEL_URL}/v1/companies?${searchParams}`);
    return response.json();
  },


  // Get company details
  async getCompany(id: string) {
    const response = await fetch(`${MSME_INTEL_URL}/v1/companies/${id}`);
    return response.json();
  },

  // Fetch sector gaps (automation needs)
  async getSectorGaps(sectorId: string) {
    if (process.env.NEXT_PUBLIC_USE_LOCAL_BRIDGE === 'true') {
      const response = await fetch(`/api/intel/sectors/gaps`);
      const data = await response.json();
      return data.filter((g: any) => g.sector_id === sectorId);
    }
    const response = await fetch(`${MSME_INTEL_URL}/v1/sectors/${sectorId}/gaps`);
    return response.json();
  },


  // Fetch problem statements
  async getProblemStatements(params?: { sector?: string; urgency?: string }) {
    const searchParams = new URLSearchParams(params as any);
    const response = await fetch(`${MSME_INTEL_URL}/v1/problem-statements?${searchParams}`);
    return response.json();
  },

  // Get problem statement details
  async getProblemStatement(id: string) {
    const response = await fetch(`${MSME_INTEL_URL}/v1/problem-statements/${id}`);
    return response.json();
  },

  // Submit match (project to problem statement)
  async submitMatch(data: {
    projectId: string;
    problemStatementId: string;
    fitExplanation?: string;
  }) {
    const response = await fetch(`${MSME_INTEL_URL}/v1/recommendations/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Get AI recommendations for a project
  async getRecommendations(projectId: string) {
    const response = await fetch(`${MSME_INTEL_URL}/v1/recommendations/for-project/${projectId}`);
    return response.json();
  },

  // Sync sectors from MSME Intel
  async syncSectors() {
    if (process.env.NEXT_PUBLIC_USE_LOCAL_BRIDGE === 'true') {
      const response = await fetch(`/api/intel/sectors/gaps`);
      return response.json();
    }
    const response = await fetch(`${MSME_INTEL_URL}/v1/sectors`);
    return response.json();
  },

};

// Webhook handler for MSME Intel updates
export async function handleMSMEIntelWebhook(event: {
  type: string;
  payload: any;
}) {
  console.log('MSME Intel Webhook received:', event.type);
  switch (event.type) {
    case 'problem_statement.created':
      // Notify relevant projects
      break;
    case 'company.updated':
      // Update local cache
      break;
    case 'match.approved':
      // Trigger notification to student
      break;
  }
}
