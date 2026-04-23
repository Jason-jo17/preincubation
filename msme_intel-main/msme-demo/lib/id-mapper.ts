/**
 * ID Mapper Utility
 * 
 * Maps human-readable Demo IDs (e.g., 'aeq-001') to database UUIDs.
 * This ensures the frontend can use clean identifiers while maintaining 
 * referential integrity with the Supabase database.
 */

export const ID_MAP: Record<string, string> = {
    // Aerospace & Defense
    'aeq-001': 'a2e10480-1000-41d4-a7ae-446655440001',
    'dyn-001': 'd2e10480-2000-41d4-a7ae-446655440002',
    'taal-001': 'c2e10480-3000-41d4-a7ae-446655440003',
    
    // Nagpur NEXT MSME 2026 Cohort
    'ata-001': 'n2e10480-1001-41d4-a7ae-446655440001',
    'company-ashta-001': 'n2e10480-1001-41d4-a7ae-446655440001',
    'open-002': 'n2e10480-1002-41d4-a7ae-446655440002',
    'company-open-002': 'n2e10480-1002-41d4-a7ae-446655440002',
    'ts-003': 'n2e10480-1003-41d4-a7ae-446655440003',
    'company-unid-003': 'n2e10480-1003-41d4-a7ae-446655440003',
    'company-tractor-seva-003': 'n2e10480-1003-41d4-a7ae-446655440003',
    'mod-004': 'n2e10480-1004-41d4-a7ae-446655440004',
    'company-viasat-004': 'n2e10480-1004-41d4-a7ae-446655440004',
    'company-modura-004': 'n2e10480-1004-41d4-a7ae-446655440004',
    'sma-005': 'n2e10480-1005-41d4-a7ae-446655440005',
    'company-smark-005': 'n2e10480-1005-41d4-a7ae-446655440005',
    'mit-006': 'n2e10480-1006-41d4-a7ae-446655440006',
    'company-mitrasena-006': 'n2e10480-1006-41d4-a7ae-446655440006',
    'spw-007': 'n2e10480-1007-41d4-a7ae-446655440007',
    'company-sanjay-precision-007': 'n2e10480-1007-41d4-a7ae-446655440007',
    'bc-008': 'n2e10480-1008-41d4-a7ae-446655440008',
    'company-beta-008': 'n2e10480-1008-41d4-a7ae-446655440008',
    'bis-009': 'n2e10480-1009-41d4-a7ae-446655440009',
    'company-baron-009': 'n2e10480-1009-41d4-a7ae-446655440009',
    'tw-010': 'n2e10480-1010-41d4-a7ae-446655440010',
    'company-techwalnut-010': 'n2e10480-1010-41d4-a7ae-446655440010',
    'nav-011': 'n2e10480-1011-41d4-a7ae-446655440011',
    'company-navitas-011': 'n2e10480-1011-41d4-a7ae-446655440011',
    'ac-012': 'n2e10480-1012-41d4-a7ae-446655440012',
    'company-automation-controls-012': 'n2e10480-1012-41d4-a7ae-446655440012',
    'hix-013': 'n2e10480-1013-41d4-a7ae-446655440013',
    'company-hixaa-013': 'n2e10480-1013-41d4-a7ae-446655440013',
    'company-nav-011': 'n2e10480-1011-41d4-a7ae-446655440011',
    'company-ac-012': 'n2e10480-1012-41d4-a7ae-446655440012',
    'company-hix-013': 'n2e10480-1013-41d4-a7ae-446655440013',
};

// Inverse map for reverse lookups
export const REVERSE_MAP: Record<string, string> = Object.fromEntries(
    Object.entries(ID_MAP).map(([demoId, uuid]) => [uuid, demoId])
);

/**
 * Returns the UUID for a given Demo ID. 
 * If not found, returns the ID as-is (assuming it might already be a UUID).
 */
export function getUUID(id: string): string {
    return ID_MAP[id] || id;
}

/**
 * Returns the Demo ID for a given UUID.
 * If not found, returns the UUID as-is.
 */
export function getDemoID(uuid: string): string {
    return REVERSE_MAP[uuid] || uuid;
}
