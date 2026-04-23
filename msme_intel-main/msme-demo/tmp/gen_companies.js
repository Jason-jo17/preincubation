
const companies = [
  { id: "company-ashta-001", name: "Ashta Tech Automation Pvt. Ltd.", sector: "automation", sub_sector: "Industrial Robotics", challenge_id: "challenge-nag-001" },
  { id: "company-open-002", name: "Open Category", sector: "general_engineering", sub_sector: "Multi-sector MSME", challenge_id: "challenge-nag-002" },
  { id: "company-beta-003", name: "Beta Computronics Pvt. Ltd.", sector: "automation", sub_sector: "Industrial Electronics", challenge_id: "challenge-nag-003" },
  { id: "company-jaiswal-004", name: "Jaiswal Steel Processing", sector: "steel_processing", sub_sector: "Hot & Cold Rolling", challenge_id: "challenge-nag-004" },
  { id: "company-suraj-005", name: "Suraj Informatics", sector: "it_logistics", sub_sector: "Industrial IoT", challenge_id: "challenge-nag-005" },
  { id: "company-unnat-006", name: "Unnat Agro Innovation", sector: "agri_processing", sub_sector: "Post-harvest tech", challenge_id: "challenge-nag-006" },
  { id: "company-precision-007", name: "Precision Machining Systems", sector: "manufacturing", sub_sector: "CNC Machining", challenge_id: "challenge-nag-007" },
  { id: "company-vidarbha-008", name: "Vidarbha Solar Solutions", sector: "energy", sub_sector: "Solar PV Assemblies", challenge_id: "challenge-nag-008" },
  { id: "company-composite-009", name: "Composite Engineering Works", sector: "aerospace", sub_sector: "FRP & Carbon Fiber", challenge_id: "challenge-nag-009" },
  { id: "company-digit-010", name: "DigitAll Solutions", sector: "it_logistics", sub_sector: "ERP Implementation", challenge_id: "challenge-nag-010" },
  { id: "company-eco-011", name: "EcoBriquette Systems", sector: "energy", sub_sector: "Waste-to-Energy", challenge_id: "challenge-nag-011" },
  { id: "company-flow-012", name: "Flow Control Systems", sector: "heavy_engineering", sub_sector: "Valve & Pump Mfg", challenge_id: "challenge-nag-012" },
  { id: "company-heavy-013", name: "Heavy Fabrication Unit", sector: "heavy_engineering", sub_sector: "Structural Steel", challenge_id: "challenge-nag-013" }
];

const generated = companies.map(c => `
    // NAGPUR NEXT: ${c.name}
    {
        id: '${c.id}',
        name: '${c.name}',
        legal_name: '${c.name}',
        sector: '${c.sector}',
        sub_sector: '${c.sub_sector}',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        stage: 'growth',
        current_stage: 4,
        rag_status: 'amber',
        overall_score: 65,
        regional_context: {
            region_name: 'Nagpur & Vidarbha',
            hub_type: 'Manufacturing & Engineering',
            correlation_score: 0.85
        },
        challenges: [
            {
                id: '${c.challenge_id}',
                title: 'Nagpur NEXT Innovation Challenge',
                description: 'Participating in the regional MSME innovation challenge for ${c.sub_sector} optimization.',
                status: 'published',
                category: 'Digital Transformation',
                associated_program_id: 'nagpur-next-2026'
            }
        ]
    }`).join(',\n');

const fs = require('fs');
fs.writeFileSync('tmp/companies_output.txt', generated);
console.log('Generated 13 companies to tmp/companies_output.txt');
