/**
 * Shim for missing id-mapper.ts
 * In a real application, this would translate between demo IDs and database UUIDs.
 */

export function getUUID(id: string): string {
    // For now, assume the ID is already a UUID or just return it
    return id;
}

export function getDemoID(id: string): string {
    // For now, assume the ID is already a demo ID or just return it
    return id;
}
