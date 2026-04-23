
export const DEMO_FINANCIALS = {
    'comp-001': {
        revenue_lakhs: 1500,
        net_profit_lakhs: 270,
        gross_profit_lakhs: 450,
        net_worth_lakhs: 850,
        ebitda_margin: 24,
        cagr_3yr: 35,
        fiscal_year: '2023-24',
        authorized_capital: 200,
        paid_up_capital: 150,
        status: 'active',
        cin: 'U72900KA2018PTC123456',
        gstin: '29ABCDE1234F1Z5',
        pan: 'ABCDE1234F',
        history: [
            { year: '2022', revenue: 110000000, profit: 18000000 },
            { year: '2023', revenue: 135000000, profit: 22000000 },
            { year: '2024', revenue: 150000000, profit: 27000000 },
        ]
    },
    'comp-002': {
        revenue_lakhs: 2200,
        net_profit_lakhs: 396,
        gross_profit_lakhs: 660,
        net_worth_lakhs: 1200,
        ebitda_margin: 22,
        cagr_3yr: 28,
        fiscal_year: '2023-24',
        authorized_capital: 500,
        paid_up_capital: 450,
        status: 'active',
        cin: 'U29300MH2016PLC654321',
        gstin: '27FGHIJ5678K1Z9',
        pan: 'FGHIJ5678K',
        history: [
            { year: '2022', revenue: 160000000, profit: 28000000 },
            { year: '2023', revenue: 190000000, profit: 34000000 },
            { year: '2024', revenue: 220000000, profit: 39600000 },
        ]
    },
    'comp-011': {
        revenue_lakhs: 1800,
        net_profit_lakhs: -150, // Loss making growth co
        gross_profit_lakhs: 900,
        net_worth_lakhs: 400,
        ebitda_margin: -8,
        cagr_3yr: 45,
        fiscal_year: '2023-24',
        authorized_capital: 100,
        paid_up_capital: 80,
        status: 'active',
        cin: 'U65999MH2019PTC987654',
        gstin: '27KLMNO9012P1Z3',
        pan: 'KLMNO9012P',
        history: [
            { year: '2022', revenue: 80000000, profit: -30000000 },
            { year: '2023', revenue: 120000000, profit: -20000000 },
            { year: '2024', revenue: 180000000, profit: -15000000 },
        ]
    },
};

export function getDemoFinancials(companyId: string) {
    const data = DEMO_FINANCIALS[companyId as keyof typeof DEMO_FINANCIALS];
    if (data) return data;

    // Return specific or generated
    return {
        revenue_lakhs: Math.floor(500 + Math.random() * 2000),
        net_profit_lakhs: Math.floor(50 + Math.random() * 400),
        gross_profit_lakhs: Math.floor(150 + Math.random() * 600),
        net_worth_lakhs: Math.floor(200 + Math.random() * 1000),
        ebitda_margin: Math.floor(10 + Math.random() * 20),
        cagr_3yr: Math.floor(10 + Math.random() * 30),
        fiscal_year: '2023-24',
        authorized_capital: 100,
        paid_up_capital: 100,
        status: 'active',
        cin: 'U' + Math.floor(Math.random() * 99999) + 'MH2020PTC' + Math.floor(Math.random() * 999999),
        gstin: '27ABCDE' + Math.floor(1000 + Math.random() * 9000) + 'A1Z5',
        pan: 'ABCDE' + Math.floor(1000 + Math.random() * 9000) + 'A',
        history: [
            { year: '2022', revenue: 100000000, profit: 10000000 },
            { year: '2023', revenue: 120000000, profit: 12000000 },
            { year: '2024', revenue: 140000000, profit: 15000000 },
        ]
    };
}
