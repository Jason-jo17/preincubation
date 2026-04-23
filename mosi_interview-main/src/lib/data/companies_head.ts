import { Company, CompanyStage, CompanySector } from '@/lib/types/company';
import { getUUID, getDemoID } from '@/lib/id-mapper';

// NEW_COMPANIES is currently unavailable if new-companies.ts is missing.
const NEW_COMPANIES: any[] = [];
const NEW_COMPANIES_BASIC: Company[] = NEW_COMPANIES.map(nc => ({
    id: nc.id,
    name: nc.name,
    sector: nc.sector as CompanySector,
    sub_sector: nc.sub_sector || 'Aerospace',
    stage: nc.stage as CompanyStage,
    founded_year: nc.founded_year,
    headquarters_city: nc.headquarters_city,
    headquarters_state: nc.headquarters_state,
    website: nc.website,
    employee_count: nc.employee_count,
    revenue_current: nc.latest_revenue ? nc.latest_revenue * 10000000 : 0,
    revenue_growth_rate: nc.revenue_growth_yoy,
    current_stage: nc.current_stage,
    rag_status: nc.rag_status,
    created_at: nc.created_at,
    updated_at: nc.updated_at
}));

// Local interface for the raw data structure
interface RawCompany {
    id: string;
    name: string;
    sector: string;
    sub_sector: string;
    founded_year: number;
    headquarters_city: string;
    headquarters_state: string;
    employee_count: number;
    website: string;
    current_stage: number;
    stage?: string;
    revenue_current?: number;
    revenue_growth_rate?: number;
    rag_status?: 'red' | 'amber' | 'green';
}

const RAW_DATA: RawCompany[] = [
    // ADVANCED MANUFACTURING (10 companies)
    {
        id: 'comp-001',
        name: 'TechForge Manufacturing',
        sector: 'advanced_manufacturing',
        sub_sector: 'Electronics',
        founded_year: 2018,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 85,
        website: 'https://techforge.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 150000000,
        revenue_growth_rate: 35,
    },
    {
        id: 'comp-002',
        name: 'Precision Components Ltd',
        sector: 'advanced_manufacturing',
        sub_sector: 'Auto Components',
        founded_year: 2016,
        headquarters_city: 'Pune',
        headquarters_state: 'Maharashtra',
        employee_count: 120,
        website: 'https://precision.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 220000000,
        revenue_growth_rate: 28,
    },
    {
        id: 'comp-003',
        name: 'NanoTech Innovations',
        sector: 'advanced_manufacturing',
        sub_sector: 'Electronics',
        founded_year: 2020,
        headquarters_city: 'Chennai',
        headquarters_state: 'Tamil Nadu',
        employee_count: 45,
        website: 'https://nanotech.example.com',
        current_stage: 5,
        stage: 'Early Growth',
        revenue_current: 50000000,
        revenue_growth_rate: 120,
    },
    {
        id: 'comp-004',
        name: 'SmartFactory Systems',
        sector: 'advanced_manufacturing',
        sub_sector: 'Automation',
        founded_year: 2019,
        headquarters_city: 'Ahmedabad',
        headquarters_state: 'Gujarat',
        employee_count: 65,
        website: 'https://smartfactory.example.com',
        current_stage: 4,
        stage: 'Growth',
        revenue_current: 85000000,
        revenue_growth_rate: 45,
    },
    {
        id: 'comp-005',
        name: 'GreenMetal Works',
        sector: 'advanced_manufacturing',
        sub_sector: 'Precision Engineering',
        founded_year: 2017,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 95,
        website: 'https://greenmetal.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 180000000,
        revenue_growth_rate: 18,
    },
    {
        id: 'comp-006',
        name: 'FutureFab Technologies',
        sector: 'advanced_manufacturing',
        sub_sector: 'Electronics',
        founded_year: 2021,
        headquarters_city: 'Hyderabad',
        headquarters_state: 'Telangana',
        employee_count: 35,
        website: 'https://futurefab.example.com',
        current_stage: 3,
        stage: 'Seed',
        revenue_current: 25000000,
        revenue_growth_rate: 200,
    },
    {
        id: 'comp-007',
        name: 'PowerDrive Components',
        sector: 'advanced_manufacturing',
        sub_sector: 'Auto Components',
        founded_year: 2015,
        headquarters_city: 'Coimbatore',
        headquarters_state: 'Tamil Nadu',
        employee_count: 140,
        website: 'https://powerdrive.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 280000000,
        revenue_growth_rate: 15,
    },
    {
        id: 'comp-008',
        name: 'MicroCircuit Solutions',
        sector: 'advanced_manufacturing',
        sub_sector: 'Electronics',
        founded_year: 2022,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 25,
        website: 'https://microcircuit.example.com',
        current_stage: 2,
        stage: 'Seed',
        revenue_current: 12000000,
        revenue_growth_rate: 0,
    },
    {
        id: 'comp-009',
        name: 'IndustrialTech Pro',
        sector: 'advanced_manufacturing',
        sub_sector: 'Automation',
        founded_year: 2018,
        headquarters_city: 'Pune',
        headquarters_state: 'Maharashtra',
        employee_count: 78,
        website: 'https://industrialtech.example.com',
        current_stage: 5,
        stage: 'Growth',
        revenue_current: 110000000,
        revenue_growth_rate: 55,
    },
    {
        id: 'comp-010',
        name: 'Precision Laser Systems',
        sector: 'advanced_manufacturing',
        sub_sector: 'Precision Engineering',
        founded_year: 2019,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 52,
        website: 'https://precisionlaser.example.com',
        current_stage: 4,
        stage: 'Growth',
        revenue_current: 65000000,
        revenue_growth_rate: 40,
    },

    // FINTECH (10 companies)
    {
        id: 'comp-011',
        name: 'PayEase Solutions',
        sector: 'fintech',
        sub_sector: 'Payments',
        founded_year: 2019,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 120,
        website: 'https://payease.example.com',
        current_stage: 6,
        stage: 'Scale-up',
        revenue_current: 180000000,
        revenue_growth_rate: 45,
    },
    {
        id: 'comp-012',
        name: 'LendSmart Technologies',
        sector: 'fintech',
        sub_sector: 'Lending',
        founded_year: 2020,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 85,
        website: 'https://lendsmart.example.com',
        current_stage: 6,
        stage: 'Growth',
        revenue_current: 95000000,
        revenue_growth_rate: 60,
    },
    {
        id: 'comp-013',
        name: 'WealthTech Advisors',
        sector: 'fintech',
        sub_sector: 'Wealth Management',
        founded_year: 2018,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 95,
        website: 'https://wealthtech.example.com',
        current_stage: 5,
        stage: 'Established',
        revenue_current: 140000000,
        revenue_growth_rate: 25,
    },
    {
        id: 'comp-014',
        name: 'InsureTech Plus',
        sector: 'fintech',
        sub_sector: 'Insurance',
        founded_year: 2021,
        headquarters_city: 'Pune',
        headquarters_state: 'Maharashtra',
        employee_count: 45,
        website: 'https://insuretech.example.com',
        current_stage: 4,
        stage: 'Early Growth',
        revenue_current: 35000000,
        revenue_growth_rate: 80,
    },
    {
        id: 'comp-015',
        name: 'CryptoGate India',
        sector: 'fintech',
        sub_sector: 'Blockchain',
        founded_year: 2020,
        headquarters_city: 'Delhi',
        headquarters_state: 'Delhi',
        employee_count: 55,
        website: 'https://cryptogate.example.com',
        current_stage: 3,
        stage: 'Early Stage',
        revenue_current: 45000000,
        revenue_growth_rate: 150,
    },
    {
        id: 'comp-016',
        name: 'QuickPay Merchants',
        sector: 'fintech',
        sub_sector: 'Payments',
        founded_year: 2019,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 110,
        website: 'https://quickpay.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 160000000,
        revenue_growth_rate: 40,
    },
    {
        id: 'comp-017',
        name: 'MicroLoan Connect',
        sector: 'fintech',
        sub_sector: 'Lending',
        founded_year: 2021,
        headquarters_city: 'Jaipur',
        headquarters_state: 'Rajasthan',
        employee_count: 38,
        website: 'https://microloan.example.com',
        current_stage: 4,
        stage: 'Early Growth',
        revenue_current: 28000000,
        revenue_growth_rate: 50,
    },
    {
        id: 'comp-018',
        name: 'InvestSmart Platform',
        sector: 'fintech',
        sub_sector: 'Wealth Management',
        founded_year: 2018,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 88,
        website: 'https://investsmart.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 130000000,
        revenue_growth_rate: 22,
    },
    {
        id: 'comp-019',
        name: 'PolicyPro Digital',
        sector: 'fintech',
        sub_sector: 'Insurance',
        founded_year: 2020,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 62,
        website: 'https://policypro.example.com',
        current_stage: 5,
        stage: 'Growth',
        revenue_current: 75000000,
        revenue_growth_rate: 55,
    },
    {
        id: 'comp-020',
        name: 'NeoBanking Solutions',
        sector: 'fintech',
        sub_sector: 'Banking',
        founded_year: 2021,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 42,
        website: 'https://neobanking.example.com',
        current_stage: 3,
        stage: 'Seed',
        revenue_current: 20000000,
        revenue_growth_rate: 100,
    },

    // AGRITECH (10 companies)
    {
        id: 'comp-021',
        name: 'FarmTech Solutions',
        sector: 'agritech',
        sub_sector: 'Precision Agriculture',
        founded_year: 2019,
        headquarters_city: 'Pune',
        headquarters_state: 'Maharashtra',
        employee_count: 75,
        website: 'https://farmtech.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 90000000,
        revenue_growth_rate: 42,
    },
    {
        id: 'comp-022',
        name: 'AgroData Analytics',
        sector: 'agritech',
        sub_sector: 'Farm Management',
        founded_year: 2020,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 48,
        website: 'https://agrodata.example.com',
        current_stage: 5,
        stage: 'Growth',
        revenue_current: 55000000,
        revenue_growth_rate: 65,
    },
    {
        id: 'comp-023',
        name: 'SmartIrrigation Systems',
        sector: 'agritech',
        sub_sector: 'Irrigation Tech',
        founded_year: 2018,
        headquarters_city: 'Hyderabad',
        headquarters_state: 'Telangana',
        employee_count: 65,
        website: 'https://smartirrigation.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 110000000,
        revenue_growth_rate: 28,
    },
    {
        id: 'comp-024',
        name: 'CropGuard AI',
        sector: 'agritech',
        sub_sector: 'Crop Protection',
        founded_year: 2021,
        headquarters_city: 'Nashik',
        headquarters_state: 'Maharashtra',
        employee_count: 32,
        website: 'https://cropguard.example.com',
        current_stage: 4,
        stage: 'Early Growth',
        revenue_current: 28000000,
        revenue_growth_rate: 75,
    },
    {
        id: 'comp-025',
        name: 'AgriMarket Connect',
        sector: 'agritech',
        sub_sector: 'Supply Chain',
        founded_year: 2019,
        headquarters_city: 'Indore',
        headquarters_state: 'Madhya Pradesh',
        employee_count: 58,
        website: 'https://agrimarket.example.com',
        current_stage: 5,
        stage: 'Growth',
        revenue_current: 72000000,
        revenue_growth_rate: 38,
    },
    {
        id: 'comp-026',
        name: 'DroneAg Services',
        sector: 'agritech',
        sub_sector: 'Precision Agriculture',
        founded_year: 2020,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 42,
        website: 'https://droneag.example.com',
        current_stage: 4,
        stage: 'Early Stage',
        revenue_current: 38000000,
        revenue_growth_rate: 90,
    },
    {
        id: 'comp-027',
        name: 'BioFertilizer Innovations',
        sector: 'agritech',
        sub_sector: 'Agri Inputs',
        founded_year: 2017,
        headquarters_city: 'Ahmedabad',
        headquarters_state: 'Gujarat',
        employee_count: 88,
        website: 'https://biofertilizer.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 135000000,
        revenue_growth_rate: 22,
    },
    {
        id: 'comp-028',
        name: 'FarmCredit Plus',
        sector: 'agritech',
        sub_sector: 'Agri Finance',
        founded_year: 2021,
        headquarters_city: 'Pune',
        headquarters_state: 'Maharashtra',
        employee_count: 35,
        website: 'https://farmcredit.example.com',
        current_stage: 3,
        stage: 'Seed',
        revenue_current: 18000000,
        revenue_growth_rate: 110,
    },
    {
        id: 'comp-029',
        name: 'WeatherSmart Agri',
        sector: 'agritech',
        sub_sector: 'Advisory Services',
        founded_year: 2020,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 52,
        website: 'https://weathersmart.example.com',
        current_stage: 5,
        stage: 'Growth',
        revenue_current: 58000000,
        revenue_growth_rate: 45,
    },
    {
        id: 'comp-030',
        name: 'HydroFarm Technologies',
        sector: 'agritech',
        sub_sector: 'Controlled Environment',
        founded_year: 2019,
        headquarters_city: 'Pune',
        headquarters_state: 'Maharashtra',
        employee_count: 68,
        website: 'https://hydrofarm.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 82000000,
        revenue_growth_rate: 35,
    },
];

const mapStage = (stageStr?: string): CompanyStage => {
    if (!stageStr) return 'Growth';
    const s = stageStr.toLowerCase();
    if (s.includes('seed') || s.includes('early stage')) return 'Seed';
    if (s.includes('early')) return 'Early';
    if (s.includes('scale-up')) return 'Scale-up';
    if (s.includes('established')) return 'Established';
    if (s.includes('expansion')) return 'Expansion';
    if (s.includes('mature')) return 'Mature';
    return 'Growth'; // default
};

const mapToCompany = (raw: RawCompany): Company => {
    return {
        id: raw.id,
        name: raw.name,
        sector: raw.sector as CompanySector,
        sub_sector: raw.sub_sector,
        stage: mapStage(raw.stage),
        founded_year: raw.founded_year,
        foundedYear: raw.founded_year,
        headquarters_city: raw.headquarters_city,
        headquarters_state: raw.headquarters_state,
        website: raw.website,
        employee_count: raw.employee_count,
        revenue_current: raw.revenue_current,
        revenue_growth_rate: raw.revenue_growth_rate,
        current_stage: raw.current_stage,
        rag_status: raw.rag_status || (['green', 'amber', 'red'][Math.floor(Math.random() * 3)] as 'green' | 'amber' | 'red'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
};

export const DEMO_COMPANIES: Company[] = RAW_DATA.map(mapToCompany);

export function getCompaniesBySector(sector: string): Company[] {
    return DEMO_COMPANIES.filter(c => c.sector === sector);
}

export const ALL_COMPANIES_FOR_FILTERS = [...NEW_COMPANIES_BASIC, ...DEMO_COMPANIES];

export function getCompaniesByFilter(filters: { sector?: string; stage?: number | string; region?: string; search?: string }): Company[] {
    let filtered = ALL_COMPANIES_FOR_FILTERS;

    if (filters.sector && filters.sector !== 'all') {
        filtered = filtered.filter(c => c.sector === filters.sector);
    }

    if (filters.stage && filters.stage !== 'all') {
        if (typeof filters.stage === 'string') {
            const stageStr = filters.stage.toLowerCase();
            filtered = filtered.filter(c => c.stage.toLowerCase() === stageStr);
        }
    }

    if (filters.region && filters.region !== 'all') {
        filtered = filtered.filter(c => c.headquarters_state === filters.region);
    }

    if (filters.search) {
        const lowerSearch = filters.search.toLowerCase();
        filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(lowerSearch) ||
            (c.sub_sector?.toLowerCase().includes(lowerSearch)) ||
            (c.headquarters_city?.toLowerCase().includes(lowerSearch))
        );
    }

    return filtered;
}

export function getCompanyById(id: string): Company | undefined {
    // Translate ID if needed (e.g. if we get a UUID but have a Demo ID, or vice versa)
    const demoId = getDemoID(id);
    const uuid = getUUID(id);

    // Check new detailed companies first
    const newCompany = NEW_COMPANIES_BASIC.find(c => c.id === demoId || c.id === uuid);
    if (newCompany) return newCompany;

    return DEMO_COMPANIES.find(c => c.id === demoId || c.id === uuid);
}

export function getCompaniesByStage(stage: number): Company[] {
    return DEMO_COMPANIES.filter(c => (c.current_stage || 0) >= stage);
}
