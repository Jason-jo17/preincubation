import * as z from 'zod';

export const companySchema = z.object({
    name: z.string().min(2, 'Company name must be at least 2 characters'),
    sector: z.enum(['advanced_manufacturing', 'fintech', 'agritech', 'edtech', 'aerospace']),
    sub_sector: z.string().min(2, 'Sub-sector is required'),
    stage: z.enum(['seed', 'early', 'growth', 'mature']),
    founded_year: z.number().min(1900).max(new Date().getFullYear()),
    headquarters_city: z.string().min(2),
    headquarters_state: z.string().min(2),
    website: z.string().url().optional().or(z.literal('')),
    employee_count: z.number().min(0).optional(),
    revenue_current: z.number().min(0).optional(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
