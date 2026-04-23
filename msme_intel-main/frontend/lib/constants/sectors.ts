export const SECTORS = [
    { value: 'advanced_manufacturing', label: 'Advanced Manufacturing', color: '#3B82F6' },
    { value: 'fintech', label: 'Fintech', color: '#8B5CF6' },
    { value: 'agritech', label: 'Agritech', color: '#22C55E' },
    { value: 'edtech', label: 'Edtech', color: '#F97316' },
    { value: 'aerospace', label: 'Aerospace', color: '#06B6D4' },
] as const;

export type Sector = (typeof SECTORS)[number];
