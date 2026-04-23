import { getUUID, getDemoID } from '@/lib/id-mapper';
import { Company, CompanyStage, CompanySector } from '@/lib/types/company';
import { NEW_COMPANIES } from './new-companies';

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
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 120000000,
        revenue_growth_rate: 42,
    },
    {
        id: 'comp-005',
        name: 'EcoPrecision Engineering',
        sector: 'advanced_manufacturing',
        sub_sector: 'Engineering',
        founded_year: 2017,
        headquarters_city: 'Hyderabad',
        headquarters_state: 'Telangana',
        employee_count: 110,
        website: 'https://ecoprecision.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 180000000,
        revenue_growth_rate: 22,
    },
    {
        id: 'comp-006',
        name: 'AeroComponent Dynamics',
        sector: 'advanced_manufacturing',
        sub_sector: 'Aerospace',
        founded_year: 2015,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 150,
        website: 'https://aerocomponent.example.com',
        current_stage: 7,
        stage: 'Growth',
        revenue_current: 250000000,
        revenue_growth_rate: 18,
    },
    {
        id: 'comp-007',
        name: 'RoboBuild Solutions',
        sector: 'advanced_manufacturing',
        sub_sector: 'Robotics',
        founded_year: 2021,
        headquarters_city: 'Gurugram',
        headquarters_state: 'Haryana',
        employee_count: 35,
        website: 'https://robobuild.example.com',
        current_stage: 4,
        stage: 'Seed',
        revenue_current: 30000000,
        revenue_growth_rate: 150,
    },
    {
        id: 'comp-008',
        name: 'OptiTech Optics',
        sector: 'advanced_manufacturing',
        sub_sector: 'Electronics',
        founded_year: 2014,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 180,
        website: 'https://optitech.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 300000000,
        revenue_growth_rate: 15,
    },
    {
        id: 'comp-009',
        name: 'MicroFab Circuits',
        sector: 'advanced_manufacturing',
        sub_sector: 'Semiconductors',
        founded_year: 2019,
        headquarters_city: 'Chandigarh',
        headquarters_state: 'Punjab',
        employee_count: 95,
        website: 'https://microfab.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 140000000,
        revenue_growth_rate: 38,
    },
    {
        id: 'comp-010',
        name: 'GreenMotive EVs',
        sector: 'advanced_manufacturing',
        sub_sector: 'Automotive',
        founded_year: 2020,
        headquarters_city: 'Chennai',
        headquarters_state: 'Tamil Nadu',
        employee_count: 75,
        website: 'https://greenmotive.example.com',
        current_stage: 5,
        stage: 'Early Growth',
        revenue_current: 80000000,
        revenue_growth_rate: 85,
    },

    // AUTOMATION (1 company)
    {
        id: 'ata-001',
        name: 'Ashta Tech Automation',
        sector: 'automation',
        sub_sector: 'Industrial Robotics',
        founded_year: 2016,
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        employee_count: 35,
        website: 'https://www.ashtatech.com',
        current_stage: 4,
        stage: 'growth',
        revenue_current: 52700000, // Derived from 5.27 Cr
        revenue_growth_rate: 205,
        rag_status: 'amber',
    },

    // FINTECH (10 companies)
    {
        id: 'comp-011',
        name: 'PayFlow Solutions',
        sector: 'fintech',
        sub_sector: 'Payments',
        founded_year: 2019,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 120,
        website: 'https://payflow.example.com',
        current_stage: 6,
        stage: 'Growth',
        revenue_current: 180000000,
        revenue_growth_rate: 65,
    },
    {
        id: 'comp-012',
        name: 'LendSmart AI',
        sector: 'fintech',
        sub_sector: 'Lending',
        founded_year: 2020,
        headquarters_city: 'Gurugram',
        headquarters_state: 'Haryana',
        employee_count: 95,
        website: 'https://lendsmart.example.com',
        current_stage: 5,
        stage: 'Early Growth',
        revenue_current: 120000000,
        revenue_growth_rate: 110,
    },
    {
        id: 'comp-013',
        name: 'InsurTech Hub',
        sector: 'fintech',
        sub_sector: 'Insurance',
        founded_year: 2018,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 150,
        website: 'https://insurtech.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 250000000,
        revenue_growth_rate: 45,
    },
    {
        id: 'comp-014',
        name: 'WealthWise Advisor',
        sector: 'fintech',
        sub_sector: 'Wealth Management',
        founded_year: 2017,
        headquarters_city: 'New Delhi',
        headquarters_state: 'Delhi',
        employee_count: 85,
        website: 'https://wealthwise.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 220000000,
        revenue_growth_rate: 25,
    },
    {
        id: 'comp-015',
        name: 'CryptoSecure Wallet',
        sector: 'fintech',
        sub_sector: 'Blockchain',
        founded_year: 2021,
        headquarters_city: 'Hyderabad',
        headquarters_state: 'Telangana',
        employee_count: 45,
        website: 'https://cryptosecure.example.com',
        current_stage: 4,
        stage: 'Seed',
        revenue_current: 40000000,
        revenue_growth_rate: 220,
    },
    {
        id: 'comp-016',
        name: 'BahiKhata Digital',
        sector: 'fintech',
        sub_sector: 'SME Accounting',
        founded_year: 2019,
        headquarters_city: 'Jaipur',
        headquarters_state: 'Rajasthan',
        employee_count: 110,
        website: 'https://bahikhata.example.com',
        current_stage: 6,
        stage: 'Growth',
        revenue_current: 150000000,
        revenue_growth_rate: 55,
    },
    {
        id: 'comp-017',
        name: 'NeoBank Connect',
        sector: 'fintech',
        sub_sector: 'Banking',
        founded_year: 2020,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 130,
        website: 'https://neobank.example.com',
        current_stage: 5,
        stage: 'Early Growth',
        revenue_current: 130000000,
        revenue_growth_rate: 95,
    },
    {
        id: 'comp-018',
        name: 'StockSense Analytics',
        sector: 'fintech',
        sub_sector: 'Trading',
        founded_year: 2016,
        headquarters_city: 'Chennai',
        headquarters_state: 'Tamil Nadu',
        employee_count: 75,
        website: 'https://stocksense.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 280000000,
        revenue_growth_rate: 20,
    },
    {
        id: 'comp-019',
        name: 'RegTech Guard',
        sector: 'fintech',
        sub_sector: 'Compliance',
        founded_year: 2018,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 90,
        website: 'https://regtech.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 160000000,
        revenue_growth_rate: 40,
    },
    {
        id: 'comp-020',
        name: 'AgriPay Finance',
        sector: 'fintech',
        sub_sector: 'Agri-Fintech',
        founded_year: 2021,
        headquarters_city: 'Pune',
        headquarters_state: 'Maharashtra',
        employee_count: 55,
        website: 'https://agripay.example.com',
        current_stage: 4,
        stage: 'Seed',
        revenue_current: 35000000,
        revenue_growth_rate: 180,
    },

    // AGRITECH (10 companies)
    {
        id: 'comp-021',
        name: 'CropYield AI',
        sector: 'agritech',
        sub_sector: 'AI Analytics',
        founded_year: 2019,
        headquarters_city: 'Hyderabad',
        headquarters_state: 'Telangana',
        employee_count: 65,
        website: 'https://cropyield.example.com',
        current_stage: 6,
        stage: 'Growth',
        revenue_current: 90000000,
        revenue_growth_rate: 75,
    },
    {
        id: 'comp-022',
        name: 'SoilSens Tech',
        sector: 'agritech',
        sub_sector: 'IoT Sensors',
        founded_year: 2020,
        headquarters_city: 'Pune',
        headquarters_state: 'Maharashtra',
        employee_count: 45,
        website: 'https://soilsens.example.com',
        current_stage: 5,
        stage: 'Early Growth',
        revenue_current: 60000000,
        revenue_growth_rate: 120,
    },
    {
        id: 'comp-023',
        name: 'AgriDrone Solutions',
        sector: 'agritech',
        sub_sector: 'Drones',
        founded_year: 2018,
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',
        employee_count: 85,
        website: 'https://agridrone.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 140000000,
        revenue_growth_rate: 50,
    },
    {
        id: 'comp-024',
        name: 'FreshDirect Supply',
        sector: 'agritech',
        sub_sector: 'Supply Chain',
        founded_year: 2017,
        headquarters_city: 'Mumbai',
        headquarters_state: 'Maharashtra',
        employee_count: 150,
        website: 'https://freshdirect.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 350000000,
        revenue_growth_rate: 30,
    },
    {
        id: 'comp-025',
        name: 'HydroGrowth Systems',
        sector: 'agritech',
        sub_sector: 'Hydroponics',
        founded_year: 2021,
        headquarters_city: 'Chennai',
        headquarters_state: 'Tamil Nadu',
        employee_count: 35,
        website: 'https://hydrogrowth.example.com',
        current_stage: 4,
        stage: 'Seed',
        revenue_current: 25000000,
        revenue_growth_rate: 200,
    },
    {
        id: 'comp-026',
        name: 'AgriTrace Blockchain',
        sector: 'agritech',
        sub_sector: 'Traceability',
        founded_year: 2019,
        headquarters_city: 'Nashik',
        headquarters_state: 'Maharashtra',
        employee_count: 55,
        website: 'https://agritrace.example.com',
        current_stage: 6,
        stage: 'Growth',
        revenue_current: 75000000,
        revenue_growth_rate: 60,
    },
    {
        id: 'comp-027',
        name: 'DairyTech Pro',
        sector: 'agritech',
        sub_sector: 'Dairy Tech',
        founded_year: 2018,
        headquarters_city: 'Anand',
        headquarters_state: 'Gujarat',
        employee_count: 110,
        website: 'https://dairytech.example.com',
        current_stage: 6,
        stage: 'Expansion',
        revenue_current: 220000000,
        revenue_growth_rate: 25,
    },
    {
        id: 'comp-028',
        name: 'VertiFarm India',
        sector: 'agritech',
        sub_sector: 'Vertical Farming',
        founded_year: 2020,
        headquarters_city: 'Noida',
        headquarters_state: 'Uttar Pradesh',
        employee_count: 75,
        website: 'https://vertifarm.example.com',
        current_stage: 5,
        stage: 'Early Growth',
        revenue_current: 110000000,
        revenue_growth_rate: 80,
    },
    {
        id: 'comp-029',
        name: 'BioSeed Innovations',
        sector: 'agritech',
        sub_sector: 'Biotechnology',
        founded_year: 2016,
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        employee_count: 130,
        website: 'https://bioseed.example.com',
        current_stage: 6,
        stage: 'Mature',
        revenue_current: 280000000,
        revenue_growth_rate: 15,
    },
    {
        id: 'comp-030',
        name: 'AquaCulture Hub',
        sector: 'agritech',
        sub_sector: 'Aquaculture',
        founded_year: 2021,
        headquarters_city: 'Visakhapatnam',
        headquarters_state: 'Andhra Pradesh',
        employee_count: 40,
        website: 'https://aquaculture.example.com',
        current_stage: 4,
        stage: 'Seed',
        revenue_current: 30000000,
        revenue_growth_rate: 160,
    }
];

function mapToCompany(raw: RawCompany): Company {
    return {
        id: raw.id,
        name: raw.name,
        sector: raw.sector as CompanySector,
        sub_sector: raw.sub_sector,
        stage: (raw.stage?.toLowerCase() || 'seed') as CompanyStage,
        founded_year: raw.founded_year,
        headquarters_city: raw.headquarters_city,
        headquarters_state: raw.headquarters_state,
        website: raw.website,
        employee_count: raw.employee_count,
        revenue_current: raw.revenue_current,
        revenue_growth_rate: raw.revenue_growth_rate,
        current_stage: raw.current_stage,
        rag_status: raw.rag_status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
}

export const DEMO_COMPANIES: Company[] = RAW_DATA.map(mapToCompany);

// Convert NEW_COMPANIES to basic Company type for listing/filtering
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

export function getCompaniesBySector(sector: string): Company[] {
    return DEMO_COMPANIES.filter(c => c.sector === sector);
}

export const ALL_COMPANIES_FOR_FILTERS = [...NEW_COMPANIES_BASIC, ...DEMO_COMPANIES];

export function getCompaniesByFilter(filters: { sector?: string; stage?: number | string; region?: string; search?: string } = {}): Company[] {
    let filtered = ALL_COMPANIES_FOR_FILTERS;

    if (filters.sector && filters.sector !== 'all' && filters.sector !== 'undefined') {
        filtered = filtered.filter(c => c.sector === filters.sector);
    }

    if (filters.stage && filters.stage !== 'all' && filters.stage !== 'undefined') {
        if (typeof filters.stage === 'string') {
            const stageStr = filters.stage.toLowerCase();
            filtered = filtered.filter(c => c.stage === stageStr);
        }
    }

    if (filters.region && filters.region !== 'all' && filters.region !== 'undefined') {
        filtered = filtered.filter(c => c.headquarters_state === filters.region);
    }

    if (filters.search) {
        const lowerSearch = filters.search.toLowerCase();
        filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(lowerSearch) ||
            c.sub_sector.toLowerCase().includes(lowerSearch) ||
            c.headquarters_city.toLowerCase().includes(lowerSearch)
        );
    }

    return filtered;
}

export function getCompanyById(id: string): Company | undefined {
    if (!id) return undefined;
    
    // Translate ID if needed (e.g. if we get a UUID but have a Demo ID, or vice versa)
    const demoId = getDemoID(id);
    const uuid = getUUID(id);

    // Check new detailed companies first
    const newCompany = NEW_COMPANIES_BASIC.find(c => c.id === demoId || c.id === uuid || c.id === id);
    if (newCompany) return newCompany;

    return DEMO_COMPANIES.find(c => c.id === demoId || c.id === uuid || c.id === id);
}

export function getCompaniesByStage(stage: number): Company[] {
    return DEMO_COMPANIES.filter(c => (c.current_stage || 0) >= stage);
}
