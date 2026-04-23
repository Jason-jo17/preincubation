export const VERTICALS = [
    'Human Capital',
    'Strategic Planning',
    'Market Presence',
    'Operational Excellence',
    'Financial Health',
    'Technology Adoption',
] as const;

export type Vertical = (typeof VERTICALS)[number];
