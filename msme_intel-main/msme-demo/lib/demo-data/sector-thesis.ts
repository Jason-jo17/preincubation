
import { SectorThesis, Citation } from '@/lib/types/sector-thesis';

// ============================================================================
// CITATIONS (Mapped from SQL)
// ============================================================================
const CITATIONS: Record<string, Citation> = {
    // Aerospace Citations (Existing)
    'c1': { id: 'c1', citation_key: 'MMI_2024_aerospace_trajectory', citation_number: 1, source_type: 'industry', source_name: 'Modern Manufacturing India', publication_year: 2024, title: 'Indian Aerospace Industry: On a High Growth Trajectory', url: 'https://www.mmindia.co.in/article/93/indian-aerospace-industry-on-a-high-growth-trajectory', reliability_score: 8, tags: ['aerospace', 'market_size', 'growth'], geographic_focus: ['India'], excerpt: 'India aerospace market projected to reach USD 70 billion by 2030' },
    'c2': { id: 'c2', citation_key: 'CMI_2024_aerospace_defence', citation_number: 2, source_type: 'report', source_name: 'Custom Market Insights', publication_year: 2024, title: 'India Aerospace and Defence Market Size, Trends, Share 2033', url: 'https://www.custommarketinsights.com/report/india-aerospace-and-defence-market/', reliability_score: 8, tags: ['aerospace', 'defense', 'market_size'], geographic_focus: ['India'], excerpt: 'Current market size USD 27-29 billion in 2024' },
    'c3': { id: 'c3', citation_key: 'WTE_2024_aerospace_exports', citation_number: 3, source_type: 'industry', source_name: "World's Top Exports", publication_year: 2024, title: 'Aerospace Exports by Country 2024', url: 'https://www.worldstopexports.com/aerospace-exports-by-country/', reliability_score: 7, tags: ['aerospace', 'exports', 'trade'], geographic_focus: ['India', 'Global'], excerpt: 'India achieved fastest aerospace export growth +284.5% in 2024' },
    'c4': { id: 'c4', citation_key: 'VisionIAS_2025_defence_exports', citation_number: 4, source_type: 'academic', source_name: 'Vision IAS', publication_year: 2025, title: "India's Defence Exports", url: 'https://visionias.in/current-affairs/monthly-magazine/2025-05-17/security/indias-defence-exports-1', reliability_score: 8, tags: ['defense', 'production', 'exports'], geographic_focus: ['India'], excerpt: 'Defense production reached ₹1,50,590 crore (USD 17.57 billion) in FY25' },
    'c5': { id: 'c5', citation_key: 'IMARC_2024_india_aviation', citation_number: 5, source_type: 'report', source_name: 'IMARC Group', publication_year: 2024, title: 'India Aviation Market Size, Share, Growth and Outlook, 2033', url: 'https://www.imarcgroup.com/india-aviation-market', reliability_score: 9, tags: ['aviation', 'market_size', 'forecast'], geographic_focus: ['India'], excerpt: "India is the world's tenth-largest civil aviation market and third-largest domestic aviation market" },
    'c6': { id: 'c6', citation_key: 'PIB_2025_defence_exports_surge', citation_number: 6, source_type: 'government', source_name: 'Press Information Bureau', publication_year: 2025, title: 'Defence exports surge to a record high of Rs 23,622 crore', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2117348', reliability_score: 10, tags: ['defense', 'exports', 'government'], geographic_focus: ['India'], excerpt: 'Defence exports target: ₹50,000 crore (USD 6 billion) by FY29' },
    'c7': { id: 'c7', citation_key: 'Mordor_2024_india_aviation', citation_number: 7, source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2024, title: 'India Aviation Market Size, Share 2030 Report', url: 'https://www.mordorintelligence.com/industry-reports/analysis-of-aviation-industry-in-india', reliability_score: 8, tags: ['aviation', 'forecast', 'cagr'], geographic_focus: ['India'], excerpt: '12.03% CAGR for aviation through 2030' },
    'c8': { id: 'c8', citation_key: 'NOA_2024_aviation_rank', citation_number: 8, source_type: 'government', source_name: 'News on Air', publication_year: 2024, title: "India Emerges as World's 5th Biggest Aviation Market in 2024", url: 'https://www.newsonair.gov.in/india-emerges-as-worlds-5th-biggest-aviation-market-in-2024/', reliability_score: 9, tags: ['aviation', 'fleet', 'ranking'], geographic_focus: ['India'], excerpt: 'India operates 713 aircraft currently, projected to reach 1,522 by 2031' },
    'c9': { id: 'c9', citation_key: 'Secretariat_2024_aerospace_rise', citation_number: 9, source_type: 'news', source_name: 'The Secretariat News', publication_year: 2024, title: 'Indian Aerospace Manufacturing On The Rise', url: 'https://thesecretariat.in/article/indian-aerospace-manufacturing-on-the-rise', reliability_score: 7, tags: ['aerospace', 'manufacturing', 'orders'], geographic_focus: ['India'], excerpt: 'India holds orders for 970+ aircraft from Boeing and Airbus' },
    'c10': { id: 'c10', citation_key: 'Gymkhana_2025_defence_inflection', citation_number: 10, source_type: 'industry', source_name: 'Gymkhana Partners', publication_year: 2025, title: 'Major sector inflection: India defense and aerospace', url: 'https://www.gymkhanapartners.com/dispatches/major-sector-inflection-india-defense-and-aerospace', reliability_score: 8, tags: ['defense', 'indigenous', 'manufacturing'], geographic_focus: ['India'], excerpt: 'Indigenous defense production now constitutes 61.1% of the market' },
    'c11': { id: 'c11', citation_key: 'IBEF_2024_mro_trends', citation_number: 11, source_type: 'government', source_name: 'IBEF', publication_year: 2024, title: "India's MRO Industry: Future Trends & Growth Opportunities", url: 'https://www.ibef.org/blogs/the-future-of-the-mro-industry-in-india-trends-and-opportunities', reliability_score: 9, tags: ['mro', 'market_size', 'policy'], geographic_focus: ['India'], excerpt: 'MRO sector USD 2.3-3.8B, 90% outsourced, GST reduced to 5%' },
    'c12': { id: 'c12', citation_key: 'GVR_2024_aerospace_parts', citation_number: 12, source_type: 'report', source_name: 'Grand View Research', publication_year: 2024, title: 'India Aerospace Parts Manufacturing Market To Reach $21.48Bn', url: 'https://www.grandviewresearch.com/press-release/india-aerospace-parts-manufacturing-market-analysis', reliability_score: 9, tags: ['aerospace', 'manufacturing', 'supply_chain'], geographic_focus: ['India'], excerpt: 'Aerospace manufacturing USD 13.6B in 2023, projected USD 21.48B by 2030' },
    'c13': { id: 'c13', citation_key: 'FlightGlobal_2024_india_china', citation_number: 13, source_type: 'industry', source_name: 'Flight Global', publication_year: 2024, title: "India to eclipse China as aerospace's next frontier", url: 'https://www.flightglobal.com/aerospace/india-to-eclipse-china-as-aerospaces-next-frontier/152186.article', reliability_score: 9, tags: ['aerospace', 'competitiveness', 'cost'], geographic_focus: ['India', 'Global'], excerpt: 'Hyderabad ranks #1 globally for aerospace cost-effectiveness' },
    'c14': { id: 'c14', citation_key: 'Mordor_2024_aviation_defence_space', citation_number: 14, source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2024, title: 'India Aviation, Defense, And Space Market Size & Share Analysis', url: 'https://www.mordorintelligence.com/industry-reports/india-aviation-defense-and-space-market', reliability_score: 8, tags: ['space', 'market_size', 'startups'], geographic_focus: ['India'], excerpt: 'Space sector USD 8.4-9B in 2024, targeting USD 44B by 2033; 400+ private space enterprises' },
    'c15': { id: 'c15', citation_key: 'ITA_2024_india_aerospace_defence', citation_number: 15, source_type: 'government', source_name: 'International Trade Administration', publication_year: 2024, title: 'India - Aerospace and Defense', url: 'https://www.trade.gov/country-commercial-guides/india-aerospace-and-defense', reliability_score: 10, tags: ['aerospace', 'cost_competitiveness', 'supply_chain'], geographic_focus: ['India'], excerpt: 'Cost advantages of 15-25% in manufacturing with additional 10-20% savings through local sourcing' },
    'c16': { id: 'c16', citation_key: 'IBEF_2024_defence_manufacturing', citation_number: 16, source_type: 'government', source_name: 'IBEF', publication_year: 2024, title: "India's Defence Manufacturing Industry Revolutionizing Exports", url: 'https://www.ibef.org/industry/defence-manufacturing', reliability_score: 9, tags: ['defense', 'industrial_policy', 'infrastructure'], geographic_focus: ['India'], excerpt: 'Defense Industrial Corridors: ₹8,658 crore investments, 253 MoUs' },
    'c17': { id: 'c17', citation_key: 'InvestIndia_2024_civil_aviation', citation_number: 17, source_type: 'government', source_name: 'Invest India', publication_year: 2024, title: 'Investment Opportunities in Civil Aviation', url: 'https://www.investindia.gov.in/sector/civil-aviation', reliability_score: 9, tags: ['aviation', 'policy', 'infrastructure'], geographic_focus: ['India'], excerpt: 'UDAN regional connectivity targets 120 new destinations' },
    'c18': { id: 'c18', citation_key: 'IMARC_2024_aircraft_components', citation_number: 18, source_type: 'report', source_name: 'IMARC Group', publication_year: 2024, title: 'India Aircraft Components Market Size, Share', url: 'https://www.imarcgroup.com/india-aircraft-components-market', reliability_score: 8, tags: ['aerospace', 'components', 'supply_chain'], geographic_focus: ['India'], excerpt: 'Aircraft components market USD 16.22B in 2024' },
    'c19': { id: 'c19', citation_key: 'AviationA2Z_2025_global_hub', citation_number: 19, source_type: 'industry', source_name: 'Aviation A2Z', publication_year: 2025, title: 'India is Becoming a Global Aerospace Hub', url: 'https://aviationa2z.com/index.php/2025/10/23/india-is-becoming-a-global-aerospace-hub/', reliability_score: 7, tags: ['aerospace', 'supply_chain', 'global'], geographic_focus: ['India', 'Global'], excerpt: 'India targeting 10% of global aerospace supply chain by 2033' },
    'c20': { id: 'c20', citation_key: 'BizStd_2025_supply_chain_crisis', citation_number: 20, source_type: 'news', source_name: 'Business Standard', publication_year: 2025, title: 'Global aerospace firms turn to India amid Western supply chain crisis', url: 'https://www.business-standard.com/external-affairs-defence-security/news/global-aerospace-firms-turn-to-india-amid-western-supply-chain-crisis-125021700469_1.html', reliability_score: 8, tags: ['aerospace', 'oem_sourcing', 'supply_chain'], geographic_focus: ['India', 'Global'], excerpt: 'Boeing sources over $1B annually, Airbus targets $2B by 2030' },
    'c21': { id: 'c21', citation_key: 'IMARC_2024_aerospace_composites', citation_number: 21, source_type: 'report', source_name: 'IMARC Group', publication_year: 2024, title: 'India Aerospace Composites Market Size, Share | 2033', url: 'https://www.imarcgroup.com/india-aerospace-composites-market', reliability_score: 8, tags: ['aerospace', 'composites', 'materials'], geographic_focus: ['India'], excerpt: 'Aerospace composites $330.2M in 2024, projected $690.6M by 2033' },
    'c22': { id: 'c22', citation_key: 'Brigade_2024_devanahalli_hub', citation_number: 22, source_type: 'industry', source_name: 'Brigade Group', publication_year: 2024, title: 'How Devanahalli is emerging as a major commercial hub', url: 'https://www.brigadegroup.com/blog/general/how-devanahalli-is-emerging-as-a-major-commercial-hub-of-bengaluru', reliability_score: 7, tags: ['aerospace', 'infrastructure', 'regional'], geographic_focus: ['India', 'Karnataka'], excerpt: 'Karnataka: 25% of aircraft/spacecraft industry, 65% aerospace exports' },

    // AI Citations (New)
    'ai1': { id: 'ai1', citation_key: 'BizStd_2024_ai_17bn', citation_number: 1, source_type: 'news', source_name: 'Business Standard', publication_year: 2024, title: 'AI market in India to touch $17 billion by 2027: Nasscom-BCG report', url: 'https://www.business-standard.com/industry/news/ai-market-in-india-to-touch-17-billion-by-2027-nasscom-bcg-report-124022000743_1.html', reliability_score: 8, tags: ['ai', 'market_size', 'forecast'], geographic_focus: ['India'], excerpt: 'AI market projected to reach $17 billion by 2027' },
    'ai2': { id: 'ai2', citation_key: 'IBEF_2024_ai_triple', citation_number: 2, source_type: 'government', source_name: 'IBEF', publication_year: 2024, title: "India's AI market set to triple, may cross Rs 1,45,384 crore by 2027", url: 'https://www.ibef.org/news/india-s-artificial-intelligence-ai-market-set-to-triple-may-cross-rs-1-45-384-crore-us-17-billion-by-2027-report', reliability_score: 9, tags: ['ai', 'growth', 'market_size'], geographic_focus: ['India'], excerpt: 'AI market to triple reaching ₹1,45,384 crore (USD 17B) by 2027' },
    'ai3': { id: 'ai3', citation_key: 'FBI_2024_ai_india', citation_number: 3, source_type: 'report', source_name: 'Fortune Business Insights', publication_year: 2024, title: 'India Artificial Intelligence Market Size, Share | Growth [2032]', url: 'https://www.fortunebusinessinsights.com/india-artificial-intelligence-market-113969', reliability_score: 8, tags: ['ai', 'market_size', 'cagr', 'forecast'], geographic_focus: ['India'], excerpt: 'AI market $9.51B in 2024, $130.63B by 2032 at 39% CAGR' },
    'ai4': { id: 'ai4', citation_key: 'PIB_2025_ai_revolution', citation_number: 4, source_type: 'government', source_name: 'Press Information Bureau', publication_year: 2025, title: "India's AI Revolution", url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2108810', reliability_score: 10, tags: ['ai', 'policy', 'indiaai_mission', 'gpus'], geographic_focus: ['India'], excerpt: 'IndiaAI Mission ₹10,372 crore, 38,000 GPUs secured (3x target)' },
    'ai5': { id: 'ai5', citation_key: 'IBEF_2024_ai_labour', citation_number: 5, source_type: 'government', source_name: 'IBEF', publication_year: 2024, title: "AI & Labour Transformation: India's Path to Inclusive Growth", url: 'https://www.ibef.org/blogs/ai-enabled-labour-transformation-harnessing-technology-for-inclusive-growth', reliability_score: 9, tags: ['ai', 'gdp_impact', 'employment', 'productivity'], geographic_focus: ['India'], excerpt: 'AI could add $450-500B to GDP by 2025-30; 70% employees use AI at work' },
    'ai6': { id: 'ai6', citation_key: 'NASSCOM_2024_data_ai', citation_number: 6, source_type: 'industry', source_name: 'NASSCOM', publication_year: 2024, title: 'Unlocking Value from Data and AI - The India Opportunity', url: 'https://nasscom.in/knowledge-center/publications/unlocking-value-data-and-ai-india-opportunity', reliability_score: 9, tags: ['ai', 'gdp_impact', 'data', 'opportunity'], geographic_focus: ['India'], excerpt: 'AI could add $967B to GDP by 2035' },
    'ai7': { id: 'ai7', citation_key: 'IndiaAI_2024_talent_support', citation_number: 7, source_type: 'government', source_name: 'IndiaAI', publication_year: 2024, title: "Huge talent base and strong Govt. support to take India's AI spending to $5 Bn by 2027", url: 'https://indiaai.gov.in/news/huge-talent-base-and-strong-govt-support-to-take-india-s-ai-spending-to-5-bn-by-2027', reliability_score: 9, tags: ['ai', 'sectoral_adoption', 'spending', 'talent'], geographic_focus: ['India'], excerpt: 'BFSI leads AI spending at 30.7%, manufacturing 24.6%, healthcare 15.9%' },
    'ai8': { id: 'ai8', citation_key: 'Globe_2024_80pct_adoption', citation_number: 8, source_type: 'news', source_name: 'The Globe and Mail', publication_year: 2024, title: '80% of Indian Enterprises Embrace AI, Surpassing U.S. and Global Adoption', url: 'https://www.theglobeandmail.com/investing/markets/markets-news/GetNews/36087934/', reliability_score: 7, tags: ['ai', 'enterprise_adoption', 'comparison'], geographic_focus: ['India', 'US', 'Global'], excerpt: '80% Indian enterprises prioritize AI strategically vs 59% US average' },
    'ai9': { id: 'ai9', citation_key: 'MRF_2024_ai_india', citation_number: 9, source_type: 'report', source_name: 'Market Research Future', publication_year: 2024, title: 'India Artificial Intelligence Market Size, Global Report - 2035', url: 'https://www.marketresearchfuture.com/reports/india-artificial-intelligence-market-21411', reliability_score: 8, tags: ['ai', 'market_size', 'long_term_forecast'], geographic_focus: ['India'], excerpt: 'AI market $7.63-11.17B in 2024-25, 30.11-42.2% CAGR to 2035' },
    'ai10': { id: 'ai10', citation_key: 'GVR_2024_ai_india', citation_number: 10, source_type: 'report', source_name: 'Grand View Research', publication_year: 2024, title: 'India Artificial Intelligence Market Size & Outlook, 2033', url: 'https://www.grandviewresearch.com/horizon/outlook/artificial-intelligence-market/india', reliability_score: 9, tags: ['ai', 'genai', 'machine_learning', 'segments'], geographic_focus: ['India'], excerpt: 'GenAI 34-42% CAGR, ML platforms 35-50% CAGR' },
    'ai11': { id: 'ai11', citation_key: 'IMARC_2024_healthcare_ai', citation_number: 11, source_type: 'report', source_name: 'IMARC Group', publication_year: 2024, title: 'India AI in Healthcare Market', url: 'https://www.imarcgroup.com/', reliability_score: 8, tags: ['ai', 'healthcare', 'sectoral'], geographic_focus: ['India'], excerpt: 'Healthcare AI: 40-48% CAGR, $374.7M in 2023 to $6.9B by 2032' },
    'ai12': { id: 'ai12', citation_key: 'Mordor_2024_datacenter', citation_number: 12, source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2024, title: 'India Data Center Market Analysis | Industry Growth, Size & Forecast Report 2030', url: 'https://www.mordorintelligence.com/industry-reports/india-data-center-market', reliability_score: 8, tags: ['ai', 'infrastructure', 'data_centers'], geographic_focus: ['India'], excerpt: 'AI infrastructure growing at 21% CAGR, 45 new data centers adding 1,015 MW' },
    'ai13': { id: 'ai13', citation_key: 'GMI_2024_ai_india', citation_number: 13, source_type: 'report', source_name: 'GMI Research', publication_year: 2024, title: 'India AI Market Size, Share, Trends, Forecast 2032', url: 'https://www.gmiresearch.com/report/india-ai-market/', reliability_score: 8, tags: ['ai', 'technology_segments', 'ml', 'nlp'], geographic_focus: ['India'], excerpt: 'Machine Learning 45.8% market share, NLP fastest-growing' },
    'ai14': { id: 'ai14', citation_key: 'Bajaj_2024_ai_story', citation_number: 14, source_type: 'industry', source_name: 'Bajaj Finance', publication_year: 2024, title: "India's AI Revolution l Driving Inclusive Growth and Global Leadership", url: 'https://www.aboutbajajfinserv.com/ticc/indian-ai-story', reliability_score: 7, tags: ['ai', 'gdp_impact', 'economic_impact'], geographic_focus: ['India'], excerpt: 'EY: $359-438B GDP addition by 2029-30 through AI adoption' },
    'ai15': { id: 'ai15', citation_key: 'TradeBrains_2025_sectors', citation_number: 15, source_type: 'news', source_name: 'Trade Brains', publication_year: 2025, title: 'Top 7 Sectors in India That Will Benefit the Most from AI Adoption: 2025 to 2030', url: 'https://tradebrains.in/money/top-7-sectors-in-india-that-will-benefit-the-most-from-ai-adoption-an-outlook-from-2025-to-2030/', reliability_score: 7, tags: ['ai', 'sectoral_adoption', 'bfsi', 'manufacturing'], geographic_focus: ['India'], excerpt: 'BFSI: 90% banks increased AI budgets, 65% fraud detection; Mfg: 39% enterprise AI' },
    'ai16': { id: 'ai16', citation_key: 'IMARC_2024_agri_ai', citation_number: 16, source_type: 'report', source_name: 'IMARC Group', publication_year: 2024, title: 'India AI in Agriculture Market Size, Share & Forecast 2033', url: 'https://www.imarcgroup.com/india-ai-in-agriculture-market', reliability_score: 8, tags: ['ai', 'agriculture', 'sectoral'], geographic_focus: ['India'], excerpt: 'Agriculture AI $70M in 2024, 19.5% CAGR' },
    'ai17': { id: 'ai17', citation_key: 'IMARC_2024_edtech_ai', citation_number: 17, source_type: 'report', source_name: 'IMARC Group', publication_year: 2024, title: 'How AI is Revolutionizing EdTech Landscape in India', url: 'https://www.imarcgroup.com/insight/ai-revolutionizing-edtech-landscape-in-india', reliability_score: 8, tags: ['ai', 'edtech', 'education'], geographic_focus: ['India'], excerpt: 'EdTech AI $2.8B market at 28.7% CAGR' },
    'ai18': { id: 'ai18', citation_key: 'Nextmsc_2024_auto_ai', citation_number: 18, source_type: 'report', source_name: 'Nextmsc', publication_year: 2024, title: 'India Automotive AI Market Size and Share | Statistics - 2030', url: 'https://www.nextmsc.com/report/india-automotive-ai-market', reliability_score: 7, tags: ['ai', 'automotive', 'adas'], geographic_focus: ['India'], excerpt: 'Automotive AI $158.8M in 2023, 32.5% CAGR driven by ADAS' },
    'ai19': { id: 'ai19', citation_key: 'Mordor_2024_ai_global', citation_number: 19, source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2024, title: 'Artificial Intelligence Market Size, Trends, Share & Growth Drivers 2031', url: 'https://www.mordorintelligence.com/industry-reports/global-artificial-intelligence-market', reliability_score: 8, tags: ['ai', 'global_ranking', 'talent', 'vibrancy'], geographic_focus: ['India', 'Global'], excerpt: 'India 3rd in AI Vibrancy Index (21.59), 16% global AI talent' },
    'ai20': { id: 'ai20', citation_key: 'IndexBox_2025_startup_funding', citation_number: 20, source_type: 'data_aggregator', source_name: 'IndexBox', publication_year: 2025, title: 'India Startup Funding 2025: Early-Stage Grows, AI Contrasts U.S.', url: 'https://www.indexbox.io/blog/india-startup-funding-2025-105b-raised-early-stage-resilient-ai-lags-behind-us/', reliability_score: 7, tags: ['ai', 'funding', 'startups', 'cost_advantage'], geographic_focus: ['India', 'US'], excerpt: 'AI startup funding $643M in 2025 vs US $121B; India cost: GPU ₹65-100/hr' },
    'ai21': { id: 'ai21', citation_key: 'Deloitte_2024_ai_talent', citation_number: 21, source_type: 'report', source_name: 'Deloitte', publication_year: 2024, title: "Bridging the AI talent gap to boost India's tech and economic impact", url: 'https://www.deloitte.com/in/en/about/press-room/bridging-the-ai-talent-gap-to-boost-indias-tech-and-economic-impact-deloitte-nasscom-report.html', reliability_score: 9, tags: ['ai', 'talent', 'skills', 'brain_drain'], geographic_focus: ['India'], excerpt: '600K+ AI professionals, need 1.25M by 2027; 50% top talent works abroad' },
    'ai22': { id: 'ai22', citation_key: 'IBTimes_2024_hiring', citation_number: 22, source_type: 'news', source_name: 'IBTimes India', publication_year: 2024, title: 'Hiring surges across India as AI-linked jobs rise exponentially', url: 'https://www.ibtimes.co.in/hiring-surges-across-india-ai-linked-jobs-rise-exponentially-895942', reliability_score: 7, tags: ['ai', 'employment', 'hiring', 'sectoral'], geographic_focus: ['India'], excerpt: 'AI-linked hiring: +41% BFSI, +38% healthcare/pharma YoY' },
    'ai23': { id: 'ai23', citation_key: 'KPMG_2024_ai_study', citation_number: 23, source_type: 'report', source_name: 'KPMG', publication_year: 2024, title: 'From trust to training! 10 things KPMG AI study reveals about India', url: 'https://www.storyboard18.com/digital/from-trust-to-training-10-things-kpmg-ai-study-reveals-about-india-64693.htm', reliability_score: 8, tags: ['ai', 'adoption', 'trust', 'usage'], geographic_focus: ['India', 'Global'], excerpt: '97% Indian employees use AI intentionally; 76% trust AI vs 46% globally' },
    
    // Port & Logistics Citations
    'pl1': { id: 'pl1', citation_key: 'NCAER_2025_logistics_cost', citation_number: 1, source_type: 'government', source_name: 'NCAER/DPIIT', publication_year: 2025, title: 'Assessment of Logistics Cost in India', url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1986423', reliability_score: 10, tags: ['logistics', 'costs', 'gdp'], geographic_focus: ['India'], excerpt: "India's logistics costs pegged at 7.97% of GDP (₹24.01 lakh crore) in September 2025 study." },
    'pl2': { id: 'pl2', citation_key: 'Mordor_2025_logistics_size', citation_number: 2, source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2025, title: 'India Freight and Logistics Market Size & Share Analysis', url: 'https://www.mordorintelligence.com/industry-reports/india-freight-logistics-market-study', reliability_score: 8, tags: ['logistics', 'market_size', 'cagr'], geographic_focus: ['India'], excerpt: 'Market size estimated at USD 349.4 billion in 2025, projected to reach USD 545.6 billion by 2030.' },
    'pl3': { id: 'pl3', citation_key: 'Statista_2024_logistics_market', citation_number: 3, source_type: 'report', source_name: 'Statista / IBEF', publication_year: 2024, title: 'Logistics Market in India- Size and Share 2024', url: 'https://www.statista.com/statistics/1085600/india-logistics-market-size/', reliability_score: 9, tags: ['logistics', 'market_size'], geographic_focus: ['India'], excerpt: 'India logistics market reached USD 317 billion in 2024.' },
    'pl4': { id: 'pl4', citation_key: 'GVR_2024_logistics_share', citation_number: 4, source_type: 'report', source_name: 'Grand View Research', publication_year: 2024, title: 'India Logistics Market Size Share & Trends 2030', url: 'https://www.grandviewresearch.com/industry-analysis/india-logistics-market-report', reliability_score: 9, tags: ['logistics', 'market_size', 'global_share'], geographic_focus: ['India', 'Global'], excerpt: "India accounts for 5.8% of the global logistics market; market size $228.4B by narrow definition." },
    'pl5': { id: 'pl5', citation_key: 'IMARC_2025_maritime_freight', citation_number: 5, source_type: 'report', source_name: 'IMARC Group', publication_year: 2025, title: 'India Maritime Freight Market Size, Share 2033', url: 'https://www.imarcgroup.com/india-maritime-freight-market', reliability_score: 8, tags: ['ports', 'maritime', 'freight'], geographic_focus: ['India'], excerpt: 'Maritime freight market $34.9B in 2024, projected to grow at 3.8% CAGR.' },
    'pl6': { id: 'pl6', citation_key: 'EMR_2024_logistics_outlook', citation_number: 6, source_type: 'report', source_name: 'Expert Market Research', publication_year: 2024, title: 'India Logistics Market Outlook 2032', url: 'https://www.expertmarketresearch.com/reports/india-logistics-market', reliability_score: 8, tags: ['logistics', 'forecast', 'segments'], geographic_focus: ['India'], excerpt: 'Logistics market valued at USD 427.7 billion in 2024; CAGR 6.5-8.8%.' },
    'pl7': { id: 'pl7', citation_key: 'KF_2025_warehousing_leasing', citation_number: 7, source_type: 'report', source_name: 'Knight Frank', publication_year: 2025, title: 'India Warehousing Strategy Report 2025', url: 'https://www.knightfrank.co.in/research/india-warehousing-strategy-report-2025-11234.aspx', reliability_score: 9, tags: ['warehousing', 'leasing', 'infrastructure'], geographic_focus: ['India'], excerpt: 'Warehousing leasing activity hit 72.5 million sq ft in 2025, up 29% YoY.' },
    'pl8': { id: 'pl8', citation_key: 'WB_2023_lpi_india', citation_number: 8, source_type: 'government', source_name: 'World Bank', publication_year: 2023, title: 'Logistics Performance Index (LPI) 2023', url: 'https://lpi.worldbank.org/international/scorecard/rd/139/C/IND/2023', reliability_score: 10, tags: ['lpi', 'efficiency', 'ranking'], geographic_focus: ['India', 'Global'], excerpt: 'India ranked 38th out of 139 nations, score 3.4; turnaround time 0.9 days.' },
    'pl9': { id: 'pl9', citation_key: 'PIB_2024_sagarmala_progress', citation_number: 9, source_type: 'government', source_name: 'Press Information Bureau', publication_year: 2024, title: 'Sagarmala: Reshaping India\'s Maritime Landscape', url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2015562', reliability_score: 10, tags: ['sagarmala', 'ports', 'policy'], geographic_focus: ['India'], excerpt: '839 projects worth ₹5.79 lakh crore identified; 272 projects completed.' },
    'pl10': { id: 'pl10', citation_key: 'NITI_2024_gati_shakti', citation_number: 10, source_type: 'government', source_name: 'NITI Aayog', publication_year: 2024, title: 'PM Gati Shakti National Master Plan Progress', url: 'https://niti.gov.in/pm-gati-shakti-national-master-plan', reliability_score: 10, tags: ['infrastructure', 'policy', 'connectivity'], geographic_focus: ['India'], excerpt: 'Integrating 16 ministries on GIS platform with 1,400+ data layers.' },
    'pl11': { id: 'pl11', citation_key: 'DPIIT_2022_nlp', citation_number: 11, source_type: 'government', source_name: 'DPIIT', publication_year: 2022, title: 'National Logistics Policy (NLP) 2022', url: 'https://dpiit.gov.in/national-logistics-policy-2022', reliability_score: 10, tags: ['logistics', 'policy', 'framework'], geographic_focus: ['India'], excerpt: 'Targeting logistics cost reduction and top-25 LPI ranking.' },
    'pl12': { id: 'pl12', citation_key: 'MoPSW_2023_vision_2047', citation_number: 12, source_type: 'government', source_name: 'MoPSW', publication_year: 2023, title: 'Maritime Amrit Kaal Vision 2047', url: 'https://shipmin.gov.in/vision-2047', reliability_score: 10, tags: ['maritime', 'vision', 'long_term'], geographic_focus: ['India'], excerpt: 'Targeting 10,000 MMTPA handling capacity and ₹80 lakh crore investment.' },
    'pl13': { id: 'pl13', citation_key: 'IBEF_2024_logistics_organized', citation_number: 13, source_type: 'report', source_name: 'IBEF / Motilal Oswal', publication_year: 2024, title: 'India Logistics Industry Report 2024', url: 'https://www.ibef.org/industry/logistics-sector-india', reliability_score: 9, tags: ['logistics', 'organized', 'msme'], geographic_focus: ['India'], excerpt: 'Organized segment USD 107 billion (₹9 lakh crore) in FY23.' },
    'pl14': { id: 'pl14', citation_key: 'AA_2025_adani_ports', citation_number: 14, source_type: 'news', source_name: 'Asian Age', publication_year: 2025, title: 'Adani Ports handles record 450 MT in FY25', url: 'https://www.asianage.com/business/adani-ports-handles-record-cargo-fy25.html', reliability_score: 8, tags: ['ports', 'adani', 'cargo_volume'], geographic_focus: ['India'], excerpt: 'India\'s major ports earned ₹24,203 crore in FY25; Adani handled 450 MT cargo.' },

    // Mangalore Regional Citations
    'mng1': { id: 'mng1', citation_key: 'MNG_INTEL_2025', citation_number: 1, source_type: 'report', source_name: 'Mangalore Industrial Intelligence Map', publication_year: 2025, title: 'Mangalore 18 Economic Sectors: A Complete Industrial Intelligence Map', url: '', reliability_score: 10, tags: ['mangalore', 'dakshina_kannada', 'gsdp'], geographic_focus: ['Mangalore'], excerpt: 'Mangalore is India\'s 8th richest district by per capita GDP (₹6.69 lakh).' },
    'mng2': { id: 'mng2', citation_key: 'DIC_DK_2024', citation_number: 2, source_type: 'government', source_name: 'DIC Dakshina Kannada', publication_year: 2024, title: 'MSME Directory Dakshina Kannada', url: '', reliability_score: 9, tags: ['msme', 'directory'], geographic_focus: ['Dakshina Kannada'], excerpt: '18,918+ registered MSMEs in Dakshina Kannada.' },

    // Oil, Gas & Petrochemicals Citations
    'og1': { id: 'og1', citation_key: 'R_M_2022_OilGas', citation_number: 1, source_type: 'report', source_name: 'Research and Markets', publication_year: 2022, title: 'Indian Oil and Gas Market Estimates', url: 'https://www.researchandmarkets.com/', reliability_score: 8, tags: ['oil_gas', 'market_size'], geographic_focus: ['India'], excerpt: 'Valued at USD 416.4 billion in 2022, reaching USD 511.5 billion by 2027.' },
    'og2': { id: 'og2', citation_key: 'Ken_2023_OilGas', citation_number: 2, source_type: 'report', source_name: 'Ken Research', publication_year: 2023, title: 'India Oil and Gas Industry Outlook', url: 'https://www.kenresearch.com/', reliability_score: 8, tags: ['oil_gas', 'market_size'], geographic_focus: ['India'], excerpt: 'Estimated at USD 433.8 billion for 2023.' },
    'og3': { id: 'og3', citation_key: 'MoPNG_2024_IndiaChem', citation_number: 3, source_type: 'government', source_name: 'Petroleum Minister', publication_year: 2024, title: 'India Chem 2024 Address', url: 'https://pib.gov.in/', reliability_score: 10, tags: ['petrochemicals', 'government'], geographic_focus: ['India'], excerpt: 'Chemicals and petrochemicals sub-sector stands at USD 220 billion as of 2024.' },
    'og4': { id: 'og4', citation_key: 'IMARC_2025_Petrochem', citation_number: 4, source_type: 'report', source_name: 'IMARC Group', publication_year: 2025, title: 'India Petrochemicals Market Size', url: 'https://www.imarcgroup.com/', reliability_score: 8, tags: ['petrochemicals', 'market_size'], geographic_focus: ['India'], excerpt: 'Petrochemicals-only market estimated at USD 60.3 billion in 2025.' },
    'og5': { id: 'og5', citation_key: 'EcoSurvey_2025', citation_number: 5, source_type: 'government', source_name: 'Ministry of Finance', publication_year: 2025, title: 'Economic Survey 2025-26', url: 'https://www.indiabudget.gov.in/', reliability_score: 10, tags: ['gdp', 'gva'], geographic_focus: ['India'], excerpt: 'GVA of ₹2.12 lakh crore, representing 8.1% of manufacturing GVA.' },
    'og6': { id: 'og6', citation_key: 'Mordor_2025_OFS', citation_number: 6, source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2025, title: 'India Oilfield Services Market', url: 'https://www.mordorintelligence.com/', reliability_score: 8, tags: ['oilfield', 'upstream'], geographic_focus: ['India'], excerpt: 'Market at USD 23.28 billion in 2025, growing to USD 29.74 billion by 2030.' },
    'og7': { id: 'og7', citation_key: 'IEA_2025_WEO', citation_number: 7, source_type: 'report', source_name: 'IEA', publication_year: 2025, title: 'World Energy Outlook 2025', url: 'https://www.iea.org/', reliability_score: 10, tags: ['energy_demand', 'forecast'], geographic_focus: ['India', 'Global'], excerpt: 'India oil demand climbing to 6.6 mb/d by 2030 and 8.0 mb/d by 2035.' },
    'og8': { id: 'og8', citation_key: 'OPEC_2025_WOO', citation_number: 8, source_type: 'report', source_name: 'OPEC', publication_year: 2025, title: 'World Oil Outlook 2025', url: 'https://www.opec.org/', reliability_score: 10, tags: ['oil_demand', 'long_term'], geographic_focus: ['India', 'Global'], excerpt: 'India will add 8.2 mb/d of oil demand by 2050.' },
    'og9': { id: 'og9', citation_key: 'GVR_2023_Petrochem', citation_number: 9, source_type: 'report', source_name: 'Grand View Research', publication_year: 2023, title: 'India Petrochemicals Market Analysis', url: 'https://www.grandviewresearch.com/', reliability_score: 9, tags: ['petrochemicals', 'cagr'], geographic_focus: ['India'], excerpt: 'Projects a 7.5% CAGR from 2023 to 2030.' },
    'og10': { id: 'og10', citation_key: 'McKinsey_2024_Chem', citation_number: 10, source_type: 'report', source_name: 'McKinsey & Company', publication_year: 2024, title: 'India Chemicals Vision 2040', url: 'https://www.mckinsey.com/', reliability_score: 9, tags: ['chemicals', 'forecast'], geographic_focus: ['India'], excerpt: 'Growing at 11-12% CAGR, reaching USD 850 billion-1 trillion by 2040.' },
    'og11': { id: 'og11', citation_key: 'IEA_2025_Gas', citation_number: 11, source_type: 'report', source_name: 'IEA', publication_year: 2025, title: 'India Gas Market Report 2025', url: 'https://www.iea.org/', reliability_score: 10, tags: ['natural_gas', 'consumption'], geographic_focus: ['India'], excerpt: 'Gas consumption reaching 103 BCM annually by 2030.' },
    'og12': { id: 'og12', citation_key: 'NITI_2025_Chem Hubs', citation_number: 12, source_type: 'government', source_name: 'NITI Aayog', publication_year: 2025, title: 'Chemical Value Chains by 2040', url: 'https://niti.gov.in/', reliability_score: 10, tags: ['policy', 'chemical_hubs'], geographic_focus: ['India'], excerpt: 'Ambitious target for India to achieve 12% of global chemical value chains by 2040.' },
    
    // IT & Software Citations
    'it1': { id: 'it1', citation_key: 'NASSCOM_2026_StrategicReview', citation_number: 1, source_type: 'industry', source_name: 'NASSCOM', publication_year: 2026, title: 'Strategic Review 2026', url: '', reliability_score: 10, tags: ['it', 'market_size', 'exports'], geographic_focus: ['India', 'Global'], excerpt: 'Total IT-BPM industry revenue at $315 billion for FY2026, exports $246 billion.' },
    'it2': { id: 'it2', citation_key: 'Gartner_2025_ITSpending', citation_number: 2, source_type: 'report', source_name: 'Gartner', publication_year: 2025, title: 'India IT Spending Forecast', url: '', reliability_score: 9, tags: ['it', 'domestic_spending'], geographic_focus: ['India'], excerpt: 'IT spending within India reached $160 billion in CY2025, projected $176.3 billion for CY2026.' },
    'it3': { id: 'it3', citation_key: 'MeitY_2025_TrillionTarget', citation_number: 3, source_type: 'government', source_name: 'Ministry of Electronics and IT', publication_year: 2025, title: '$1 Trillion Digital Economy Goal', url: '', reliability_score: 10, tags: ['policy', 'digital_economy'], geographic_focus: ['India'], excerpt: 'Target of $1 trillion digital economy split evenly between IT services and electronics.' },
    'it4': { id: 'it4', citation_key: 'Zylo_2024_SaaS', citation_number: 4, source_type: 'report', source_name: 'Zylo / SaaSBoomi', publication_year: 2024, title: 'India SaaS Landscape', url: '', reliability_score: 9, tags: ['saas', 'growth'], geographic_focus: ['India'], excerpt: 'SaaS market generated over $15 billion in FY2024, growing at 24% CAGR.' },
    'it5': { id: 'it5', citation_key: 'Stanford_2024_AI_Index', citation_number: 5, source_type: 'academic', source_name: 'Stanford University', publication_year: 2024, title: 'AI Index Report 2024', url: '', reliability_score: 10, tags: ['ai', 'talent'], geographic_focus: ['India', 'Global'], excerpt: 'India ranks first globally in AI skill penetration.' },
    'it6': { id: 'it6', citation_key: 'DPIIT_2025_Startups', citation_number: 6, source_type: 'government', source_name: 'DPIIT', publication_year: 2025, title: 'Startup India Statistics', url: '', reliability_score: 10, tags: ['startups', 'unicorns'], geographic_focus: ['India'], excerpt: 'India hosts 125-127 unicorns and over 159,000 DPIIT-recognized startups.' },
    'it7': { id: 'it7', citation_key: 'WTO_2025_Exports', citation_number: 7, source_type: 'government', source_name: 'World Trade Organization', publication_year: 2025, title: 'Global Services Trade Statistics', url: '', reliability_score: 10, tags: ['exports', 'it_services'], geographic_focus: ['India', 'Global'], excerpt: 'India ranks 8th globally in commercial services exports and 5th in digitally delivered services.' },
    'it8': { id: 'it8', citation_key: 'NASSCOM_2025_GCC', citation_number: 8, source_type: 'industry', source_name: 'NASSCOM', publication_year: 2025, title: 'GCC Landscape in India', url: '', reliability_score: 9, tags: ['gcc', 'employment'], geographic_focus: ['India'], excerpt: '1,760 GCCs generated $64.6 billion in FY2024 employing 1.9 million.' },

    // Nagpur & Vidarbha Citations (New)
    'ngp_1': { id: 'ngp_1', citation_key: 'VIA_advantage_vidarbha', citation_number: 1, source_type: 'industry', source_name: 'Vidarbha Industries Association', publication_year: 2026, title: 'Advantage Vidarbha', url: 'https://www.via-india.com/about-vidarbha/advantage-vidarbha/', reliability_score: 10, tags: ['vidarbha', 'resources'], excerpt: "100% of Maharashtra's coal, 80% iron ore, strategic central India positioning" },
    'ngp_2': { id: 'ngp_2', citation_key: 'MIA_nagpur_directory', citation_number: 2, source_type: 'industry', source_name: 'MIDC Industries Association Nagpur', publication_year: 2024, title: 'MIA Nagpur Directory', url: 'https://mianagpurdirectory.in/aboutus.html', reliability_score: 9, tags: ['directory', 'units'], excerpt: '~500 member units, one of Maharashtra\'s oldest industrial associations' },
    'ngp_3': { id: 'ngp_3', citation_key: 'butibori_expansion_2025', citation_number: 3, source_type: 'news', source_name: 'The Live Nagpur', publication_year: 2025, title: 'Additional Butibori MIDC May Attract ₹1.95 Lakh Crore Investments', url: 'https://thelivenagpur.com/2025/10/02/additional-butibori-midc-may-attract-%E2%82%B91-95-lakh-crore-investments/', reliability_score: 8, tags: ['butibori', 'investment'] },
    'ngp_4': { id: 'ngp_4', citation_key: 'hyosung_investment', citation_number: 4, source_type: 'news', source_name: 'Nagpur Today', publication_year: 2024, title: "South Korean giant H S Hyosung to invest Rs 1,740 cr in Nagpur's Butibori", url: 'https://www.nagpurtoday.in/south-korean-giant-h-s-hyosung-to-invest-rs-1740-cr-in-nagpurs-butibori-industrial-estate/02281256', reliability_score: 8 },
    'ngp_5': { id: 'ngp_5', citation_key: 'jsw_kalmeshwar', citation_number: 5, source_type: 'industry', source_name: 'JSW Steel', publication_year: 2024, title: 'JSW Steel Kalmeshwar Works', url: 'https://www.jswsteel.in/kalmeshwar-works', reliability_score: 9, excerpt: 'Galvanized, galvalume, colour-coated steel using Japanese technology' },
    'ngp_6': { id: 'ngp_6', citation_key: 'adani_nagpur', citation_number: 6, source_type: 'news', source_name: 'Nagpur Today', publication_year: 2024, title: 'Advantage Vidarbha: Jeet Adani Announces ₹70,000 Cr Project in Nagpur', url: 'https://www.nagpurtoday.in/advantage-vidarbha-jeet-adani-announces-%E2%82%B970000-cr-project-in-nagpur/02061436', reliability_score: 8 },
    'ngp_7': { id: 'ngp_7', citation_key: 'mihan_sez_overview', citation_number: 7, source_type: 'government', source_name: 'MIHAN SEZ', publication_year: 2024, title: 'MIHAN SEZ at a Glance', url: 'https://www.mihansez.org/Pages/details/mihan-sez-at-a-glance', reliability_score: 10, excerpt: "4,354 hectares total, 1,236-hectare SEZ, India's first multi-product SEZ linked to airport" },
    'ngp_8': { id: 'ngp_8', citation_key: 'tal_boeing', citation_number: 8, source_type: 'industry', source_name: 'Boeing India', publication_year: 2019, title: 'Boeing and TAL Manufacturing Solutions celebrate delivery of 25,000th floor beam', url: 'https://www.boeing.co.in/news/2019/boeing-and-tal-manufacturing-solutions-celebrate-delivery-of-the', reliability_score: 9 },
    'ngp_9': { id: 'ngp_9', citation_key: 'solar_defence_mihan', citation_number: 9, source_type: 'news', source_name: 'Indian Defence News', publication_year: 2026, title: 'Solar Defence Pumps ₹128bn Into Nagpur UAV And Robotics Hub', url: 'https://www.indiandefensenews.in/2026/03/solar-defence-pumps-128bn-into-nagpur.html', reliability_score: 8 },
    'ngp_10': { id: 'ngp_10', citation_key: 'mahindra_nagpur', citation_number: 10, source_type: 'industry', source_name: 'Mahindra', publication_year: 2024, title: 'Mahindra to Set Up its Largest Integrated Auto & Tractor Manufacturing Facility in Maharashtra', url: 'https://www.mahindra.com/news-room/press-release/en/mahindra-to-set-up-its-largest-integrated-auto-and-tractor-manufacturing-facility-in-maharashtra', reliability_score: 9 },
    'ngp_11': { id: 'ngp_11', citation_key: 'jds_transformer', citation_number: 11, source_type: 'industry', source_name: 'JDS Transformers', publication_year: 2024, title: 'JDS Transformer Profile', url: 'https://www.jdstransformers.com/profile.html', reliability_score: 8, excerpt: 'MSEDCL approved, up to 10 MVA/33kV, 36,000 MT/year conductor capacity' },
    'ngp_12': { id: 'ngp_12', citation_key: 'high_rise_transformer', citation_number: 12, source_type: 'industry', source_name: 'High Rise Transformer', publication_year: 2024, title: 'About Us', url: 'https://www.hrtnagpur.com/about-us', reliability_score: 8, excerpt: 'Up to 15 MVA/33kV, ISI/BEE certified, CPRI/ERDA tested, furnace transformers up to 5 MVA' },
    'ngp_13': { id: 'ngp_13', citation_key: 'vnit_siemens_coe', citation_number: 13, source_type: 'academic', source_name: 'VNIT Nagpur', publication_year: 2024, title: 'VRJSCOE - Visvesvaraya Regional Joint Skill Centre of Excellence', url: 'https://vnit.ac.in/vrjscoe/', reliability_score: 10, excerpt: '₹187 crore Siemens investment, 11 labs covering CNC, robotics, smart manufacturing, IoT' },
    'ngp_14': { id: 'ngp_14', citation_key: 'idemi_nagpur', citation_number: 14, source_type: 'government', source_name: 'IDEMI', publication_year: 2024, title: 'MSME Technology Centre Nagpur Extension', url: 'https://idemi.org/extension-centre/nagpur', reliability_score: 10, excerpt: 'Calibration, testing, tool room services for MSMEs' },
    'ngp_15': { id: 'ngp_15', citation_key: 'maharashtra_policy_2025', citation_number: 15, source_type: 'government', source_name: 'MAITRI Maharashtra', publication_year: 2025, title: 'Maharashtra Industry, Investment and Services Policy 2025', url: 'https://maitri.maharashtra.gov.in/policies/', reliability_score: 10 },

    // BFSI Citations (New)
    'b1': { id: 'b1', citation_key: 'IBEF_RBI_2025_Banking', citation_number: 1, source_type: 'government', source_name: 'IBEF/RBI', publication_year: 2025, title: 'Indian Banking Sector Assets', url: '', reliability_score: 10, tags: ['banking', 'assets'], geographic_focus: ['India'], excerpt: 'Banking total assets reached ₹287 lakh crore (~$3,360 billion) in FY25.' },
    'b2': { id: 'b2', citation_key: 'RBI_PIB_2025_Credit', citation_number: 2, source_type: 'government', source_name: 'RBI/PIB', publication_year: 2025, title: 'Bank Credit Outstanding', url: '', reliability_score: 10, tags: ['banking', 'credit'], geographic_focus: ['India'], excerpt: 'Bank credit outstanding stood at ₹181 lakh crore (~$2,200 billion) in FY25.' },
    'b3': { id: 'b3', citation_key: 'PIB_2025_Deposits', citation_number: 3, source_type: 'government', source_name: 'PIB', publication_year: 2025, title: 'Bank Deposits Growth', url: '', reliability_score: 10, tags: ['banking', 'deposits'], geographic_focus: ['India'], excerpt: 'Bank deposits reached ₹232 lakh crore (~$2,700 billion).' },
    'b4': { id: 'b4', citation_key: 'RBI_2025_Trend_Progress', citation_number: 4, source_type: 'government', source_name: 'RBI', publication_year: 2025, title: 'Report on Trend and Progress of Banking in India', url: '', reliability_score: 10, tags: ['nbfc', 'banking', 'npas'], geographic_focus: ['India'], excerpt: 'NBFC balance sheet hit ₹65.5 lakh crore; Gross NPAs fell to 2.31% in March 2025.' },
    'b5': { id: 'b5', citation_key: 'IRDAI_2025_Premiums', citation_number: 5, source_type: 'government', source_name: 'IRDAI', publication_year: 2025, title: 'Insurance Premium Collection FY25', url: '', reliability_score: 10, tags: ['insurance', 'premiums'], geographic_focus: ['India'], excerpt: 'Insurance premiums reached ₹11.93 lakh crore (~$140 billion) in FY25.' },
    'b6': { id: 'b6', citation_key: 'IRDAI_2025_AUM', citation_number: 6, source_type: 'government', source_name: 'IRDAI', publication_year: 2025, title: 'Insurance Sector AUM', url: '', reliability_score: 10, tags: ['insurance', 'aum'], geographic_focus: ['India'], excerpt: 'Insurance AUM stood at ₹74.44 lakh crore (~$872 billion).' },
    'b7': { id: 'b7', citation_key: 'AMFI_2025_AUM', citation_number: 7, source_type: 'industry', source_name: 'AMFI/IBEF', publication_year: 2025, title: 'Mutual Fund Asset Management', url: '', reliability_score: 10, tags: ['wealth', 'mutual_funds'], geographic_focus: ['India'], excerpt: 'Mutual fund AUM hit ₹75.61 lakh crore (~$864 billion) in Sep 2025.' },
    'b8': { id: 'b8', citation_key: 'IMARC_2025_Fintech', citation_number: 8, source_type: 'report', source_name: 'IMARC Group', publication_year: 2025, title: 'India Fintech Market Size', url: '', reliability_score: 9, tags: ['fintech', 'market_size'], geographic_focus: ['India'], excerpt: 'Fintech market size between $112-155 billion with 87% adoption.' },
    'b9': { id: 'b9', citation_key: 'NPCI_2025_UPI', citation_number: 9, source_type: 'government', source_name: 'NPCI', publication_year: 2025, title: 'UPI Transaction Volume and Value', url: '', reliability_score: 10, tags: ['payments', 'upi'], geographic_focus: ['India'], excerpt: 'UPI processed ₹299.7 lakh crore across 228.3 billion transactions in 2025.' },
    'b10': { id: 'b10', citation_key: 'PFRDA_2025_NPS', citation_number: 10, source_type: 'government', source_name: 'PFRDA', publication_year: 2025, title: 'NPS Assets Under Management', url: '', reliability_score: 10, tags: ['pensions', 'wealth'], geographic_focus: ['India'], excerpt: 'NPS AUM reached ₹14.7 lakh crore (~$172 billion).' },
    'b11': { id: 'b11', citation_key: 'CRISIL_2025_Retail_Credit', citation_number: 11, source_type: 'report', source_name: 'CRISIL', publication_year: 2025, title: 'India Retail Credit Trends', url: '', reliability_score: 9, tags: ['credit', 'retail'], geographic_focus: ['India'], excerpt: 'Retail credit hit ₹82 lakh crore (~$937 billion), growing at 15.1% CAGR.' },
    'b12': { id: 'b12', citation_key: 'Bajaj_2025_MarketCap', citation_number: 12, source_type: 'industry', source_name: 'Bajaj Finserv AMC', publication_year: 2025, title: 'BFSI Sector Market Capitalization', url: '', reliability_score: 9, tags: ['markets', 'bfsi', 'market_cap'], geographic_focus: ['India'], excerpt: 'BFSI market cap reached ₹91 lakh crore (~$1 trillion) in 2025.' },
    'b13': { id: 'b13', citation_key: 'PwC_2025_Banking_2050', citation_number: 13, source_type: 'report', source_name: 'PwC', publication_year: 2025, title: 'Banking in 2050: Global Rankings', url: '', reliability_score: 9, tags: ['forecast', 'banking'], geographic_focus: ['India', 'Global'], excerpt: "India projected to be 3rd largest domestic banking sector by 2050." },
    'b14': { id: 'b14', citation_key: 'Mazars_2025_Digital_Banking', citation_number: 14, source_type: 'report', source_name: 'Forvis Mazars', publication_year: 2025, title: 'Digital Banking in India 2030', url: '', reliability_score: 9, tags: ['forecast', 'digital_banking'], geographic_focus: ['India'], excerpt: 'Digital banking market targeting $1 trillion by 2030.' },
    'b15': { id: 'b15', citation_key: 'ICRA_2025_NBFC_AUM', citation_number: 15, source_type: 'report', source_name: 'ICRA/CRISIL', publication_year: 2025, title: 'NBFC Credit Growth Forecast', url: '', reliability_score: 9, tags: ['nbfc', 'forecast'], geographic_focus: ['India'], excerpt: 'NBFC AUM to cross ₹50 lakh crore by March 2027.' },
    'b16': { id: 'b16', citation_key: 'IMARC_2025_Insurance_Forecast', citation_number: 16, source_type: 'report', source_name: 'IMARC/TechSci', publication_year: 2025, title: 'India Insurance Market Outlook 2034', url: '', reliability_score: 9, tags: ['insurance', 'forecast'], geographic_focus: ['India'], excerpt: 'Insurance market projected at $515-867B by 2029-2034.' },
    'b17': { id: 'b17', citation_key: 'GVR_2025_Health_Insurance', citation_number: 17, source_type: 'report', source_name: 'Grand View Research', publication_year: 2025, title: 'Health Insurance Market in India 2030', url: '', reliability_score: 9, tags: ['insurance', 'health'], geographic_focus: ['India'], excerpt: 'Health insurance growing at 20.9% CAGR, targeting $46.4B by 2030.' },
    'b18': { id: 'b18', citation_key: 'BCG_2025_Fintech_2030', citation_number: 18, source_type: 'report', source_name: 'BCG/Inc42', publication_year: 2025, title: 'India Fintech Revenue Forecast 2030', url: '', reliability_score: 9, tags: ['fintech', 'forecast'], geographic_focus: ['India'], excerpt: 'Fintech revenue projected at $190-250B by 2030.' },
    'b19': { id: 'b19', citation_key: 'Inc42_2025_Digital_Lending', citation_number: 19, source_type: 'report', source_name: 'Inc42', publication_year: 2025, title: 'The State of Digital Lending 2030', url: '', reliability_score: 9, tags: ['lending', 'digital'], geographic_focus: ['India'], excerpt: 'Digital lending market to reach $1.3 trillion by 2030.' },
    'b20': { id: 'b20', citation_key: 'CareEdge_2025_Housing', citation_number: 20, source_type: 'report', source_name: 'CareEdge', publication_year: 2025, title: 'Housing Finance Projections FY30', url: '', reliability_score: 9, tags: ['housing', 'finance'], geographic_focus: ['India'], excerpt: 'Housing finance to reach ₹77-81 lakh crore by FY30.' },
    'b21': { id: 'b21', citation_key: 'Mordor_2025_UPI_2029', citation_number: 21, source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2025, title: 'UPI Market Value Forecast', url: '', reliability_score: 9, tags: ['payments', 'upi'], geographic_focus: ['India'], excerpt: 'UPI value projected to reach $6.4 trillion by 2029.' },
    'b22': { id: 'b22', citation_key: 'IMF_2025_UPI_Global', citation_number: 22, source_type: 'government', source_name: 'IMF', publication_year: 2025, title: 'India Stack: A Global DPI Model', url: '', reliability_score: 10, tags: ['dpi', 'upi', 'imf'], geographic_focus: ['Global'], excerpt: 'UPI officially surpassed Visa globally in daily transaction volume, reaching 640M+ transactions.' },
};

export const SECTOR_THESES: Record<string, SectorThesis> = {
    "bfsi": {
        id: "bfsi",
        display_name: "BFSI (Silicon Beach)",
        status: "published",
        research_date: "2026-03-30",
        executive_summary: "India's BFSI sector has reached a market capitalization of ₹91 lakh crore (~US$1 trillion) in 2025 — a 50-fold expansion since 2005. Contributing 27% of India's GDP, the 'Silicon Beach' thesis highlights a unique digital public infrastructure layer (Aadhaar, UPI, Account Aggregator) processing 49% of the world's real-time payments [^b12][^b22]. Despite massive growth, deep underpenetration in credit and insurance represents a powerful growth catalyst for the next decade.",
        key_findings: [
            "Market Capitalization: ₹91 lakh crore (~$1 trillion) in 2025, up from $20.28B in 2005 [^b12].",
            "Banking Scale: Total assets of ~$3.36 trillion, with bank credit crossing ₹200 lakh crore in early 2026 [^b1].",
            "Digital Dominance: UPI processes 49% of global real-time payments, officially surpassing Visa daily volume [^b9][^b22].",
            "Asset Quality: Gross NPAs at a 20-year low of 2.31% (March 2025) [^b4].",
            "Wealth Surge: Mutual fund AUM reached ₹75.6 lakh crore ($864B), growing 45x in 20 years [^b7]."
        ],
        investment_thesis: "The BFSI sector is transitioning from a legacy system to a 'technology-first' financial ecosystem. With household debt at just 41% of GDP and only 8% of Indians holding credit cards, the runway for digital-first lending ($1.3T by 2030) and universal insurance is unprecedented. The India Stack has reduced KYC costs by 99%, enabling profitable financial inclusion at a scale no other economy has replicated.",
        market_stats: {
            current_size: 1000000000000,
            current_size_display: "$1 Trillion (Market Cap)",
            forecast_size: 5000000000000,
            forecast_size_display: "$5 Trillion (Ecosystem)",
            cagr: 22.0,
            forecast_year: 2030,
            currency: "USD"
        },
        market_structure: {
            total_companies: 16100,
            msme_percentage: 85,
            organized_split: { organized: 90, unorganized: 10 },
            geographic_distribution: { "Maharashtra": 40, "Karnataka": 15, "Tamil Nadu": 10, "Delhi": 10, "Others": 25 }
        },
        market_segments: ["Banking", "NBFCs", "Insurance", "Fintech", "Wealth Management", "Capital Markets"],
        sub_sectors: [
            {
                name: "Banking",
                description: "₹287 lakh crore assets; 12 PSBs, 21 private banks; world-leading digital transformation.",
                market_size: 3360000,
                cagr: 13.0,
                growth_drivers: ["Credit-to-GDP surge", "Digital Banking Units", "Consolidation"],
                key_players: ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank"],
                msme_opportunity_score: 85,
                citation_ids: ['b1', 'b13']
            },
            {
                name: "Fintech",
                description: "Third largest globally; 16,100+ startups; 87% adoption rate; $32B+ in funding.",
                market_size: 155000,
                cagr: 31.0,
                growth_drivers: ["UPI rails", "Digital lending ($1.3T target)", "DPI-led KYC"],
                key_players: ["PhonePe", "Razorpay", "CRED", "Groww", "PolicyBazaar"],
                msme_opportunity_score: 95,
                citation_ids: ['b8', 'b18', 'b19']
            },
            {
                name: "Insurance",
                description: "₹11.93 lakh crore premiums; projected 6th largest globally by 2032.",
                market_size: 140000,
                cagr: 17.0,
                growth_drivers: ["IRDAI Vision 2047", "100% FDI", "Bima Sugam digital rails"],
                key_players: ["LIC", "HDFC Life", "ICICI Prudential", "Star Health"],
                msme_opportunity_score: 80,
                citation_ids: ['b5', 'b16', 'b17']
            }
        ],
        competitors: [
            {
                name: "HDFC Bank",
                type: "listed",
                revenue: 25000,
                market_share: 15,
                key_strengths: ["World's 4th largest bank cap", "Merged entity scale", "Retail dominance"],
                citation_ids: []
            },
            {
                name: "State Bank of India (SBI)",
                type: "psu",
                revenue: 45000,
                market_share: 22,
                key_strengths: ["₹74.7T assets", "Digital YONO reach", "Unmatched network"],
                citation_ids: []
            },
            {
                name: "PhonePe",
                type: "startup",
                revenue: 1500,
                market_share: 45,
                key_strengths: ["UPI market leadership", "Digital payment rails", "$14.5B valuation"],
                citation_ids: []
            }
        ],
        market_stats_history: [
            { year: 2005, market_size: 20280000000, growth_rate: 0, citation_ids: [] },
            { year: 2025, market_size: 1000000000000, growth_rate: 22.0, citation_ids: ['b12'] },
            { year: 2030, market_size: 5000000000000, growth_rate: 15.0, citation_ids: ['b13'] }
        ],
        growth_drivers: [
            { name: "India Stack / DPI", type: "technology", impact_level: "high", description: "Universal digital identity and payment rails", citation_ids: ['b22'] },
            { name: "Credit Underpenetration", type: "demand_side", impact_level: "high", description: "Household debt at 41% (vs 60-70% in mature markets)", citation_ids: [] },
            { name: "Digital Lending Boom", type: "demand_side", impact_level: "high", description: "$1.3T opportunity by 2030", citation_ids: ['b19'] },
            { name: "Institutional Reforms", type: "policy", impact_level: "high", description: "IRDAI 100% FDI and Bima Sugam initiative", citation_ids: ['b16'] }
        ],
        opportunities: [
            { title: "Digital Micro-lending", type: "service", description: "Small-ticket credit for MSMEs using transaction data", market_size_estimate: 250000000000, overall_score: 9.5, capital_requirement: "Low", time_to_market_months: 6 },
            { title: "Embedded Insurtech", type: "product", description: "Automated insurance at point of sale", market_size_estimate: 12000000000, overall_score: 9.0, capital_requirement: "Medium", time_to_market_months: 12 },
            { title: "Wealthtech for Mass Markets", type: "service", description: "Democratized investment tools for retail demat growth", market_size_estimate: 100000000000, overall_score: 8.5, capital_requirement: "Medium", time_to_market_months: 12 }
        ],
        policies: [
            { name: "Insurance for All by 2047", type: "infrastructure", description: "Massive push for universal health and life coverage", impact: "High", status: "active" },
            { name: "Bima Sugam", type: "regulation", description: "Unified digital marketplace for insurance", impact: "High", status: "upcoming" },
            { name: "National Strategy for Financial Inclusion", type: "policy", description: "RBI roadmap to expand financial depth", impact: "High", status: "active" }
        ],
        risks: [
            { name: "Cybersecurity/Data Privacy", category: "technology", severity: "high", probability: 0.7, description: "Risks associated with large-scale digital data sharing", citation_ids: [] },
            { name: "Regulatory Over-tightening", category: "policy", severity: "medium", probability: 0.4, description: "Compliance costs for fintech and digital lenders", citation_ids: [] },
            { name: "Global Financial Contagion", category: "market", severity: "medium", probability: 0.3, description: "External shocks affecting India's banking systemic health", citation_ids: [] }
        ],
        citations: [
            CITATIONS['b1'], CITATIONS['b4'], CITATIONS['b5'], CITATIONS['b7'], CITATIONS['b8'], CITATIONS['b9'], 
            CITATIONS['b12'], CITATIONS['b13'], CITATIONS['b16'], CITATIONS['b19'], CITATIONS['b22']
        ]
    },
    "oil_gas_petro": {
        id: "oil_gas_petro",
        display_name: "Oil, Gas, and Petrochemicals",
        status: "published",
        research_date: "2026-03-30",
        
        executive_summary: "India's oil, gas, and petrochemicals sector is the world's fastest-growing major energy market, valued at USD 416–434 billion in total revenue terms and positioned to surpass USD 500 billion by 2027 [^og1][^og2]. The country has overtaken China as the single largest driver of global oil demand growth, accounting for roughly one-quarter of the entire world's incremental oil consumption in 2024–2025 [^og7]. With refining capacity of 258.1 MMTPA across 23 refineries (4th globally), petroleum product consumption of 239.2 MMT in FY25, and a chemicals-and-petrochemicals industry worth USD 220 billion targeting USD 1 trillion by 2040, India stands at the intersection of massive domestic demand, ambitious capacity expansion, and strategic import-substitution efforts [^og3][^og10]. The sector contributes approximately 6% of GDP, employs over 5 million people directly, and anchors India's broader energy security architecture.",
        
        key_findings: [
            "Current market size: Broad oil and gas market at USD 433.8 billion (2023), heading to USD 511.5 billion by 2027 [^og1][^og2].",
            "Petrochemicals constraint: India imports ~45% of its intermediates (USD 31 billion deficit) despite strong consumption growth [^og12].",
            "Unprecedented demand: India commands 5.5% of global oil consumption (5.5 million b/d), projected to hit 8.0 mbd by 2035 [^og7].",
            "Refining superpower: 258.1 MMTPA capacity running at ~103% utilization, with Jamnagar alone at 68.2 MMTPA.",
            "Fiscal impact: The sector delivered ₹7.51 trillion in fuel taxes to the consolidated exchequer in FY24."
        ],
        
        investment_thesis: "India represents the single largest contributor to global oil demand growth through 2050 [^og8]. The most profound investment opportunity sits downstream in petrochemicals. At a per capita consumption of ~12 kg (vs. ~35 kg globally), India faces a structural supply deficit, importing 45% of intermediates [^og12]. With a ₹3.28 lakh crore (USD 37B) capex push to expand petrochemical capacity from 29.62 to 46 MMTPA by 2030, MSMEs and specialized engineering contractors have massive adjacencies in EPC, midstream logistics (CGD pipelines growing 12.8% CAGR), and niche specialty chemical synthesis.",
        
        market_stats: {
            current_size: 434000000000,
            current_size_display: "$434 Billion",
            forecast_size: 512000000000,
            forecast_size_display: "$512 Billion",
            cagr: 4.2,
            forecast_year: 2027,
            currency: "USD"
        },
        market_structure: {
            total_companies: 15400,
            msme_percentage: 82,
            organized_split: { organized: 85, unorganized: 15 },
            geographic_distribution: { "Gujarat": 35, "Maharashtra": 20, "Odisha": 15, "Tamil Nadu": 10, "Others": 20 }
        },
        market_segments: ["Upstream E&P", "Refining", "Petrochemicals", "City Gas Distribution", "Logistics"],
        
        sub_sectors: [
            {
                name: "Chemicals & Petrochemicals",
                description: "The fastest-growing segment targeting $1 Trillion by 2040, focused on polyolefins, PVC, and synthetic elastomers [^og10].",
                market_size: 220000,
                cagr: 11.5,
                growth_drivers: ["Per capita consumption gap", "Import substitution targets", "Consumer durables boom"],
                key_players: ["Reliance Industries", "Indian Oil", "BPCL", "HPCL", "GAIL", "Haldia Petrochemicals"],
                msme_opportunity_score: 88,
                citation_ids: ['og3', 'og4', 'og9', 'og10']
            },
            {
                name: "City Gas Distribution (CGD)",
                description: "Explosive pipeline expansion reaching 307 geographical areas with target of 50M PNG connections by 2030.",
                market_size: 11330,
                cagr: 12.8,
                growth_drivers: ["National Gas Grid rollout", "Clean fuel transition", "Vehicle CNG conversion"],
                key_players: ["Adani Total Gas", "Indraprastha Gas", "Mahanagar Gas"],
                msme_opportunity_score: 75,
                citation_ids: ['og11']
            },
            {
                name: "Exploration & Production (E&P) Operations",
                description: "Service sector to support upstream drilling, seismic data, and OALP basin development [^og6].",
                market_size: 23280,
                cagr: 12.5,
                growth_drivers: ["HELP/OALP open acreage policies", "Declining legacy field yields"],
                key_players: ["ONGC", "Oil India", "Cairn Oil & Gas"],
                msme_opportunity_score: 65,
                citation_ids: ['og6']
            }
        ],
        
        growth_drivers: [
            {
                name: "Unprecedented Incremental Fuel Demand",
                type: "demand_side",
                impact_level: "high",
                description: "Projected to add 2.5 mb/d by 2035—nearly half of all global oil demand growth over the decade [^og7].",
                estimated_impact_percentage: 45,
                citation_ids: ['og7', 'og8']
            },
            {
                name: "Government Import-Substitution Mandates",
                type: "policy",
                impact_level: "high",
                description: "Targeting an increase of domestic chemical value-chain share from 3.5% to 12% globally by 2040 [^og12].",
                estimated_impact_percentage: 35,
                citation_ids: ['og12']
            }
        ],
        
        opportunities: [
            {
                title: "Specialty Chemicals Manufacturing Hubs",
                type: "product",
                description: "Capture margin in the $31B trade deficit by moving downstream into fluorine chemistry, agrochemicals, and surfactants.",
                market_size_estimate: 8500,
                overall_score: 9.0,
                capital_requirement: "₹20-100 Cr",
                time_to_market_months: 24,
                citation_ids: ['og3', 'og10']
            },
            {
                title: "Energy Transition Equipment",
                type: "manufacturing",
                description: "Manufacture components for the 5,000 SATAT biogas plants and 5 MT Green Hydrogen mission.",
                market_size_estimate: 3200,
                overall_score: 8.5,
                capital_requirement: "₹10-50 Cr",
                time_to_market_months: 18,
                citation_ids: []
            }
        ],
        
        policies: [
            {
                name: "National Gas Grid Expansion",
                type: "Infrastructure Policy",
                description: "Expanding pipeline infrastructure from 25,429 km to a target of 33,000 km by 2030.",
                impact: "High",
                status: "active",
                citation_ids: []
            },
            {
                name: "Open Acreage Licensing Policy (OALP)",
                type: "Regulatory E&P",
                description: "172 blocks awarded offering single 30-year petroleum leases.",
                impact: "Medium",
                status: "active",
                citation_ids: []
            }
        ],
        
        risks: [
            {
                name: "Severe Import Dependency",
                category: "market",
                severity: "high",
                probability: 0.95,
                description: "88.2% import dependency for crude leaves refiners heavily exposed to global choke points and crude pricing volatility.",
                mitigation: ["Strategic Petroleum Reserves (SPR)", "Diversified sourcing (Russia, Middle East)"],
                citation_ids: []
            },
            {
                name: "Energy Transition Cliff",
                category: "technology",
                severity: "medium",
                probability: 0.40,
                description: "Accelerated EV adoption could prematurely depress domestic diesel and petrol retail demand before petchem pivot is completed.",
                mitigation: ["Aggressive refinery retrofitting to petrochemical integration (O2C)"],
                citation_ids: []
            }
        ],
        
        competitors: [
            {
                name: "Reliance Industries",
                type: "private_sector",
                revenue: 5600000,
                market_share: 27,
                key_strengths: ["World's largest single refining site (~68.2 MMTPA)", "Deep O2C integration"],
                citation_ids: []
            },
            {
                name: "Indian Oil Corporation (IOCL)",
                type: "public_sector",
                revenue: 7710000,
                market_share: 31,
                key_strengths: ["Unrivaled retail distribution (60,900 outlets)", "Tripling petchem capacity by 2030"],
                citation_ids: []
            }
        ],
        
        market_stats_history: [
            { year: 2022, market_size: 416400, growth_rate: 6.2, citation_ids: ['og1'] },
            { year: 2023, market_size: 433800, growth_rate: 4.1, citation_ids: ['og2'] },
            { year: 2024, market_size: 442000, growth_rate: 4.2 }
        ],
        
        emerging_companies: [
            { id: 'hical-001', name: 'Hical Technologies', description: 'Diversified manufacturing with niche potential in energy components' }
        ],
        
        citations: Object.values(CITATIONS).filter(c => c.id.startsWith('og'))
    },
    "port-logistics": {
        id: "port-logistics",
        display_name: "Port & Logistics (Mangalore)",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Mangalore is the gateway to Karnataka, with New Mangalore Port (NMPA) handling over 46 MMT of cargo in FY25. The sector is critical for petroleum, coal, and coffee exports [^mng1].",
        key_findings: [
            "46.01 MMT throughput in FY25.",
            "Second largest port in India for petroleum shipments.",
            "Analog fragmentation in customs and last-mile connectivity.",
            "Low AI adoption currently, high mismatch in CFS utilization."
        ],
        investment_thesis: "Digitalization of the port-hinterland corridor. Opportunity for MSMEs in smart warehousing, IoT-enabled container tracking, and AI-driven customs automation.",
        market_stats: {
            current_size: 150000000000,
            current_size_display: "₹15,000 Cr",
            forecast_size: 280000000000,
            forecast_size_display: "₹28,000 Cr",
            cagr: 11.0,
            forecast_year: 2030,
            currency: "INR"
        },
        market_structure: {
            total_companies: 450,
            msme_percentage: 82,
            organized_split: { organized: 40, unorganized: 60 },
            geographic_distribution: { "Panambur": 70, "Bunder": 20, "Others": 10 }
        },
        market_segments: ["Port Ops", "Warehousing", "CFS", "Last-Mile"],
        sub_sectors: [
            {
                name: "Reefer & Cold Chain",
                description: "Critical for Mangalore's high-value seafood and pharmaceutical exports.",
                market_size: 450,
                cagr: 14.5,
                growth_drivers: ["High-value seafood exports", "Pharma cluster growth"],
                key_players: ["NMPA Logistics", "Master Marine"],
                msme_opportunity_score: 92,
                citation_ids: ['mng1']
            },
            {
                name: "Blockchain Customs Clearing",
                description: "Digitalizing the 'Analog Choke' in EXIM documentation.",
                market_size: 120,
                cagr: 22.0,
                growth_drivers: ["Digital India Port mission", "Paperless trade policy"],
                key_players: ["Customs House Agents", "Local Tech MSMEs"],
                msme_opportunity_score: 95,
                citation_ids: ['mng1']
            }
        ],
        growth_drivers: [
            { name: "Sagarmala NMPA Expansion", type: "supply_side", impact_level: "high", description: "Deepening of drafts to handle larger vessels.", estimated_impact_percentage: 25 },
            { name: "MRPL Petchem Expansion", type: "demand_side", impact_level: "high", description: "Increased demand for specialized chemical logistics.", estimated_impact_percentage: 40 }
        ],
        opportunities: [
            { title: "Automated Reefer Monitoring", type: "product", description: "IoT sensors for real-time temp tracking of seafood containers to prevent spoilage.", market_size_estimate: 80, overall_score: 9.2, capital_requirement: "Low", time_to_market_months: 6 },
            { title: "Smart Warehouse Management", type: "service", description: "AI-driven inventory slots for Mangalore's fragmented CFS landscape.", market_size_estimate: 150, overall_score: 8.8, capital_requirement: "Medium", time_to_market_months: 9 }
        ],
        policies: [
            { name: "PM Gati Shakti", type: "supply_side", description: "Multimodal connectivity for port-hinterland flow.", impact: "High", status: "active" }
        ],
        risks: [
            { name: "Draft Limitations", category: "market", severity: "medium", probability: 0.3, description: "Silting issues during monsoons affecting larger vessels." }
        ],
        competitors: [],
        market_stats_history: [],
        citations: [CITATIONS['mng1']]
    },
    "it-ites": {
        id: "it-ites",
        display_name: "IT & Software Ecosystem",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Despite being overshadowed by Bengaluru, Mangalore generates ₹4,500+ Cr in annual IT revenue and is home to the first global delivery centers of Infosys outside Bengaluru. Emerging as a hub for FinTech and DeepTech [^mng1].",
        key_findings: [
            "Infosys, Robosoft, Niveus, and Novigo are anchors.",
            "High concentration of banking software talent (inherited from 4 HQ banks).",
            "Significant brain drain to Bengaluru/USA.",
            "Rapidly growing startup culture in NITK-STEP and Sahyadri."
        ],
        investment_thesis: "Product-led growth in BFSI automation and healthcare tech. Leverage the high-quality local talent and lower operational costs (~30% cheaper than BLR).",
        market_stats: {
            current_size: 45000000000,
            current_size_display: "₹4,500 Cr",
            forecast_size: 120000000000,
            forecast_size_display: "₹12,000 Cr",
            cagr: 18.0,
            forecast_year: 2030,
            currency: "INR"
        },
        market_structure: {
            total_companies: 280,
            msme_percentage: 95,
            organized_split: { organized: 30, unorganized: 70 },
            geographic_distribution: { "Kottara Chowki": 40, "Yeyyadi": 30, "Attavar": 20, "Others": 10 }
        },
        market_segments: ["Enterprise Software", "FinTech", "App Development", "ITeS"],
        sub_sectors: [
            {
                name: "BFSI Software",
                description: "Legacy banking software modernization for regional banks.",
                market_size: 1200,
                cagr: 15.0,
                growth_drivers: ["Digital banking mandates", "DPI landscape"],
                key_players: ["Infosys Mangalore", "Novigo Solutions"],
                msme_opportunity_score: 85
            },
            {
                name: "Maritime Tech",
                description: "Niche software for port and logistics automation.",
                market_size: 350,
                cagr: 25.0,
                growth_drivers: ["NMPA digitalization", "Customs automation"],
                key_players: ["Robosoft", "Niveus"],
                msme_opportunity_score: 90
            }
        ],
        growth_drivers: [
            { name: "Reverse Brain Drain", type: "supply_side", impact_level: "medium", description: "Talent moving back to Mangalore post-COVID.", estimated_impact_percentage: 15 },
            { name: "Special Economic Zones (SEZ)", type: "policy", impact_level: "high", description: "Export incentives for IT-enabled services in Mangalore.", estimated_impact_percentage: 30 }
        ],
        opportunities: [
            { title: "Local BFSI Customization Engine", type: "service", description: "Tailored digital banking wrappers for cooperative and regional banks in coastal Karnataka.", market_size_estimate: 45, overall_score: 9.0, capital_requirement: "Low", time_to_market_months: 8 },
            { title: "SaaS for Maritime Logistics", type: "product", description: "Subscription platform for CHA automation and container tracking.", market_size_estimate: 60, overall_score: 9.5, capital_requirement: "Medium", time_to_market_months: 12 }
        ],
        policies: [
            { name: "Karnataka IT Policy 2025", type: "policy", description: "Tier-2 city incentives for tech startups.", impact: "High", status: "active" }
        ],
        risks: [
            { name: "Talent Attrition to BLR", category: "market", severity: "high", probability: 0.8, description: "Highest risk remains losing senior devs to Bangalore's higher pay scales." }
        ],
        competitors: [],
        market_stats_history: [],
        citations: [CITATIONS['mng1']]
    },
    "bfsi_mangalore": {
        id: "bfsi_mangalore",
        display_name: "Banking, Finance & Insurance (BFSI)",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "The cradle of Indian banking, Mangalore is the birthplace of four major national banks. Today, it remains a critical hub for financial operations and IT-enabled banking services [^mng1].",
        key_findings: ["Karnataka Bank HQ remains a local pillar.", "Strong heritage of financial literacy.", "Potential to become a FinTech regulatory sandbox hub."],
        investment_thesis: "Transition from legacy banking to digital FinTech hubs.",
        market_stats: { current_size: 65000000000, current_size_display: "₹6,500 Cr", forecast_size: 95000000000, forecast_size_display: "₹9,500 Cr", cagr: 7.8, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 120, msme_percentage: 20, organized_split: { organized: 85, unorganized: 15 }, geographic_distribution: { "K.S. Rao Road": 50, "Hampankatta": 30, "Others": 20 } },
        market_segments: ["Banking", "Insurance", "FinTech"],
        sub_sectors: [
            { name: "Digital Banking Adapters", description: "Modernizing legacy stacks for coastal cooperative banks.", market_size: 450, cagr: 12.0, growth_drivers: ["RBI Digital Mandates"], key_players: ["Local Tech"], msme_opportunity_score: 88 }
        ],
        growth_drivers: [
            { name: "DPI Adoption", type: "technology", impact_level: "high", description: "UPI and account aggregator scale." }
        ],
        opportunities: [
            { title: "Cooperative Bank Neo-banking", type: "service", description: "White-labeled mobile banking for Mangalore's numerous cooperative societies.", market_size_estimate: 35, overall_score: 9.0, capital_requirement: "Low", time_to_market_months: 6 },
            { title: "AI Fraud Detection for Rural Shas", type: "product", description: "Specialized fraud detection for small-scale gold loan providers.", market_size_estimate: 20, overall_score: 8.5, capital_requirement: "Medium", time_to_market_months: 12 }
        ],
        policies: [
            { name: "RBI Sandbox", type: "regulation", description: "Opportunities for niche fintech testing.", impact: "Medium", status: "active" }
        ],
        risks: [
            { name: "Regulatory Compliance", category: "policy", severity: "high", probability: 0.4, description: "Ever-changing RBI norms." }
        ],
        competitors: [],
        market_stats_history: [],
        citations: [CITATIONS['mng1']]
    },
    "healthcare_mangalore": {
        id: "healthcare_mangalore",
        display_name: "Medical Tourism & Healthcare Hub",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "With one of the highest doctor-to-population ratios in India, Mangalore is a premier healthcare hub serving the coastal belt and international patients from the Middle East [^mng1].",
        key_findings: ["8 medical colleges in a 20km radius.", "Advanced tertiary care facilities.", "High potential for medical tourism integration."],
        investment_thesis: "Expansion into specialized AI-driven diagnostics and medical tourism infrastructure.",
        market_stats: { current_size: 45000000000, current_size_display: "₹4,500 Cr", forecast_size: 85000000000, forecast_size_display: "₹8,500 Cr", cagr: 12.5, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 350, msme_percentage: 40, organized_split: { organized: 60, unorganized: 40 }, geographic_distribution: { "KMC Hub": 40, "Deralakatte": 30, "Others": 30 } },
        market_segments: ["Hospitals", "Medical Colleges", "Diagnostics"],
        sub_sectors: [
            { name: "Medical Data Analytics", description: "Processing anonymized patient data for pharma research.", market_size: 280, cagr: 18.2, growth_drivers: ["High doctor-patient data volume"], key_players: ["KMC Hub Researchers"], msme_opportunity_score: 94 }
        ],
        growth_drivers: [
            { name: "Medical Tourism Policy", type: "policy", impact_level: "high", description: "State incentives for healthcare travel." }
        ],
        opportunities: [
            { title: "AI-Diagnostics for Coastal Diseases", type: "product", description: "Specialized imaging for monsoon-related ailments prevalent in high-moisture regions.", market_size_estimate: 25, overall_score: 9.3, capital_requirement: "Medium", time_to_market_months: 18 },
            { title: "Tele-Health Bridge", type: "service", description: "Connecting Gulf-based expats with homeland specialists in Mangalore.", market_size_estimate: 60, overall_score: 9.5, capital_requirement: "Low", time_to_market_months: 6 }
        ],
        policies: [
            { name: "Ayushman Bharat", type: "policy", description: "Universal health coverage driving volume.", impact: "High", status: "active" }
        ],
        risks: [
            { name: "Data Privacy", category: "policy", severity: "high", probability: 0.5, description: "Patient confidentiality mandates." }
        ],
        competitors: [],
        market_stats_history: [],
        citations: [CITATIONS['mng1']]
    },
    "food_fisheries_mangalore": {
        id: "food_fisheries_mangalore",
        display_name: "Food Processing & Fisheries",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "A world-class fisheries hub contributing 40% of Karnataka's catch. Ideal Ice Cream is a regional icon in food processing [^mng1].",
        key_findings: ["Major fish meal and oil export hub.", "Strong presence in dairy and poultry.", "Challenge: 48% catch decline in some categories."],
        investment_thesis: "Precision aquaculture and advanced value-added food processing (ready-to-eat).",
        market_stats: { current_size: 35000000000, current_size_display: "₹3,500 Cr", forecast_size: 65000000000, forecast_size_display: "₹6,500 Cr", cagr: 10.5, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 520, msme_percentage: 92, organized_split: { organized: 25, unorganized: 75 }, geographic_distribution: { "Ullal": 40, "Boloor": 30, "Others": 30 } },
        market_segments: ["Fisheries", "Dairy", "Poultry", "Ice Cream"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "cashew_mangalore": {
        id: "cashew_mangalore",
        display_name: "Cashew Processing & Export",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Mangalore processes 25% of India's raw cashew nuts. A highly labor-intensive sector ripe for computer-vision based automation [^mng1].",
        key_findings: ["70,000+ workers, mostly women.", "High export demand for W180/W210 grades.", "Worker health issues due to CNSL acid."],
        investment_thesis: "Automated grading and shelling to increase safety and margin.",
        market_stats: { current_size: 25000000000, current_size_display: "₹2,500 Cr", forecast_size: 45000000000, forecast_size_display: "₹4,500 Cr", cagr: 9.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 180, msme_percentage: 98, organized_split: { organized: 20, unorganized: 80 }, geographic_distribution: { "Baikampady": 50, "Ullal": 30, "Others": 20 } },
        market_segments: ["Shelling", "Grading", "Value-added products"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "general_eng_mangalore": {
        id: "general_eng_mangalore",
        display_name: "General Engineering & Fabrication",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "With 6,000+ units, this sector provides the industrial backbone for the port and refinery infrastructures [^mng1].",
        key_findings: ["Strong focus on structural steel and fabrication.", "Legacy methodology in many units.", "Critical supply chain for MRPL and NMPA."],
        investment_thesis: "Smart fabrication and CNC adoption for precision export markets.",
        market_stats: { current_size: 32000000000, current_size_display: "₹3,200 Cr", forecast_size: 55000000000, forecast_size_display: "₹5,500 Cr", cagr: 10.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 6200, msme_percentage: 99, organized_split: { organized: 10, unorganized: 90 }, geographic_distribution: { "Baikampady": 70, "Yeyyadi": 20, "Others": 10 } },
        market_segments: ["Fabrication", "Machining", "Die-casting"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "construction_mangalore": {
        id: "construction_mangalore",
        display_name: "Construction & Real Estate",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Mangalore has a sky-high high-rise density per capita, driven by NRIs and the educational hub status [^mng1].",
        key_findings: ["Premium residential focus.", "Rapid urban sprawl toward Deralakatte."],
        investment_thesis: "ConTech and sustainable building materials.",
        market_stats: { current_size: 55000000000, current_size_display: "₹5,500 Cr", forecast_size: 95000000000, forecast_size_display: "₹9,500 Cr", cagr: 10.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 420, msme_percentage: 60, organized_split: { organized: 50, unorganized: 50 }, geographic_distribution: { "City Core": 60, "Suburbs": 40 } },
        market_segments: ["Residential", "Commercial", "Infrastructure"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "marine_eng_mangalore": {
        id: "marine_eng_mangalore",
        display_name: "Marine Engineering & Boat Building",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "A legacy sector at Hoige Bazar and Kuloor, building steel and fiberglass boats for the fishing fleet and port operations [^mng1].",
        key_findings: ["Centuries-old heritage in boat building.", "Shift from wood to steel and FRP."],
        investment_thesis: "Composite hull manufacturing and electric marine propulsion.",
        market_stats: { current_size: 1500000000, current_size_display: "₹150 Cr", forecast_size: 3500000000, forecast_size_display: "₹350 Cr", cagr: 15.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 25, msme_percentage: 95, organized_split: { organized: 20, unorganized: 80 }, geographic_distribution: { "Hoige Bazar": 80, "Others": 20 } },
        market_segments: ["Steel Trawlers", "Fiberglass Boats", "Ship Repair"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "edtech_mangalore": {
        id: "edtech_mangalore",
        display_name: "Educational Services & EdTech",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Mangalore's 'knowledge city' status makes it a testing ground for innovative educational tools and assessments [^mng1].",
        key_findings: ["Global destination for medical and eng education.", "Proliferation of coaching institutes."],
        investment_thesis: "AI-driven personalized learning for medical and technical exams.",
        market_stats: { current_size: 12000000000, current_size_display: "₹1,200 Cr", forecast_size: 25000000000, forecast_size_display: "₹2,500 Cr", cagr: 15.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 150, msme_percentage: 80, organized_split: { organized: 40, unorganized: 60 }, geographic_distribution: { "Mannagudda": 50, "Others": 50 } },
        market_segments: ["Test Prep", "Digital Content", "Skill Development"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "hospitality_mangalore": {
        id: "hospitality_mangalore",
        display_name: "Hospitality & Tourism",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Anchor of the coastal tourism circuit, catering to religious, medical, and business travelers [^mng1].",
        key_findings: ["High occupancy during religious festival seasons.", "Growing beach tourism (Sasihithlu/Panambur)."],
        investment_thesis: "Boutique heritage tourism and AI-driven yield management.",
        market_stats: { current_size: 8500000000, current_size_display: "₹850 Cr", forecast_size: 15000000000, forecast_size_display: "₹1,500 Cr", cagr: 10.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 320, msme_percentage: 90, organized_split: { organized: 40, unorganized: 60 }, geographic_distribution: { "City": 70, "Coast": 30 } },
        market_segments: ["Hotels", "Restaurants", "Beach Tourism"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "tile_refractories_mangalore": {
        id: "tile_refractories_mangalore",
        display_name: "Tile & Refractories (Legacy)",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "The iconic 'Mangalore Tiles' sector has declined but retains a niche in heritage restoration and specialty clay products [^mng1].",
        key_findings: ["Heritage status under threat.", "Transition to automated kilns needed."],
        investment_thesis: "Modernization for eco-friendly construction materials.",
        market_stats: { current_size: 250000000, current_size_display: "₹25 Cr", forecast_size: 500000000, forecast_size_display: "₹50 Cr", cagr: 5.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 15, msme_percentage: 100, organized_split: { organized: 10, unorganized: 90 }, geographic_distribution: { "Jeppu": 80, "Others": 20 } },
        market_segments: ["Clay Tiles", "Refractory Bricks"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "auto_comp_mangalore": {
        id: "auto_comp_mangalore",
        display_name: "Auto Components (Niche)",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Niche clusters like leaf springs (Lamina) have made Mangalore a global name in specialized heavy vehicle components [^mng1].",
        key_findings: ["Export-driven success.", "Proximity to Bangalore/Chennai hubs."],
        investment_thesis: "Transition to EV components and lightweight materials.",
        market_stats: { current_size: 15000000000, current_size_display: "₹1,500 Cr", forecast_size: 25000000000, forecast_size_display: "₹2,500 Cr", cagr: 10.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 80, msme_percentage: 85, organized_split: { organized: 30, unorganized: 70 }, geographic_distribution: { "Baikampady": 90, "Others": 10 } },
        market_segments: ["Leaf Springs", "Engine Parts", "Chassis Components"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "printing_pkg_mangalore": {
        id: "printing_pkg_mangalore",
        display_name: "Printing & Packaging",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "High demand from the food, cashew, and pharma sectors has created a vibrant packaging hub in Dakshina Kannada [^mng1].",
        key_findings: ["Big Bags International is a global leader in FIBC.", "Fast adoption of sustainable packaging."],
        investment_thesis: "Smart packaging and IoT-integrated labeling.",
        market_stats: { current_size: 12000000000, current_size_display: "₹1,200 Cr", forecast_size: 22000000000, forecast_size_display: "₹2,200 Cr", cagr: 12.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 180, msme_percentage: 95, organized_split: { organized: 40, unorganized: 60 }, geographic_distribution: { "Ganjimutt": 40, "Baikampady": 40, "Others": 20 } },
        market_segments: ["Flexible Packaging", "Corrugated Boxes", "Digital Printing"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "rubber_plastic_mangalore": {
        id: "rubber_plastic_mangalore",
        display_name: "Rubber & Plastic Products",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Leveraging raw material proximity to the MRPL refinery and coastal rubber plantations [^mng1].",
        key_findings: ["Strong synergy with the petrochemical anchor.", "Diversified product range from household to industrial."],
        investment_thesis: "Biodegradable plastics and high-performance rubber components.",
        market_stats: { current_size: 8500000000, current_size_display: "₹850 Cr", forecast_size: 15000000000, forecast_size_display: "₹1,500 Cr", cagr: 10.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 220, msme_percentage: 98, organized_split: { organized: 20, unorganized: 80 }, geographic_distribution: { "Baikampady": 70, "Others": 30 } },
        market_segments: ["Molded Plastics", "Industrial Rubber", "Household Items"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "jewelry_handicrafts_mangalore": {
        id: "jewelry_handicrafts_mangalore",
        display_name: "Jewelry & Handicrafts",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "Known for exquisite 'Temple Jewelry' and ivory-like carvings, this sector blends heritage with high-value retail [^mng1].",
        key_findings: ["Iconic retail names like Muliya and G.L. Acharya.", "High concentration of skilled artisans."],
        investment_thesis: "AI-assisted design and global e-commerce for traditional jewelry.",
        market_stats: { current_size: 35000000000, current_size_display: "₹3,500 Cr", forecast_size: 55000000000, forecast_size_display: "₹5,500 Cr", cagr: 8.5, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 450, msme_percentage: 99, organized_split: { organized: 30, unorganized: 70 }, geographic_distribution: { "Car Street": 40, "Puttur": 30, "Others": 30 } },
        market_segments: ["Gold/Diamond Jewelry", "Temple Jewelry", "Handicrafts"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "retail_dist_mangalore": {
        id: "retail_dist_mangalore",
        display_name: "Retail & Distribution",
        status: "published",
        research_date: "Mar 30, 2026",
        executive_summary: "A high-consumption district with advanced retail chains and distribution networks for South Karnataka and Kerala [^mng1].",
        key_findings: ["Strong automotive retail and consumer durables presence.", "Last-mile challenges in undulating terrain."],
        investment_thesis: "AI-driven inventory optimization and multimodal retail delivery.",
        market_stats: { current_size: 75000000000, current_size_display: "₹7,500 Cr", forecast_size: 130000000000, forecast_size_display: "₹13,000 Cr", cagr: 12.0, forecast_year: 2030, currency: "INR" },
        market_structure: { total_companies: 1200, msme_percentage: 95, organized_split: { organized: 40, unorganized: 60 }, geographic_distribution: { "Mangalore": 60, "Udupi-DK Border": 40 } },
        market_segments: ["Auto Retail", "FMCG Distribution", "Electronics"],
        sub_sectors: [],
        growth_drivers: [],
        opportunities: [],
        policies: [],
        risks: [],
        competitors: [],
        market_stats_history: [],
        citations: []
    },
    "aerospace": {
        id: "aerospace",
        display_name: "Aerospace",
        status: "published",
        research_date: "Jan 17, 2026",

        // Executive Summary with Inline References
        executive_summary: "India's aerospace and defense market stands at approximately USD 27-29 billion (₹2.25-2.40 lakh crore) as of 2024-25, representing roughly 2% of the global aerospace market [^1][^2]. Government and industry projections indicate the sector will reach USD 70 billion (₹5.8 lakh crore) by 2030, driven by massive commercial aviation expansion, indigenous defense manufacturing, and an emerging space economy [^1]. With defense production reaching ₹1,50,590 Cr in FY25 [^4] and exports growing at +284.5% [^3], India is emerging as a critical node in the global aerospace supply chain.",

        key_findings: [
            "Current market size: USD 27-29 billion (₹2.25-2.40 lakh crore) in 2024-25 [^1][^2].",
            "Projected growth to USD 70 billion by 2030 at 10% CAGR [^1].",
            "Civil aviation: 85.8% of aviation market, 211 million passengers in 2024 [^5].",
            "Defense production: ₹1,50,590 crore in FY25, up 18% YoY [^4].",
            "Export growth: +284.5%, fastest among top 15 nations [^3].",
            "MRO sector: USD 2.3-3.8B with 90% outsourced [^11].",
            "OEM sourcing: Boeing $1B+, Airbus targeting $2B by 2030 [^20]."
        ],

        investment_thesis: "Compelling growth investment with structural demand drivers, cost competitiveness (15-25% savings) [^15], policy support (₹4L crore defense procurement) [^16], and geopolitical tailwinds [^20]. Fivefold growth to USD 70B by 2030 achievable given 970+ aircraft orders and OEM commitments [^9].",

        market_stats: {
            current_size: 29000000000,
            current_size_display: "$29 Billion",
            forecast_size: 70000000000,
            forecast_size_display: "$70 Billion",
            cagr: 10.0,
            forecast_year: 2030,
            currency: "USD"
        },
        market_structure: {
            total_companies: 850,
            msme_percentage: 45,
            organized_split: { organized: 61, unorganized: 39 },
            geographic_distribution: { "Karnataka": 25, "Telangana": 18, "Maharashtra": 15, "Tamil Nadu": 12, "Gujarat": 8, "Uttar Pradesh": 7, "Others": 15 }
        },

        market_segments: ["Commerical", "Defense", "MRO", "Space"],

        sub_sectors: [
            {
                name: "Commercial Aviation",
                description: "Largest segment at 85.8% share. India operates 713 aircraft currently, projected to reach 1,522 by 2031 [^8].",
                market_size: 15000,
                cagr: 12.21,
                growth_drivers: ["Rising middle class", "Regional connectivity", "Aircraft orders 970+"],
                key_players: ["IndiGo", "Air India", "SpiceJet"],
                msme_opportunity_score: 75,
                citation_ids: ['c5', 'c7', 'c8', 'c9']
            },
            {
                name: "Defense Aerospace",
                description: "Military aircraft, UAVs, weapons systems. 61.1% indigenous production [^10].",
                market_size: 17570,
                cagr: 5.1,
                growth_drivers: ["Indigenization mandates", "Border security", "Export opportunities"],
                key_players: ["HAL", "BEL", "DRDO", "Tata Advanced Systems"],
                msme_opportunity_score: 65,
                citation_ids: ['c4', 'c6', 'c10', 'c16']
            },
            {
                name: "MRO Services",
                description: "90% outsourced currently, targeting 90% self-sufficiency by 2040 [^11].",
                market_size: 3800,
                cagr: 10.3,
                growth_drivers: ["GST reduction to 5%", "Growing fleet", "Government support"],
                key_players: ["Air India Engineering", "GMR Aero Technic", "Air Works"],
                msme_opportunity_score: 85,
                citation_ids: ['c11']
            }
        ],

        growth_drivers: [
            {
                name: "Commercial Aviation Expansion",
                type: "demand_side",
                impact_level: "high",
                description: "India 5th largest aviation market [^8] with 211M passengers. Order book of 970+ aircraft [^9].",
                estimated_impact_percentage: 30,
                citation_ids: ['c5', 'c8', 'c9']
            },
            {
                name: "Defense Indigenization Mandates",
                type: "policy",
                impact_level: "high",
                description: "Positive Indigenisation Lists embargo 346+ items. ₹4L crore contracts 2025-27 [^16].",
                estimated_impact_percentage: 25,
                citation_ids: ['c4', 'c6', 'c10', 'c16']
            }
        ],

        opportunities: [
            {
                title: "MRO Specialized Services",
                type: "service",
                description: "Engine overhaul, landing gear, APU maintenance - 90% currently outsourced [^11].",
                market_size_estimate: 3200,
                overall_score: 8.5,
                capital_requirement: "₹5-20 Cr",
                time_to_market_months: 24,
                citation_ids: ['c11']
            },
            {
                title: "UAV/Drone Manufacturing",
                type: "product",
                description: "Agricultural, surveillance, delivery drones.",
                market_size_estimate: 1800,
                overall_score: 8.0,
                capital_requirement: "₹25-100 Lakhs",
                time_to_market_months: 12
            }
        ],

        policies: [
            {
                name: "Make in India - Aerospace",
                type: "Industrial Policy",
                description: "75% defense capex reserved for domestic industry [^16].",
                impact: "High",
                status: "active",
                citation_ids: ['c16']
            },
            {
                name: "UDAN Scheme",
                type: "Connectivity Policy",
                description: "Regional connectivity targets 120 new destinations carrying 4 crore passengers [^17].",
                impact: "Medium",
                status: "active",
                citation_ids: ['c17']
            },
            {
                name: "MRO GST Reduction",
                type: "Tax Incentive",
                description: "Reduced from 18% to 5% to compete with Singapore/Dubai [^11].",
                impact: "High",
                status: "active",
                citation_ids: ['c11']
            }
        ],

        risks: [
            {
                name: "Technology Dependency",
                category: "technology",
                severity: "high",
                probability: 0.8,
                description: "Dependence on foreign engines and avionics.",
                mitigation: ["Indigenous R&D", "Tech transfer agreements"],
                citation_ids: []
            },
            {
                name: "Capital Intensity",
                category: "financial",
                severity: "high",
                probability: 0.85,
                description: "High capex for facilities and certification.",
                mitigation: ["PLI utilization", "Strategic investors"],
                citation_ids: []
            }
        ],

        competitors: [
            {
                name: "HAL",
                type: "public_sector",
                revenue: 28000,
                market_share: 35,
                key_strengths: ["Government backing", "Monopoly on military aircraft"],
                citation_ids: []
            },
            {
                name: "Tata Advanced Systems",
                type: "private_sector",
                revenue: 9500,
                market_share: 12,
                key_strengths: ["Boeing/Lockheed JVs", "Modern facilities"],
                citation_ids: []
            }
        ],

        market_stats_history: [
            { year: 2023, market_size: 23200, growth_rate: 15 },
            { year: 2024, market_size: 25500, growth_rate: 10, citation_ids: ['c1', 'c2'] },
            { year: 2025, market_size: 29000, growth_rate: 13, citation_ids: ['c1'] },
            { year: 2030, market_size: 70000, growth_rate: 10, citation_ids: ['c1'] }
        ],

        emerging_companies: [
            { id: 'aeq-001', name: 'Aequs Limited', description: 'Precision aerospace manufacturing' },
            { id: 'dyn-001', name: 'Dynamatic Technologies', description: 'Aerostructures and hydraulics' },
            { id: 'taal-001', name: 'Taneja Aerospace', description: 'Aviation structural assemblies' }
        ],

        citations: Object.values(CITATIONS).filter(c => c.id.startsWith('c'))
    },

    "artificial_intelligence": {
        id: "artificial_intelligence",
        display_name: "Artificial Intelligence",
        status: "published",
        research_date: "Jan 17, 2026",

        executive_summary: "India's artificial intelligence market stands at an estimated $7.6-13 billion (₹63,330-1,08,315 crore) in 2024-25, with authoritative projections placing it at $17-22 billion (₹1,45,384 crore) by 2027—the most widely cited industry benchmark from BCG-NASSCOM [^1][^2]. The market is expanding at a compound annual growth rate of 25-42%, among the fastest globally [^3]. With 16% of the world's AI talent (second only to the US) [^4], the world's third-highest AI vibrancy ranking per Stanford University [^19], and a government-backed ₹10,372 crore ($1.25 billion) IndiaAI Mission [^4], India has positioned itself as a significant player in the global AI landscape despite commanding only 5-6% of the global market by revenue.",

        key_findings: [
            "Market size: $7.6-13 billion (₹63,330-1,08,315 crore) in 2024-25 [^1][^2].",
            "Projected: $17-22 billion by 2027 at 25-42% CAGR (BCG-NASSCOM benchmark) [^1][^2].",
            "AI could add $450-500B to GDP by 2025-30, potentially $967B by 2035 [^5][^6].",
            "India holds 16% of global AI talent, ranked 3rd in AI Vibrancy Index [^4][^19].",
            "BFSI leads sectoral adoption at 30.7%, manufacturing 24.6%, healthcare 15.9% [^7].",
            "80% Indian enterprises prioritize AI strategically vs 59% US average [^8].",
            "IndiaAI Mission: ₹10,372 crore over 5 years; 38,000 GPUs secured (3x target) [^4]."
        ],

        investment_thesis: "India's AI sector presents compelling growth investment with structural advantages: (1) Massive talent pool (16% global AI talent, #1 in AI skill penetration), (2) Cost arbitrage in AI services and development, (3) Enterprise adoption rates exceeding global benchmarks (80% vs 59% strategically), (4) Government backing via ₹10,372 crore IndiaAI Mission targeting compute, indigenous models, and skill development. The $450-967 billion GDP contribution projected by 2030-35 would represent transformational economic impact. Key risks include 50-fold compute gap with US, 50% brain drain of top AI talent, and persistent challenge of converting AI experimentation into enterprise-wide deployment.",

        market_stats: {
            current_size: 1083150000000,
            current_size_display: "₹1.08 Lakh Crore",
            forecast_size: 1453840000000,
            forecast_size_display: "₹1.45 Lakh Crore",
            cagr: 35.0,
            forecast_year: 2027,
            currency: 'INR'
        },
        market_structure: {
            total_companies: 5200,
            msme_percentage: 68,
            organized_split: { organized: 78, unorganized: 22 },
            geographic_distribution: { "Karnataka": 35, "Maharashtra": 22, "NCR": 18, "Telangana": 12, "Tamil Nadu": 6, "Others": 7 }
        },
        market_segments: ["Machine Learning", "NLP", "Computer Vision", "Generative AI", "AI Infrastructure"],

        sub_sectors: [
            {
                name: "Machine Learning Platforms",
                description: "ML platforms dominate AI market with enterprise applications.",
                market_size: 5950,
                cagr: 38.5,
                growth_drivers: ["Enterprise adoption", "Predictive analytics", "Automation"],
                key_players: ["TCS", "Infosys", "Wipro", "AWS", "Azure"],
                msme_opportunity_score: 70,
                citation_ids: ['ai3', 'ai10', 'ai13']
            },
            {
                name: "Natural Language Processing",
                description: "Fastest-growing segment with GenAI applications.",
                market_size: 3200,
                cagr: 42.0,
                growth_drivers: ["ChatGPT momentum", "Multilingual India", "Customer service automation"],
                key_players: ["Kore.ai", "Sarvam AI", "OpenAI", "Google"],
                msme_opportunity_score: 75,
                citation_ids: ['ai10', 'ai13']
            },
            {
                name: "Healthcare AI",
                description: "Medical imaging, diagnostics for tier 2/3 cities.",
                market_size: 375,
                cagr: 40.6,
                growth_drivers: ["Doctor shortage", "Diagnostics demand", "Government digitization"],
                key_players: ["Qure.ai", "Niramai", "5C Network", "Tricog"],
                msme_opportunity_score: 85,
                citation_ids: ['ai11']
            },
            {
                name: "Agriculture AI",
                description: "Crop monitoring, yield prediction for 120M+ farmers.",
                market_size: 70,
                cagr: 19.5,
                growth_drivers: ["Farmer income growth", "Climate adaptation", "Precision agriculture"],
                key_players: ["CropIn", "Intello Labs", "Waycool"],
                msme_opportunity_score: 80,
                citation_ids: ['ai16']
            },
            {
                name: "EdTech AI",
                description: "Personalized learning, assessment, adaptive content.",
                market_size: 2800,
                cagr: 28.7,
                growth_drivers: ["Online education growth", "Skill development", "Assessment automation"],
                key_players: ["BYJU'S", "upGrad", "Unacademy", "Vedantu"],
                msme_opportunity_score: 78,
                citation_ids: ['ai17']
            }
        ],

        growth_drivers: [
            {
                name: "Enterprise AI Adoption",
                type: "demand_side",
                impact_level: "high",
                description: "80% enterprises prioritize AI strategically vs 59% globally [^8].",
                estimated_impact_percentage: 30,
                citation_ids: ['ai8', 'ai23']
            },
            {
                name: "IndiaAI Mission & Policy Support",
                type: "policy",
                impact_level: "high",
                description: "₹10,372 crore mission, 38,000 GPUs, indigenous LLMs [^4].",
                estimated_impact_percentage: 25,
                citation_ids: ['ai4']
            },
            {
                name: "Massive Talent Pool",
                type: "supply_side",
                impact_level: "high",
                description: "16% global AI talent, #1 in skill penetration [^19][^21].",
                estimated_impact_percentage: 20,
                citation_ids: ['ai19', 'ai21']
            }
        ],

        opportunities: [
            {
                title: "AI for Bharat Languages",
                type: "product",
                description: "NLP, translation, voice AI for 22+ Indian languages for 1.3B+ non-English speakers.",
                market_size_estimate: 2800,
                overall_score: 8.5,
                capital_requirement: "₹50-500 Cr",
                time_to_market_months: 18,
                citation_ids: ['ai4', 'ai10']
            },
            {
                title: "Healthcare AI Diagnostics",
                type: "product",
                description: "Medical imaging, diagnostics for tier 2/3 cities with doctor shortage.",
                market_size_estimate: 3500,
                overall_score: 8.0,
                capital_requirement: "₹100-1000 Cr",
                time_to_market_months: 24,
                citation_ids: ['ai11']
            },
            {
                title: "Agriculture AI Solutions",
                type: "product",
                description: "Crop monitoring, yield prediction, pest detection for 120M+ farmers.",
                market_size_estimate: 1200,
                overall_score: 7.5,
                capital_requirement: "₹25-300 Cr",
                time_to_market_months: 12,
                citation_ids: ['ai16']
            }
        ],

        policies: [
            {
                name: "IndiaAI Mission",
                type: "Government Initiative",
                description: "₹10,372 crore budget, 38,000 GPUs, focusing on compute and indigenous models.",
                impact: "High",
                status: "active",
                citation_ids: ['ai4']
            },
            {
                name: "Digital India",
                type: "Infrastructure",
                description: "Foundational digital infrastructure enabling AI adoption.",
                impact: "High",
                status: "active",
                citation_ids: []
            }
        ],

        risks: [
            {
                name: "Compute Gap",
                category: "technology",
                severity: "high",
                probability: 0.9,
                description: "50-fold compute gap with US; high GPU costs.",
                mitigation: ["IndiaAI Mission", "Sovereign AI clouds"],
                citation_ids: ['ai20']
            },
            {
                name: "Brain Drain",
                category: "market",
                severity: "high",
                probability: 0.8,
                description: "50% of top AI talent works abroad.",
                mitigation: ["Global capability centers", "Higher domestic wages"],
                citation_ids: ['ai21']
            }
        ],

        competitors: [
            {
                name: "TCS",
                type: "listed",
                revenue: 15600,
                market_share: 12,
                key_strengths: ["Scale", "Global delivery model"],
                citation_ids: []
            },
            {
                name: "Infosys",
                type: "listed",
                revenue: 13000,
                market_share: 10,
                key_strengths: ["AI-first strategy", "Education partnerships"],
                citation_ids: []
            }
        ],

        market_stats_history: [
            { year: 2020, market_size: 42000, growth_rate: 20.0, citation_ids: ['ai3'] },
            { year: 2024, market_size: 108315, growth_rate: 25.0, citation_ids: ['ai2', 'ai3', 'ai21'] },
            { year: 2025, market_size: 122000, growth_rate: 28.0, citation_ids: ['ai1'] },
            { year: 2027, market_size: 145384, growth_rate: 35.0, citation_ids: ['ai1', 'ai2'] },
            { year: 2030, market_size: 385000, growth_rate: 40.0, citation_ids: ['ai3'] }
        ],

        citations: Object.values(CITATIONS).filter(c => c.id.startsWith('ai'))
    },
    'aerospace_supply_chain': {
        id: 'aerospace_supply_chain',
        display_name: 'Aerospace Supply Chain',
        status: 'published',
        research_date: 'Mar 12, 2026',
        executive_summary: "India's aerospace supply chain market is valued at $13.6–16.2 billion (₹1.13–1.35 lakh crore) as of 2024, projected to reach $21.5–29.5 billion by 2030–2033 at a CAGR of 6.4–7.1%. Despite representing only 1–2% of the global aerospace supply chain, India is targeting a tenfold increase to capture 10% by 2033. Major OEMs including Boeing, Airbus, GE Aerospace, and Rolls-Royce have committed to doubling their Indian sourcing, with combined annual procurement already exceeding $5 billion.",
        investment_thesis: "India's aerospace supply chain presents compelling investment with structural advantages: (1) Cost competitiveness of 15-30% over Western suppliers, (2) OEM sourcing commitments from Boeing ($1B+), Airbus ($2B target), GE, Rolls-Royce doubling procurement, (3) Policy support via Defense Industrial Corridors (₹53,439 crore committed), 100% FDI in MRO, indigenization mandates. The sector's transformation from Tier-3 component manufacturing toward Tier-1 systems integration marks a pivotal inflection point.",
        key_findings: [
            'Market size: $13.6-16.2B (₹1.13-1.35 lakh crore) in 2024 [^1][^2]',
            'Projected: $21.5-29.5B by 2030-2033 at 6.4-7.1% CAGR [^1][^2]',
            'Aerostructures: 45.3% market share, strongest segment [^1]',
            'Boeing: $1B+ annual sourcing, Airbus: $2B target by 2030 [^4]',
            'India #1 globally for aerospace cost-effectiveness [^4]',
            'MRO: $2.3-3.8B market, 90% outsourced, 8.9-11.8% CAGR [^7]',
            'Raw material import dependency: 70-80% for aerospace-grade materials'
        ],
        market_stats: {
            current_size: 13500000000,
            current_size_display: "$13.6 Billion",
            forecast_size: 29500000000,
            forecast_size_display: "$29.5 Billion",
            cagr: 7.1,
            forecast_year: 2033,
            currency: 'USD'
        },
        market_structure: {
            total_companies: 580,
            msme_percentage: 62,
            organized_split: { organized: 58, unorganized: 42 },
            geographic_distribution: { "Karnataka": 25, "Telangana": 18, "Maharashtra": 15, "Tamil Nadu": 12, "Gujarat": 8, "Uttar Pradesh": 7, "Others": 15 }
        },
        market_segments: ["Aerostructures", "Avionics", "MRO Services", "Composites", "Software/Engineering"],
        sub_sectors: [
            {
                name: 'Aerostructures Manufacturing',
                description: 'Fuselage sections, wing components, doors at 15-30% cost advantages',
                market_size: 6200,
                cagr: 6.5,
                growth_drivers: ['OEM sourcing expansion', 'Cost competitiveness', 'Export growth'],
                key_players: ['Dynamatic Technologies', 'Tata Advanced Systems', 'Mahindra Aerostructures'],
                msme_opportunity_score: 68,
                citation_ids: ['aero1', 'aero4']
            },
            {
                name: 'Avionics & Electronics',
                description: 'Flight control, radar, navigation. 70% import dependent for advanced systems',
                market_size: 2070,
                cagr: 11.0,
                growth_drivers: ['Indigenous development', 'Military modernization', 'Export restrictions'],
                key_players: ['BEL', 'Data Patterns', 'Centum Electronics'],
                msme_opportunity_score: 55,
                citation_ids: ['aero1', 'aero11']
            },
            {
                name: 'MRO Services & Support',
                description: '90% outsourced, targeting self-sufficiency. GST reduced to 5%',
                market_size: 3770,
                cagr: 9.2,
                growth_drivers: ['GST reduction', 'Growing fleet', '100% FDI', 'Government support'],
                key_players: ['Air India Engineering', 'GMR Aero Technic', 'Air Works'],
                msme_opportunity_score: 82,
                citation_ids: ['aero7', 'aero12']
            },
            {
                name: 'Aerospace Composites',
                description: 'Carbon fiber composites reducing aircraft weight 20-30%',
                market_size: 330,
                cagr: 8.54,
                growth_drivers: ['Weight reduction', 'Fuel efficiency', 'Material advancement'],
                key_players: ['Kineco', 'Tata Advanced Composites', 'Premier Composites'],
                msme_opportunity_score: 72,
                citation_ids: ['aero13']
            },
            {
                name: 'Software & Engineering Services',
                description: 'Embedded systems, design, simulation. Strongest competitive advantage',
                market_size: 1350,
                cagr: 12.5,
                growth_drivers: ['Digital transformation', 'Cost arbitrage', 'Talent availability'],
                key_players: ['TCS', 'Infosys', 'HCL', 'Wipro', 'Cyient'],
                msme_opportunity_score: 75,
                citation_ids: ['aero14']
            }
        ],
        growth_drivers: [
            {
                name: 'OEM Sourcing Expansion',
                type: 'demand_side',
                impact_level: 'high',
                description: 'Boeing, Airbus, Rolls-Royce, GE doubling India sourcing. Boeing: $1B+ current, Airbus: $2B target.',
                estimated_impact_percentage: 30,
                citation_ids: ['aero4', 'aero9']
            },
            {
                name: 'Cost Competitiveness',
                type: 'competitive_advantage',
                impact_level: 'high',
                description: '15-30% manufacturing cost advantage, 10-20% local sourcing savings.',
                estimated_impact_percentage: 25,
                citation_ids: ['aero4', 'aero15']
            },
            {
                name: 'Policy Support & FDI',
                type: 'policy',
                impact_level: 'high',
                description: '100% FDI in MRO, 74% automatic in defense, GST reduction. ₹53,439 crore commitments in corridors.',
                estimated_impact_percentage: 20,
                citation_ids: ['aero15', 'aero16', 'aero17']
            },
            {
                name: 'Export Growth Momentum',
                type: 'market',
                impact_level: 'medium',
                description: '224% export growth in 2024, fastest among major nations. Target: ₹50,000 crore by FY29.',
                estimated_impact_percentage: 15,
                citation_ids: ['aero8', 'aero19']
            }
        ],
        opportunities: [
            {
                title: 'MRO Specialized Services',
                type: 'service',
                description: 'Engine overhaul, landing gear, APU - 90% currently outsourced.',
                market_size_estimate: 3200,
                overall_score: 8.5,
                capital_requirement: '₹500-2000 Cr',
                time_to_market_months: 24,
                citation_ids: ['aero7', 'aero12']
            },
            {
                title: 'Tier-1 Systems Integration',
                type: 'manufacturing',
                description: 'Move from components to complete systems integration for global OEMs.',
                market_size_estimate: 4500,
                overall_score: 7.5,
                capital_requirement: '₹2000-10000 Cr',
                time_to_market_months: 36,
                citation_ids: ['aero4', 'aero10']
            },
            {
                title: 'Aerospace-Grade Materials',
                type: 'manufacturing',
                description: 'Domestic titanium, aluminum, composites - 70-80% import dependent.',
                market_size_estimate: 1500,
                overall_score: 7.0,
                capital_requirement: '₹1000-5000 Cr',
                time_to_market_months: 48,
                citation_ids: ['aero13']
            }
        ],
        policies: [
            {
                name: 'Defense Industrial Corridors',
                type: 'Infrastructure',
                description: 'UP and Tamil Nadu corridors with ₹53,439 crore commitments, 253 MoUs signed.',
                impact: 'High',
                status: 'active',
                citation_ids: ['aero17']
            },
            {
                name: 'MRO FDI Liberalization',
                type: 'FDI Policy',
                description: '100% FDI automatic route for MRO, GST reduced to 5%.',
                impact: 'High',
                status: 'active',
                citation_ids: ['aero15']
            },
            {
                name: 'Space Sector FDI',
                type: 'FDI Policy',
                description: '100% FDI allowed in space sector, fully liberalized.',
                impact: 'Medium',
                status: 'active',
                citation_ids: ['aero16']
            }
        ],
        risks: [
            {
                name: 'Raw Material Import Dependency',
                category: 'market',
                severity: 'high',
                probability: 0.8,
                description: '70-80% dependency on imports for aerospace-grade titanium, aluminum, and specialty steels.',
                mitigation: ['Strategic stockpiling', 'PLI for materials'],
                citation_ids: ['aero13']
            },
            {
                name: 'Talent Shortage',
                category: 'financial',
                severity: 'medium',
                probability: 0.6,
                description: 'Rapid growth outpacing availability of specialized aerospace engineers and technicians.',
                mitigation: ['Skill development partnerships', 'Automation'],
                citation_ids: ['aero14']
            }
        ],
        competitors: [
            {
                name: 'Dynamatic Technologies',
                type: 'listed',
                revenue: 3200,
                market_share: 8,
                key_strengths: ['Hydraulics', 'Aerostructures', 'Global OEM supplier'],
                citation_ids: ['aero1']
            },
            {
                name: 'Tata Advanced Systems',
                type: 'private_sector',
                revenue: 4500,
                market_share: 12,
                key_strengths: ['Systems integration', 'Airbus partnership', 'Defense focus'],
                citation_ids: ['aero1']
            },
            {
                name: 'Mahindra Aerostructures',
                type: 'private_sector',
                revenue: 2800,
                market_share: 5,
                key_strengths: ['Sheet metal parts', 'Assemblies', 'Cost efficiency'],
                citation_ids: ['aero1']
            }
        ],
        market_stats_history: [
            { year: 2020, market_size: 9500000000, growth_rate: 0, citation_ids: ['aero1'] },
            { year: 2024, market_size: 13500000000, growth_rate: 6.8, citation_ids: ['aero1', 'aero2'] },
            { year: 2030, market_size: 18000000000, growth_rate: 6.5, citation_ids: ['aero1'] },
            { year: 2033, market_size: 29500000000, growth_rate: 7.1, citation_ids: ['aero2'] }
        ],
        citations: [
            {
                id: 'aero1', citation_key: 'GVR_2024_aero_parts_mfg', citation_number: 1,
                source_type: 'report', source_name: 'Grand View Research', publication_year: 2024,
                title: 'India Aerospace Parts Manufacturing Market To Reach $21.48Bn By 2030',
                url: 'https://www.grandviewresearch.com/press-release/india-aerospace-parts-manufacturing-market-analysis',
                reliability_score: 9, geographic_focus: ['India'],
                excerpt: 'Aerospace parts manufacturing $13.6B in 2023, $21.48B by 2030 at 6.8% CAGR.'
            },
            {
                id: 'aero2', citation_key: 'IMARC_2024_aircraft_components', citation_number: 2,
                source_type: 'report', source_name: 'IMARC Group', publication_year: 2024,
                title: 'India Aircraft Components Market Size, Share | Report 2033',
                url: 'https://www.imarcgroup.com/india-aircraft-components-market',
                reliability_score: 8, geographic_focus: ['India'],
                excerpt: 'Aircraft components market USD 16.22B in 2024, $29.5B by 2033.'
            },
            {
                id: 'aero3', citation_key: 'AviationA2Z_2025_global_hub', citation_number: 3,
                source_type: 'industry', source_name: 'Aviation A2Z', publication_year: 2025,
                title: 'India is Becoming a Global Aerospace Hub',
                url: 'https://aviationa2z.com/index.php/2025/10/23/india-is-becoming-a-global-aerospace-hub/',
                reliability_score: 7, geographic_focus: ['India', 'Global'],
                excerpt: 'India targeting 10% of $250B global aerospace supply chain by 2033.'
            },
            {
                id: 'aero4', citation_key: 'BizStd_2025_supply_chain', citation_number: 4,
                source_type: 'news', source_name: 'Business Standard', publication_year: 2025,
                title: 'Global aerospace firms turn to India amid Western supply chain crisis',
                url: 'https://www.business-standard.com/external-affairs-defence-security/news/global-aerospace-firms-turn-to-india-amid-western-supply-chain-crisis-125021700469_1.html',
                reliability_score: 8, geographic_focus: ['India', 'Global'],
                excerpt: 'Boeing $1B+ sourcing, Airbus $2B target, 15-30% cost advantages.'
            },
            {
                id: 'aero5', citation_key: 'Secretariat_2024_aero_mfg', citation_number: 5,
                source_type: 'news', source_name: 'The Secretariat News', publication_year: 2024,
                title: 'Indian Aerospace Manufacturing On The Rise',
                url: 'https://thesecretariat.in/article/indian-aerospace-manufacturing-on-the-rise',
                reliability_score: 7, geographic_focus: ['India'],
                excerpt: 'India 1-2% global supply chain, 1,700+ aircraft on order.'
            },
            {
                id: 'aero6', citation_key: 'IBEF_2024_defence_mfg', citation_number: 6,
                source_type: 'government', source_name: 'IBEF', publication_year: 2024,
                title: 'India\'s Defence Manufacturing Industry Revolutionizing Exports',
                url: 'https://www.ibef.org/industry/defence-manufacturing',
                reliability_score: 9, geographic_focus: ['India'],
                excerpt: 'Defence production ₹1,50,590 crore FY25, 90% increase from FY20.'
            },
            {
                id: 'aero7', citation_key: 'IBEF_2024_mro', citation_number: 7,
                source_type: 'government', source_name: 'IBEF', publication_year: 2024,
                title: 'India\'s MRO Industry: Future Trends & Growth Opportunities',
                url: 'https://www.ibef.org/blogs/the-future-of-the-mro-industry-in-india-trends-and-opportunities',
                reliability_score: 9, geographic_focus: ['India'],
                excerpt: 'MRO $2.3-3.8B, 90% outsourced, targeting $4B by 2030.'
            },
            {
                id: 'aero8', citation_key: 'VisionIAS_2025_defence_exports', citation_number: 8,
                source_type: 'education', source_name: 'Vision IAS', publication_year: 2025,
                title: 'India\'s Defence Exports',
                url: 'https://visionias.in/current-affairs/monthly-magazine/2025-05-17/security/indias-defence-exports-1',
                reliability_score: 8, geographic_focus: ['India'],
                excerpt: 'Defence exports ₹23,622 crore FY25, 31-fold increase since FY14.'
            },
            {
                id: 'aero9', citation_key: 'AAW_2024_indian_firms', citation_number: 9,
                source_type: 'news', source_name: 'All Around Worlds', publication_year: 2024,
                title: 'Indian Firms Gaining Ground on Global Aerospace Giants',
                url: 'https://www.allaroundworlds.com/indian-firms-are-gaining/',
                reliability_score: 7, geographic_focus: ['India'],
                excerpt: 'Rolls-Royce: India "best cost market", doubling sourcing by 2030.'
            },
            {
                id: 'aero10', citation_key: 'MarketUS_2024_aero_parts', citation_number: 10,
                source_type: 'report', source_name: 'Market.us', publication_year: 2024,
                title: 'Aerospace Parts Manufacturing Market Size | CAGR of 5.5%',
                url: 'https://market.us/report/aerospace-parts-manufacturing-market/',
                reliability_score: 8, geographic_focus: ['India', 'Global'],
                excerpt: 'India between Tier-2 and Tier-3 supply chain capability.'
            },
            {
                id: 'aero11', citation_key: 'IntelMR_2024_embedded_eng', citation_number: 11,
                source_type: 'report', source_name: 'Intel Market Research', publication_year: 2024,
                title: 'Embedded Engineering Service Market Outlook 2025-2032',
                url: 'https://www.intelmarketresearch.com/embedded-engineering-service-market-7661',
                reliability_score: 7, geographic_focus: ['India'],
                excerpt: 'Military embedded systems $44.7M in 2024, $75.9M by 2030.'
            },
            {
                id: 'aero12', citation_key: 'Mordor_2024_india_ADS', citation_number: 12,
                source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2024,
                title: 'India Aviation, Defense, And Space Market Size & Share Analysis',
                url: 'https://www.mordorintelligence.com/industry-reports/india-aviation-defense-and-space-market',
                reliability_score: 8, geographic_focus: ['India'],
                excerpt: 'New MRO facilities: Safran Hyderabad ₹1,500 crore opening 2026.'
            },
            {
                id: 'aero13', citation_key: 'IMARC_2024_aero_composites', citation_number: 13,
                source_type: 'report', source_name: 'IMARC Group', publication_year: 2024,
                title: 'India Aerospace Composites Market Size, Share | 2033',
                url: 'https://www.imarcgroup.com/india-aerospace-composites-market',
                reliability_score: 8, geographic_focus: ['India'],
                excerpt: 'Aerospace composites $330.2M in 2024, $690.6M by 2033 at 8.54% CAGR.'
            },
            {
                id: 'aero14', citation_key: 'UJA_2024_indian_aerospace', citation_number: 14,
                source_type: 'industry', source_name: 'UJA', publication_year: 2024,
                title: 'Indian Aerospace Industry: Market Dynamics, Opportunities',
                url: 'https://uja.in/discover/the-indian-aerospace-industry/',
                reliability_score: 7, geographic_focus: ['India'],
                excerpt: 'GE Aerospace Bangalore: 6,000+ researchers, 1,000+ aviation patents.'
            },
            {
                id: 'aero15', citation_key: 'ITA_2024_india_AD', citation_number: 15,
                source_type: 'government', source_name: 'International Trade Administration', publication_year: 2024,
                title: 'India - Aerospace and Defense',
                url: 'https://www.trade.gov/country-commercial-guides/india-aerospace-and-defense',
                reliability_score: 10, geographic_focus: ['India'],
                excerpt: '74% FDI automatic, 100% for MRO; cost advantages 15-30%.'
            },
            {
                id: 'aero16', citation_key: 'UNCTAD_2024_fdi_space', citation_number: 16,
                source_type: 'government', source_name: 'UNCTAD Investment Policy Hub', publication_year: 2024,
                title: 'India - Allowed up to 100 per cent FDI in the space sector',
                url: 'https://investmentpolicy.unctad.org/investment-policy-monitor/measures/4590/',
                reliability_score: 10, geographic_focus: ['India'],
                excerpt: 'Space sector FDI fully liberalized February 2024.'
            },
            {
                id: 'aero17', citation_key: 'Mordor_2024_india_defense', citation_number: 17,
                source_type: 'report', source_name: 'Mordor Intelligence', publication_year: 2024,
                title: 'India Defense Market Size, Analysis & Global Report 2030',
                url: 'https://www.mordorintelligence.com/industry-reports/india-defense-market',
                reliability_score: 8, geographic_focus: ['India'],
                excerpt: 'UP Defence Corridor: ₹28,475 crore committed, 62 MoUs signed.'
            },
            {
                id: 'aero18', citation_key: 'Brigade_2024_devanahalli', citation_number: 18,
                source_type: 'industry', source_name: 'Brigade Group', publication_year: 2024,
                title: 'How Devanahalli is emerging as a major commercial hub of Bengaluru',
                url: 'https://www.brigadegroup.com/blog/general/how-devanahalli-is-emerging-as-a-major-commercial-hub-of-bengaluru',
                reliability_score: 7, geographic_focus: ['India', 'Karnataka'],
                excerpt: 'Karnataka: 25% aerospace industry, 67% defense aircraft, 65% exports.'
            },
            {
                id: 'aero19', citation_key: 'Yahoo_2025_aero_supply', citation_number: 19,
                source_type: 'news', source_name: 'Yahoo Finance', publication_year: 2025,
                title: 'Global aerospace firms turn to India amid Western supply chain crisis',
                url: 'https://uk.finance.yahoo.com/news/global-aerospace-firms-turn-india-091155305.html',
                reliability_score: 7, geographic_focus: ['India', 'Global'],
                excerpt: '224% export growth in 2024, OEM commitments totaling billions.'
            }
        ]
    },
    'automation': {
        id: 'automation',
        display_name: 'Industrial Automation & Robotics',
        status: 'published',
        research_date: '2026-04-06',
        executive_summary: 'India is witnessing a significant shift in industrial automation, moving from manual processes to AI-driven robotic precision. This transition is critical for MSMEs to remain competitive in global supply chains.',
        investment_thesis: 'The investment opportunity in India\'s automation sector is driven by the "China+1" strategy, labor shortages in high-precision manufacturing, and the rapid indigenization of defense and marine robotics. Tier-II hubs like Nagpur are becoming the new frontier for affordable, high-growth automation startups.',
        key_findings: [
            'India robot density (7/10k) is far below global averages, representing a massive untapped TAM.',
            'OEE (Overall Equipment Effectiveness) is becoming the primary KPI for export-oriented MSMEs.',
            'Indigenous production of 6-axis robotic arms is reducing CapEx for small manufacturing units by 30-40%.'
        ],
        market_stats: {
            current_size: 1360, // in Cr (approx $13.6B)
            current_size_display: 'USD 13.6B (2023)',
            forecast_size: 2148, 
            forecast_size_display: 'USD 21.48B (2030)',
            cagr: 39.0,
            forecast_year: 2030,
            currency: 'INR'
        },
        market_structure: {
            total_companies: 2500,
            msme_percentage: 92,
            organized_split: { organized: 35, unorganized: 65 },
            geographic_distribution: { "Pune-Mumbai": 45, "Nagpur": 15, "Chennai": 15, "Ahmedabad": 10, "Others": 15 }
        },
        market_segments: ["Industrial Robotics", "PLC/SCADA Systems", "Machine Vision", "Marine Robotics", "Food Automation"],
        sub_sectors: [
            {
                name: "Industrial Robotics",
                description: "6-axis articulated arms and SCARA robots for assembly and welding.",
                market_size: 450,
                cagr: 32.0,
                growth_drivers: ["Automotive manufacturing surge", "Low robot density"],
                key_players: ["Ashta Tech", "Kuka India", "Yaskawa"],
                msme_opportunity_score: 88,
                citation_ids: ['auto2']
            },
            {
                name: "Marine & Defense Robotics",
                description: "Underwater drones and autonomous systems for inspection and tactical use.",
                market_size: 120,
                cagr: 45.0,
                growth_drivers: ["Self-reliance in defense (Aatmanirbhar Bharat)", "Port security"],
                key_players: ["Ashta Tech (Jalayantrika)", "EyeROV"],
                msme_opportunity_score: 92,
                citation_ids: ['c4', 'c16']
            }
        ],
        growth_drivers: [
            { name: "OEE Imperatives", type: "technology", impact_level: "high", description: "Mandatory efficiency benchmarks for global supply chain integration." },
            { name: "Labor Arbitration", type: "demand_side", impact_level: "high", description: "Rising costs and shortage of skilled precision welders." }
        ],
        opportunities: [
            { title: "SME-Native Robotic Arms", type: "manufacturing", description: "Low-payload, affordable robots for small units.", market_size_estimate: 500, overall_score: 9.2, capital_requirement: "1-2 Cr", time_to_market_months: 18 }
        ],
        policies: [
            { name: "Production Linked Incentive (PLI)", type: "policy", description: "Incentives for domestic robot manufacturing.", impact: "High", status: "active" }
        ],
        risks: [
            { name: "High Integration Costs", category: "financial", severity: "high", probability: 0.6, description: "Total cost of ownership often exceeds device cost for SMEs." }
        ],
        competitors: [
            { name: "Kuka India", type: "private_sector", revenue: 250, market_share: 12, key_strengths: ["Global legacy", "Strong service network"] }
        ],
        market_stats_history: [
            { year: 2020, market_size: 800, growth_rate: 0 },
            { year: 2023, market_size: 1360, growth_rate: 25.0 }
        ],
        citations: [
            {
                id: 'auto1', citation_key: 'NASSCOM_2024_industry4', citation_number: 1,
                source_type: 'industry', source_name: 'NASSCOM', publication_year: 2024,
                title: 'Industry 4.0 in India: The Automation Inflection',
                url: 'https://nasscom.in',
                reliability_score: 9, geographic_focus: ['India'],
                excerpt: 'India automation market to reach $17B by 2027, driven by 39% GenAI/IoT integration.'
            },
            {
                id: 'auto2', citation_key: 'IFR_2024_robot_density', citation_number: 2,
                source_type: 'report', source_name: 'International Federation of Robotics', publication_year: 2024,
                title: 'World Robotics Report 2024: India Focus',
                url: 'https://ifr.org',
                reliability_score: 10, geographic_focus: ['India', 'Global'],
                excerpt: 'India robot density currently 7 per 10,000 workers; target 50 by 2030.'
            }
        ]
    },
    "manufacturing-engineering-nagpur": {
        id: "manufacturing-engineering-nagpur",
        display_name: "Manufacturing & Engineering",
        region: "Nagpur & Vidarbha",
        status: "published",
        research_date: "2026-04-06",
        executive_summary: "Nagpur/Vidarbha is at an industrial inflection point with ₹1.5+ lakh crore in committed manufacturing investments across defence, automotive, solar, and steel. The region hosts 3,000-12,000+ engineering MSMEs across three major MIDC estates (Butibori, Hingna, Kalmeshwar) and MIHAN aerospace SEZ, yet remains in a pre-digital manufacturing stage with CNC penetration at 50-80 shops, ERP adoption below 20%, and ISO certification under 10%. The chasm between Boeing-grade composites at MIHAN and manually-operated job shops creates the central automation opportunity.",
        key_findings: [
            "₹1.95 lakh crore in proposals for Additional Butibori MIDC expansion alone, with 15 companies already allotted land (₹1.16 lakh crore, 35,000 jobs)",
            "Solar Defence & Aerospace breaking ground on ₹12,700 crore UAV/robotics facility at MIHAN (10,000 drones, 1,000 robotic systems annually)",
            "Mahindra announcing ₹15,000 crore integrated auto+tractor plant (1,500 acres, 5 lakh vehicles + 1 lakh tractors annually from ~2028)",
            "WCL maintains 685+ registered vendors in Nagpur area - stable PSU demand anchor",
            "Only 50-80 CNC-capable shops across entire district vs. thousands in Pune",
            "ERP adoption estimated at 10-20%, MES adoption near-zero outside handful of medium enterprises",
            "ISO certification rates at 5-10% - major barrier to defence/aerospace supply chain entry"
        ],
        investment_thesis: "The 'Anchor-MSME Gap' thesis. Massive tier-1 investments (Solar ₹12,700 Cr, Mahindra ₹15,000 Cr, Adani ₹70,000 Cr, TASL, DRAL) are creating unprecedented demand for precision manufacturing, but local MSME technology readiness is 5-10 years behind. Without rapid digital/quality upgradation, anchor plants will source from Pune/Gujarat, and the investment wave becomes isolated enclaves rather than an integrated ecosystem. The intervention window is 2026-2030.",
        market_stats: {
            current_size: 150000000000000,
            current_size_display: "₹1.5+ Lakh Crore (Committed 2024-2030)",
            forecast_size: 195000000000000,
            forecast_size_display: "₹1.95 Lakh Crore (Additional Butibori)",
            cagr: 15.0,
            forecast_year: 2030,
            currency: "INR"
        },
        market_structure: {
            total_companies: 12000,
            msme_percentage: 95,
            organized_split: { organized: 10, unorganized: 90 },
            geographic_distribution: {
                "Butibori MIDC": 45,
                "Hingna MIDC": 30,
                "Kalmeshwar MIDC": 10,
                "MIHAN SEZ": 5,
                "City/Other": 10
            }
        },
        market_segments: ["Aerospace & Defence", "Heavy Engineering", "Auto Components", "Electrical Equipment", "Steel Processing", "Mining Supplies"],
        sub_sectors: [
            {
                name: "Heavy Engineering & Fabrication",
                description: "Transmission towers, pressure vessels, mining equipment serving power and infra.",
                market_size: 30000,
                cagr: 8.5,
                growth_drivers: ["BHEL/NTPC demand", "Mining expansion"],
                key_players: ["KEC International", "Metalfab Hightech", "Jayaswal NECO"],
                msme_opportunity_score: 88,
                citation_ids: []
            },
            {
                name: "Aerospace & Defence",
                description: "Aircraft components, UAVs, ammunition at MIHAN SEZ.",
                market_size: 27000,
                cagr: 25.0,
                growth_drivers: ["Atmanirbhar Bharat", "Solar Defence facility"],
                key_players: ["Solar Defence", "TASL", "DRAL"],
                msme_opportunity_score: 95,
                citation_ids: ['ngp_9']
            },
             {
                name: "Automotive Components",
                description: "Vehicle and tractor manufacturing tier-2/3 supply chain.",
                market_size: 15000,
                cagr: 22.0,
                growth_drivers: ["Mahindra Mega Plant 2028"],
                key_players: ["Mahindra & Mahindra", "JMD Precision"],
                msme_opportunity_score: 82,
                citation_ids: ['ngp_10']
            }
        ],
        growth_drivers: [
            { name: "Maharashtra MIISP 2025 Policy", type: "policy", impact_level: "high", description: "100% SGST reimbursement and power subsidies for Vidarbha.", citation_ids: ['ngp_15'] },
            { name: "Defence Corridor Designation", type: "policy", impact_level: "high", description: "Dedicated aerospace/defence manufacturing incentives." },
            { name: "Industrial Corridor Convergence", type: "infrastructure", impact_level: "high", description: "Samruddhi Expressway and high-speed rail convergence." }
        ],
        risks: [
            { name: "MSME Technology Readiness Gap", category: "capability", severity: "high", probability: 0.85, description: "Low CNC/ERP penetration blocking tier-1 supply chain entry." },
            { name: "Skilled Workforce Shortage", category: "market", severity: "high", probability: 0.75, description: "Academic training inadequate for modern robotic manufacturing." }
        ],
        opportunities: [
            { title: "SME-Native Robotic Arms", type: "manufacturing", description: "Low-payload, affordable robots for small units.", market_size_estimate: 500, overall_score: 9.2, capital_requirement: "1-2 Cr", time_to_market_months: 18 },
            { title: "Digital Quality Infrastructure", type: "service", description: "AS9100/NADCAP compliance as a service.", market_size_estimate: 250, overall_score: 8.8, capital_requirement: "25-50L", time_to_market_months: 12 }
        ],
        policies: [
            { name: "Maharashtra MIISP 2025", type: "policy", description: "Industrial policy with Vidarbha incentives.", impact: "High", status: "active" }
        ],
        competitors: [],
        market_stats_history: [],
        quality_infrastructure: {
            nabl_labs: ["Nilawar Laboratories", "Cema Testing Laboratory", "MSEDCL Nagpur Lab"],
            calibration_services: "IDEMI Extension Centre Nagpur",
            cfcs: ["MIA Hingna Innovation Facilitation Centre", "NIRMAN CFC (proposed)"],
            gaps: ["No dedicated Central Tool Room in region", "No SAMARTH Udyog experience centre"]
        },
        training_infrastructure: {
            premier_institutions: ["VNIT Nagpur", "IIM Nagpur", "AIIMS Nagpur"],
            siemens_coe_vnit: {
                investment: "₹187 Crore",
                labs: 11,
                coverage: ["CNC", "Robotics", "Smart Manufacturing", "IoT"]
            },
            vedic_training_centre: "VDIA/Tata Technologies aerospace capability building",
            itis: ["Government ITI Nagpur", "Government ITI (Women) Nagpur"]
        },
        industry_associations: [
            { name: "Vidarbha Industries Association (VIA)", founded: 1964, role: "Premier regional industry body" },
            { name: "MIA Nagpur", members: 500, role: "Hingna MIDC representation and innovation partner" },
            { name: "VDIA", role: "Defence/aerospace MSME positioning" }
        ],
        citations: [
            CITATIONS['ngp_1'], CITATIONS['ngp_2'], CITATIONS['ngp_3'], CITATIONS['ngp_6'], CITATIONS['ngp_7'], 
            CITATIONS['ngp_9'], CITATIONS['ngp_10'], CITATIONS['ngp_13'], CITATIONS['ngp_14'], CITATIONS['ngp_15']
        ]
    }
};

export function getSectorThesis(id: string): SectorThesis | null {
    // Alias Nagpur sectors to the regional overarching manufacturing thesis
    const nagpurSectors = [
        'aerospace-defence', 
        'heavy-engineering', 
        'electrical-transformers', 
        'mining-equipment', 
        'automotive-components', 
        'light-engineering-cnc', 
        'solar-components', 
        'textiles-wardha', 
        'it-logistics-multimodal', 
        'agri-processing'
    ];
    
    if (nagpurSectors.includes(id)) {
        return SECTOR_THESES['manufacturing-engineering-nagpur'] || null;
    }
    
    return SECTOR_THESES[id] || null;
}
