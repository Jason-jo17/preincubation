// src/constants/ceed-framework.ts

export const CEED_FRAMEWORK = {
  CORE: {
    name: 'Core',
    description: 'Essential operations that keep the business running',
    weight: 1.0,
    color: '#3B82F6',
    examples: ['Inventory Management', 'Order Processing', 'Invoicing', 'Attendance'],
  },
  EXPANSION: {
    name: 'Expansion',
    description: 'Growth enablers that help scale the business',
    weight: 1.2,
    color: '#22C55E',
    examples: ['Lead Generation', 'Market Analysis', 'Customer Acquisition', 'Channel Expansion'],
  },
  EFFICIENCY: {
    name: 'Efficiency',
    description: 'Process optimizations that save time and reduce costs',
    weight: 1.1,
    color: '#F59E0B',
    examples: ['Workflow Automation', 'Quality Control', 'Resource Optimization', 'Reporting'],
  },
  DISRUPTION: {
    name: 'Disruption',
    description: 'Innovative solutions that create competitive advantages',
    weight: 1.5,
    color: '#EF4444',
    examples: ['AI-Powered Insights', 'Predictive Analytics', 'Autonomous Systems', 'Novel Business Models'],
  },
} as const;

// CEED Score Calculation
export function calculateCEEDScore(
  impact: number,      // 1-10
  complexity: number,  // 1-10
  innovation: number,  // 1-10
  category: keyof typeof CEED_FRAMEWORK
): number {
  const weight = CEED_FRAMEWORK[category].weight;
  const rawScore = (impact * complexity * innovation) / 100;
  return Math.round(rawScore * weight * 100) / 10;
}
