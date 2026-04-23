export const DIMENSIONS = [
    'Leadership',
    'Talent Strategy',
    'Product Innovation',
    'Customer Acquisition',
    'Process Automation',
    'Risk Management',
    'Financial Controls',
    'Supply Chain',
    'Digital Transformation',
] as const;

export type Dimension = (typeof DIMENSIONS)[number];
