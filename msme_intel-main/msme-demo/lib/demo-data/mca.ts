
import { CompanyMCA } from '@/lib/types/company';

export const DEMO_MCA: Record<string, CompanyMCA> = {
    'comp-001': {
        company_id: 'comp-001',
        cin: 'U72900KA2018PTC123456',
        roc: 'ROC-Bangalore',
        registration_date: '2018-06-15',
        category: 'Company limited by Shares',
        sub_category: 'Non-govt company',
        class: 'Private',
        authorized_capital: 20000000,
        paid_up_capital: 15000000,
        last_agm_date: '2023-09-30',
        balance_sheet_date: '2023-03-31',
        directors: ['Rahul Sharma', 'Priya Patel']
    },
    'comp-002': {
        company_id: 'comp-002',
        cin: 'U29300MH2016PLC654321',
        roc: 'ROC-Pune',
        registration_date: '2016-04-22',
        category: 'Company limited by Shares',
        sub_category: 'Non-govt company',
        class: 'Public',
        authorized_capital: 50000000,
        paid_up_capital: 45000000,
        last_agm_date: '2023-09-28',
        balance_sheet_date: '2023-03-31',
        directors: ['Amit Kumar', 'Sneha Gupta', 'Rajesh Verma']
    }
};

export function getDemoMCA(companyId: string): CompanyMCA {
    const data = DEMO_MCA[companyId];
    if (data) return data;

    // Generate random mock data for others
    const randomROC = ['ROC-Bangalore', 'ROC-Mumbai', 'ROC-Delhi', 'ROC-Hyderabad', 'ROC-Chennai'][Math.floor(Math.random() * 5)];
    const randomClass = Math.random() > 0.8 ? 'Public' : 'Private';

    return {
        company_id: companyId,
        cin: 'U' + Math.floor(10000 + Math.random() * 90000) + 'KA' + (2010 + Math.floor(Math.random() * 14)) + (randomClass === 'Private' ? 'PTC' : 'PLC') + Math.floor(100000 + Math.random() * 900000),
        roc: randomROC,
        registration_date: '20' + (15 + Math.floor(Math.random() * 9)) + '-' + ('0' + Math.ceil(Math.random() * 12)).slice(-2) + '-' + ('0' + Math.ceil(Math.random() * 28)).slice(-2),
        category: 'Company limited by Shares',
        sub_category: 'Non-govt company',
        class: randomClass,
        authorized_capital: Math.floor(1000000 + Math.random() * 100000000),
        paid_up_capital: Math.floor(500000 + Math.random() * 50000000),
        last_agm_date: '2023-09-30',
        balance_sheet_date: '2023-03-31',
        directors: ['Director One', 'Director Two']
    };
}
