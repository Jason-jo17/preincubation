import * as z from 'zod';

export const companySchema = z.object({
    name: z.string().min(2, 'Company name must be at least 2 characters'),
    sector: z.enum(['advanced_manufacturing', 'fintech', 'agritech', 'edtech', 'aerospace', 'bfsi', 'logistics', 'automation', 'oil_gas_petro', 'port-logistics', 'it-ites', 'healthcare', 'food-processing', 'cashew', 'engineering', 'construction', 'marine-eng', 'hospitality', 'tile-refractories', 'auto-components', 'printing-packaging', 'rubber-plastic', 'jewelry', 'retail', 'manufacturing-engineering-nagpur', 'light-engineering-cnc', 'aerospace-defense-nagpur', 'solar-clean-tech-nagpur', 'mining-equipment-spm', 'food-processing-nagpur', 'logistics-multimodal-nagpur', 'aerospace-defense', 'auto-ancillaries', 'textiles', 'steel-metals', 'mining-minerals', 'power-energy', 'education-research', 'electronics-electrical', 'chemicals-pharma', 'retail-trade', 'printing-publishing', 'hospitality-tourism']),
    sub_sector: z.string().min(2, 'Sub-sector is required'),
    stage: z.enum(['seed', 'early', 'growth', 'mature']),
    founded_year: z.number().min(1900).max(new Date().getFullYear()),
    headquarters_city: z.string(),
    headquarters_state: z.string(),
    website: z.string().url().optional().or(z.literal('')),
    employee_count: z.number().min(0).optional(),
    revenue_current: z.number().min(0).optional(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
