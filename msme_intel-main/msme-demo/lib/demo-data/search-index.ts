
export const SEARCH_INDEX = {
    'market size electronics manufacturing': {
        answer: 'The Indian electronics manufacturing market is valued at ₹7.5 lakh crores (2024) and growing at 15% CAGR. Key segments include consumer electronics (40%), auto electronics (25%), industrial (20%), and defense (15%). MSMEs have significant opportunities in components, sub-assemblies, and niche products.',
        sources: ['IBEF Advanced Manufacturing Report 2024', 'NITI Aayog Strategy'],
    },
    'pli scheme electronics': {
        answer: 'The PLI scheme for electronics offers incentives of 4-6% on incremental sales. Eligible companies must have minimum investment of ₹50 Cr and meet domestic value addition norms. Application window opens quarterly. Key benefits include reduced tax burden and import duty concessions.',
        sources: ['Invest India PLI Portal', 'Ministry of Electronics & IT'],
    },
    'how to diversify clients manufacturing': {
        answer: 'Client diversification strategies: 1) Attend 3-4 industry trade shows annually, 2) Implement CRM for lead tracking, 3) Develop case studies from existing clients, 4) Leverage LinkedIn for B2B outreach, 5) Partner with industry associations, 6) Consider exports to reduce domestic concentration.',
        sources: ['Gap Analysis Best Practices', 'McKinsey MSME Scaling Report'],
    },
    'india logistics cost gdp': {
        answer: "India's logistics costs have been revised to 7.97% of GDP (approx. ₹24 lakh crore) as of September 2025 by NCAER/DPIIT. This brings India's efficiency essentially at par with developed-world benchmarks, down from previous estimates of 13-14%.",
        sources: ['NCAER/DPIIT Study 2025', 'National Logistics Policy'],
    },
    'cold chain market size india': {
        answer: 'The Indian cold chain logistics market is valued at approximately USD 23.3 billion (₹1.9 lakh crore) and is the fastest-growing logistics segment at 16% CAGR. It is critical for pharma exports and reducing post-harvest agricultural losses.',
        sources: ['IBEF Logistics Report 2024', 'IMARC Group Analysis'],
    },
    'sagarmala project status': {
        answer: 'The Sagarmala Programme has identified 839 projects worth ₹5.79 lakh crore. As of late 2024, 272 projects have been completed, focusing on port modernization, connectivity, and port-led industrialization.',
        sources: ['Ministry of Ports, Shipping and Waterways', 'PIB 2024'],
    },
};

export function searchKnowledgeBase(query: string): typeof SEARCH_INDEX[keyof typeof SEARCH_INDEX] | null {
    const lowercaseQuery = query.toLowerCase();

    // Simple keyword matching
    for (const [key, value] of Object.entries(SEARCH_INDEX)) {
        if (lowercaseQuery.includes(key) || key.includes(lowercaseQuery)) {
            return value;
        }
    }

    return null;
}
