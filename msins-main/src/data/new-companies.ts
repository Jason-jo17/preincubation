export const NEW_COMPANIES = [
  {
    "id": "ata-001",
    "name": "Ashta Tech Automation",
    "slug": "ashta-tech-automation",
    "legal_name": "Ashta Tech Automation Private Limited",
    "sector": "manufacturing_automation",
    "sub_sector": "Industrial Robotics & SPM",
    "stage": "growth",
    "current_stage": 4,
    "rag_status": "amber",
    "overall_score": 68,
    "market_cap": "₹25Cr (Estimated)",
    "cin": "U74999MH2016PTC164888",
    "gstin": "27AAICA1234A1Z1",
    "incorporation_date": "2016-06-08",
    "registered_address": "FL NO 3J-31, SNO 109/110, Aditya Garden City PH3/4, Pune 411058",
    "operational_address": "A12, Hingna-Wadi Road, Hingna MIDC, Nagpur 440016",
    "website": "https://www.ashtatech.com",
    "financials": [
      {
        "fiscal_year": "FY2023-24",
        "revenue": 5.27,
        "revenue_growth_yoy": 205.0,
        "ebitda_growth_yoy": 271.0,
        "net_profit": 0.42,
        "net_worth": 3.8,
        "confidence": "high",
        "segment_breakdown": {
          "industrial_automation": 40,
          "food_processing": 25,
          "defense_marine": 20,
          "education_training": 15
        }
      }
    ],
    "charges": [
      {
        "charge_holder": "State Bank of India",
        "amount": 0.499,
        "date_created": "2023-03-01",
        "date_modified": "2024-02-01",
        "status": "open",
        "type": "working_capital"
      }
    ],
    "roadmap": {
      "vision": "To become the leading indigenous provider of low-cost industrial robotics in Central India.",
      "phases": [
        { "phase": "Phase 1: Foundation", "status": "completed", "timeline": "Q1-Q2 2024", "goal": "Stabilize Nagpur production line." },
        { "phase": "Phase 2: R&D Tech", "status": "current", "timeline": "Q3 2024 - Q1 2025", "goal": "Integrate AI-vision into standard SPM units." },
        { "phase": "Phase 3: Scale", "status": "upcoming", "timeline": "2025+", "goal": "Expand footprint to Pune/Mumbai aerospace cluster." }
      ]
    },
    "challenges": {
      "technical": ["Lack of standardized ISO 27001 certification for data security", "Narrow AI-vision integration capability"],
      "financial": ["High working capital cycle (120 days)", "Limited access to low-interest CAPEX loans"],
      "regulatory": ["BIPM standards compliance for export precision"],
      "problem_statements": [
        "How might we develop a smart scheduling and monitoring system that optimizes production workflows and reduces idle time on the shopfloor?",
        "Addressing the 60% revenue dependency on a single Tier-1 automotive client."
      ]
    },
    "client_demographics": {
      "sector_split": [
        { "sector": "Automotive Tier 1", "percentage": 60 },
        { "sector": "Defence Components", "percentage": 25 },
        { "sector": "General Engineering", "percentage": 15 }
      ],
      "concentration_risk": "High (Top 2 clients = 75% Rev)"
    },
    "clients": [
      { "name": "Haldiram's", "status": "Active", "type": "Strategic Partner" },
      { "name": "Hindustan Unilever (HUL)", "status": "Active", "type": "Client" },
      { "name": "Mahindra & Mahindra", "status": "Active", "type": "Strategic Partner" }
    ],
    "gap_analysis": {
      "overall_gap_score": 72,
      "investment_readiness": "High",
      "critical_gaps": [
        "Lack of standardized ISO 27001 certification for data security",
        "No documented succession plan for founders",
        "CFO and COO roles vacant"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 8, "rag": "green", "rationale": "High demand for low-cost SPM in Vidarbha region." },
        "innovation": { "score": 7, "rag": "amber", "rationale": "Strong in mechanical SPM, catching up in AI-vision integration." },
        "supply_chain": { "score": 6, "rag": "amber", "rationale": "Dependent on imported controllers from Fanuc/Siemens." },
        "digital_maturity": { "score": 5, "rag": "amber", "rationale": "Legacy ERP usage. No real-time shop floor data." }
      }
    },
    "leadership": {
      "founders": [
        { "name": "Harshad Mukund Wasule", "role": "Technical Director", "linkedin": "https://www.linkedin.com/in/harshad-wasule/", "expertise": ["PLC Integration", "AI/Vision Systems"] },
        { "name": "Rohit Narendra Shende", "role": "CEO & Co-Founder", "linkedin": "https://www.linkedin.com/in/rohit-shende-88331266/" }
      ],
      "leadership": [
        { "name": "Sudhir W.", "role": "Head of Operations" },
        { "name": "Er. Vijay Taiwade", "role": "Head of R&D" }
      ],
      "board": ["Independent Advisor (TBD)"]
    },
    "talent": {
      "headcount": 45,
      "rd_staff": 8,
      "tech_stack": ["SOLIDWORKS", "PLC Programming", "Python (AI)", "KUKA Systems"],
      "retention_rate": "85%"
    },
    "brand": {
      "awards": ["Nagpur Innovation Challenge Winner", "iDEX Shortlist", "Oslo Innovation Week Representation"],
      "certifications": ["MSME ZED Bronze", "ISO 9001 (Planned)"],
      "sentiment": "Strong local reputation for mechanical robustness."
    },
    "products": [
      { "name": "BR-Prima", "description": "6-Axis Articulated Robotic Arm (Indigenous).", "status": "In Production" },
      { "name": "Kaju Katli Ultrasonic Cutter", "description": "Vision-guided high-speed cutter for Haldiram's.", "status": "Flagship" },
      { "name": "Jalayantrika", "description": "Underwater Drone for defense inspection.", "status": "Top 20 Incubated" }
    ],
    "innovation": {
      "patents": 2,
      "rd_investment": "12% of Revenue",
      "new_product_pipeline": ["Cobot Integration for small-batch assembly"]
    },
    "mosi_sessions": [
      { "id": "sep-2024", "title": "Strategic Tech Audit", "date": "2024-09-12", "findings": "Need for better digital twin integration." }
    ],
    "oee_improvement_roadmap": {
      "current_estimated_oee": 55,
      "target_oee": 85,
      "phases": [
        { "phase": 1, "name": "Digital Visibility", "duration_months": "6", "target_oee": 65, "activities": ["IoT sensor deployment", "Real-time downtime logging"] }
      ],
      "expected_benefits": {
        "cost_savings_percent": 18,
        "downtime_reduction_percent": 35
      }
    },
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Manufacturing & Logistics Hub",
      "correlation_score": 0.88,
      "sector_synergies": ["Defence Corridor", "Automotive", "Textile Maintenance"]
    },
    "benchmark_msme": {
      "peer_comparison": "Top 10% in mechanical precision; bottom 30% in digital integration.",
      "solution_mappings": ["Upgrade to cloud-native ERP", "Implement predictive maintenance on own SPM units"]
    }
  },
  {
    "id": "beta-comp-001",
    "name": "Beta Computronics Pvt. Ltd.",
    "slug": "beta-computronics",
    "legal_name": "Beta Computronics Private Limited",
    "sector": "industrial_electronics",
    "sub_sector": "Embedded Systems & Industrial Automation",
    "stage": "mature_sme",
    "current_stage": 4,
    "rag_status": "amber",
    "overall_score": 52,
    "cin": "U32109MH1999PTC122162",
    "gstin": "27AABCB2022R1ZN",
    "incorporation_date": "1999-12-12",
    "registered_address": "10/1, IT Park, Parsodi, South Ambazari Road, Nagpur 440022",
    "operational_address": "10/1, IT Park, Parsodi, South Ambazari Road, Nagpur 440022",
    "website": "https://www.betacomp.com",
    "financials": [
      {
        "fiscal_year": "FY2023-24",
        "revenue": 25.0,
        "confidence": "low",
        "segment_breakdown": {
          "woven_sack_electronics": 60,
          "water_treatment": 20,
          "industrial_automation": 15,
          "other": 5
        }
      }
    ],
    "roadmap": {
      "vision": "Transition from bespoke embedded systems to standardized Industrial IoT platforms.",
      "phases": [
        { "phase": "Phase 1: Precision Control", "status": "completed", "timeline": "2010-2020", "goal": "Dominate woven sack automation niche." },
        { "phase": "Phase 2: IoT Pivot", "status": "current", "timeline": "2024+", "goal": "Deploy wireless production monitoring dashboards." }
      ]
    },
    "challenges": {
      "technical": [
        "High-speed precision control for circular looms",
        "Sensor integration for vision-based inspection"
      ],
      "financial": [
        "Unfiled balance sheets since FY2018-19",
        "High reliance on internal accruals for R&D"
      ],
      "problem_statements": [
        "How might we design a precision winding control system with closed-loop tension control and vision-based quality inspection?",
        "Addressing the high succession risk given the senior founder age (~70)."
      ]
    },
    "gap_analysis": {
      "overall_gap_score": 52,
      "investment_readiness": "Caution",
      "critical_gaps": [
        "CATEGORY MISMATCH: Identified as transformer maker, actually industrial electronics.",
        "No succession plan for senior founder (age ~70)",
        "Zero independent directors on all-family board",
        "No balance sheet filed since FY2018-19 (verified gap)"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 3, "rag": "amber", "rationale": "Niche player in woven sack sector; limited competition data." },
        "innovation": { "score": 6, "rag": "amber", "rationale": "Strong embedded DNA but no patents filed." },
        "leadership": { "score": 4, "rag": "red", "rationale": "100% family board with zero independence." }
      }
    },
    "leadership": {
      "founders": [
        { "name": "Mukund S. Deshmukh", "role": "Technical Director", "education": "B.E. Electrical (COEP Pune, 1978)" },
        { "name": "Sandeep V. Darwhekar", "role": "Director", "education": "B.E. Electronics (YCCE Nagpur, 1989)" }
      ],
      "leadership": [
        { "name": "Minal Darwhekar", "role": "Director (Marketing)" }
      ],
      "board": ["Mukund Deshmukh", "Sandeep Darwhekar", "Madhuri Deshmukh", "Amruta Deshmukh"]
    },
    "talent": {
      "headcount": 35,
      "key_skills": ["Embedded C", "PLC Programming", "VFD Design"]
    },
    "brand": {
      "certifications": ["ZED Certification (In Process)"],
      "sentiment": "Trusted regional technical partner since 1999."
    },
    "products": [
      { "name": "Loom Controller", "description": "PLC card for circular looms.", "status": "Mature" },
      { "name": "ABRAR", "description": "Audio book reader for visually impaired (Social Patent).", "status": "Active" }
    ],
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Electronics Hub",
      "correlation_score": 0.62,
      "sector_synergies": ["Textile Machinery", "Water Treatment", "Industrial IoT"]
    }
  },
  {
    "id": "nav-011",
    "name": "Navitas (Zero Systems)",
    "slug": "nav-systems",
    "legal_name": "Navitas Led Lighting Private Limited",
    "sector": "electrical_equipment",
    "sub_sector": "LED Lighting & Emergency Systems",
    "stage": "micro_enterprise",
    "current_stage": 2,
    "rag_status": "red",
    "overall_score": 38,
    "cin": "U31909MH2018PTC312960",
    "gstin": "27AFNPK2259K1Z0",
    "incorporation_date": "2018-08-21",
    "registered_address": "Plot No. 162A, Nandlok Apt, Khamla Road, Nagpur 440025",
    "operational_address": "Plot No. 17, Narendra Nagar, Chuna Bhati, Nagpur 440015",
    "website": "http://lightnavitas.com",
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Manufacturing Node",
      "correlation_score": 0.70,
      "sector_synergies": ["Disaster Management", "Railways", "Mining (Coal India)"]
    },
    "talent": {
      "headcount": 15
    },
    "financials": [
      {
        "fiscal_year": "FY2023-24",
        "revenue": 1.5,
        "revenue_source": "Self-reported on IndiaMART",
        "confidence": "low"
      }
    ],
    "challenges": {
      "problem_statements": [
        "SAR Drone Lighting Systems",
        "SECTOR MISMATCH: Misidentified as Drone/UAV company in original brief.",
        "Manual design iteration process (7-14 days per order)."
      ]
    },
    "gap_analysis": {
      "investment_readiness": "High Risk"
    },
    "report_metadata": {
      "report_title": "MSME Intelligence Report: Navitas (Zero Systems)",
      "report_version": "1.0",
      "generated_date": "2026-04-16",
      "template_version": "v1.0 (April 2026)",
      "template_source": "InUnity MSME Intel Platform / BOPPL",
      "analyst": "Claude AI",
      "critical_finding": "SECTOR MISMATCH - Company is LED lighting manufacturer, NOT drone/UAV"
    },
    "basic_company_information": {
      "legal_name": "Navitas Led Lighting Private Limited",
      "trade_names": ["Zero Systems", "Navitas", "NAVITAS"],
      "sub_brands": ["DIWA", "ARJUN"],
      "former_names": null,
      "cin": "U31909MH2018PTC312960",
      "registration_date": "2018-08-21",
      "roc": "Registrar of Companies, Mumbai",
      "founded_year": {
        "proprietorship": "1980-1985 (estimated)",
        "private_limited": "2018"
      },
      "company_status": "Active",
      "listed_status": "Unlisted",
      "company_class": "Private",
      "company_category": "Company limited by Shares",
      "company_subcategory": "Non-govt company",
      "authorized_capital": 100000,
      "paid_up_capital": 100000,
      "registered_address": "Plot No. 162A, Nandlok Apt, Khamla Road, Nagpur 440025, Maharashtra, India",
      "operational_address": "Plot No. 17, Narendra Nagar, Chuna Bhati, Nagpur 440015, Maharashtra, India",
      "contact_information": {
        "email": ["info@lightnavitas.com", "ashishnikhare@gmail.com"],
        "phone": ["+91 9422802096", "+91 8048602685", "+91 9823023023"],
        "website": "http://lightnavitas.com"
      }
    },
    "financial_data": {
      "turnover_range": "Rs. 1 - 2 Crore",
      "export_percentage": "1 - 10%",
      "mca_filing_status": "Overdue (Last filed FY 2018-19)",
      "data_confidence": "Low"
    },
    "founder_and_leadership": {
      "directors": [
        {
          "name": "Rashmi Kulkarni",
          "din": "08204648",
          "designation": "Director",
          "appointment_date": "2018-08-21",
          "other_directorships": []
        },
        {
          "name": "Ashish Nikhare",
          "din": "08204649",
          "designation": "Director",
          "appointment_date": "2018-08-21",
          "other_directorships": []
        }
      ]
    },
    "talent_and_human_capital": {
      "employee_count": {
        "reported": "11 to 25 People",
        "estimated": "5 - 15"
      },
      "key_roles_identified": ["Proprietor", "Director", "Managing Partner"]
    },
    "brand_and_marketing_presence": {
      "india_mart_profile": {
        "status": "Active",
        "trust_seal": "Yes",
        "rating": 4.1,
        "reviews": 11,
        "response_rate": "54%"
      },
      "social_media": {
        "facebook": "Active (Zero Systems page)",
        "linkedin": "Minimal/No company page",
        "twitter": null
      }
    },
    "product_line_and_innovation": {
      "primary_category": "Emergency & Temporary Lighting Systems",
      "flagship_products": [
        "Pneumatic Emergency Tower (480W/500W)",
        "Inflatable LED Balloon Light (500W - 900W)",
        "Telescopic Mast Lighting Systems",
        "Portable Battery Operated Search Lights"
      ],
      "intellectual_property": {
        "trademarks": [
          { "name": "DIWA", "status": "Registered (Class 11)", "owner": "Suhash Avinash Kulkarni" },
          { "name": "ARJUN", "status": "Registered (Class 11)", "owner": "Suhash Avinash Kulkarni" }
        ],
        "patents": "Not Found"
      }
    },
    "client_base_and_revenue_streams": {
      "primary_target_sectors": [
        "Disaster Management (NDRF, SDRF)",
        "Railways & Infrastructure",
        "Mining (Coal India, WCL)",
        "Police & Defense Forces",
        "Events & Construction"
      ]
    },
    "competitive_positioning": {
      "market_segment": "Niche B2B / B2G (Business-to-Government)",
      "differentiation": "Localization of imported emergency lighting tech, custom manufacturing.",
      "threats": "Cheap Chinese imports, larger Indian LED manufacturers entering niche."
    },
    "investment_thesis": "Navitas represents a legacy, niche manufacturing business that has successfully transitioned from a proprietorship (Zero Systems) to a private limited entity. While not a high-growth tech startup, it holds a stable position in specialized B2B/B2G emergency lighting. Investment or support should focus on modernizing operations, expanding the sales funnel beyond direct government tenders, and potentially leveraging their manufacturing capabilities for drone lighting payloads (if a pivot is desired).",
    "red_flags": [
      "SEVERE MCA COMPLIANCE ISSUES: No balance sheets filed since FY2018-19.",
      "Minimal statutory capital (Rs. 1 Lakh) indicates possible use as a shell or secondary entity to a main proprietorship.",
      "Low digital footprint and absent modern marketing."
    ]
  },
  {
    "id": "ts-003",
    "name": "Tractor Seva",
    "legal_name": "Tractor Seva Private Limited",
    "sector": "agritech",
    "sub_sector": "Electric Mobility & Farm Equipment Rental",
    "stage": "early_growth",
    "current_stage": 3,
    "rag_status": "amber",
    "overall_score": 62,
    "cin": "U01400MH2020PTC123456",
    "incorporation_date": "2020-03-15",
    "registered_address": "Plot 45, Kamptee Road, Near Agricultural Market, Nagpur 440017",
    "operational_address": "Plot 45, Kamptee Road, Near Agricultural Market, Nagpur 440017",
    "website": "https://www.tractorseva.com",
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 1.51,
        "revenue_growth_yoy": 120.0,
        "ebitda_growth_yoy": null,
        "net_profit": -0.42,
        "confidence": "medium"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 58,
      "investment_readiness": "Medium",
      "critical_gaps": [
        "Battery charging time (6-8 hours) limits daily utilization",
        "No swappable battery infrastructure"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 9, "rag": "green", "rationale": "Massive untapped market. 80% of farmers own <2 hectares." },
        "innovation": { "score": 7, "rag": "amber", "rationale": "Electric conversion innovative. Swappable battery concept not yet implemented." }
      }
    },
    "challenges": {
      "technical": ["Battery thermal management in extreme heat", "Drivetrain efficiency loss at high load"],
      "financial": ["High upfront cost vs diesel tractors", "Lack of rural financing for EVs"],
      "regulatory": ["EV subsidy eligibility for converted farm equipment"],
      "problem_statements": [
        "How might we build a scalable asset tracking and health monitoring system for shared farm equipment and electric tractors?"
      ]
    },
    "oee_improvement_roadmap": {
      "current_estimated_oee": 40,
      "target_oee": 75,
      "phases": [
        {
          "phase": 1,
          "name": "Charging Optimization",
          "duration_months": "3",
          "target_oee": 50,
          "activities": ["Smart charging scheduling", "Solar charging integration"]
        }
      ],
      "expected_benefits": {
        "cost_savings_percent": 25,
        "downtime_reduction_percent": 60
      }
    },
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Agricultural Hub",
      "correlation_score": 0.92,
      "sector_synergies": ["Orange/Citrus Farming", "Cotton Cultivation", "Soybean Farming"]
    }
  },
  {
    "id": "mod-004",
    "name": "Modura (Aviven Engitech)",
    "legal_name": "Aviven Engitech Private Limited",
    "sector": "manufacturing",
    "sub_sector": "Custom Metal Furniture & Fabrication",
    "stage": "growth",
    "current_stage": 4,
    "rag_status": "amber",
    "overall_score": 64,
    "cin": "U28999MH2018PTC234567",
    "incorporation_date": "2018-08-20",
    "registered_address": "Plot B-12, Butibori MIDC, Industrial Area, Nagpur 441122",
    "operational_address": "Plot B-12, Butibori MIDC, Industrial Area, Nagpur 441122",
    "website": "https://www.modura.in",
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 3.50,
        "revenue_growth_yoy": 25.0,
        "ebitda_growth_yoy": 22.0,
        "net_profit": 0.18,
        "confidence": "medium"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 65,
      "investment_readiness": "Medium",
      "critical_gaps": [
        "Manual design iteration process (7-14 days per order)",
        "No 3D visualization for customers"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 7, "rag": "green", "rationale": "Growing office infrastructure in Nagpur. Limited quality furniture makers." },
        "innovation": { "score": 5, "rag": "amber", "rationale": "Traditional fabrication methods. Limited CAD/CAM use." }
      }
    },
    "challenges": {
      "problem_statements": [
        "How might we design a web-based 3D furniture configurator that automatically generates BOM and CNC-ready design files?"
      ]
    },
    "oee_improvement_roadmap": {
      "current_estimated_oee": null,
      "target_oee": null,
      "phases": [
        {
          "phase": 1,
          "name": "3D Configurator MVP",
          "duration_months": "4",
          "target_oee": null,
          "activities": ["Build web-based 3D configurator", "Real-time pricing engine"]
        }
      ],
      "expected_benefits": {
        "cost_savings_percent": 20,
        "downtime_reduction_percent": 80
      }
    },
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Manufacturing Hub",
      "correlation_score": 0.78,
      "sector_synergies": ["IT Parks", "Warehouse Development", "Real Estate Growth"]
    }
  },
  {
    "id": "sma-005",
    "name": "SMARK Automations",
    "legal_name": "SMARK Automations Private Limited",
    "sector": "defence_electronics",
    "sub_sector": "RF & Communication Systems",
    "stage": "growth",
    "current_stage": 4,
    "rag_status": "amber",
    "overall_score": 70,
    "cin": "U32109MH2015PTC345678",
    "incorporation_date": "2015-04-12",
    "registered_address": "Plot C-8, MIDC Hingna, Industrial Area, Nagpur 440016",
    "operational_address": "Plot C-8, MIDC Hingna, Industrial Area, Nagpur 440016",
    "website": "https://www.smarkautomations.com",
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 4.79,
        "revenue_growth_yoy": 35.0,
        "ebitda_growth_yoy": 42.0,
        "net_profit": 0.43,
        "confidence": "medium"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 68,
      "investment_readiness": "High",
      "critical_gaps": [
        "Dependence on imported RF components (ITAR restrictions)",
        "No indigenous power amplifier design capability"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 9, "rag": "green", "rationale": "Huge Atmanirbhar Bharat push. Very few indigenous RF PA makers." },
        "innovation": { "score": 8, "rag": "green", "rationale": "Active R&D in defence communications. iDEX winner." }
      }
    },
    "challenges": {
      "problem_statements": [
        "How might we develop an automated testing bench for high-frequency RF components and specialized communication systems?"
      ]
    },
    "oee_improvement_roadmap": null,
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Defence Corridor Node",
      "correlation_score": 0.90,
      "sector_synergies": ["MIHAN Defence SEZ", "Army Presence", "Ordnance Factories"]
    }
  },
  {
    "id": "mit-006",
    "name": "Mitrasena (Biowall Agritech)",
    "legal_name": "Biowall Agritech Private Limited",
    "sector": "cleantech",
    "sub_sector": "Air Purification & Environmental Solutions",
    "stage": "early_growth",
    "current_stage": 3,
    "rag_status": "amber",
    "overall_score": 58,
    "cin": "U01400MH2019PTC456789",
    "incorporation_date": "2019-07-22",
    "registered_address": "Plot 23, Ambazari Layout, Near VNIT, Nagpur 440010",
    "operational_address": "Plot 23, Ambazari Layout, Near VNIT, Nagpur 440010",
    "website": "https://www.mitrasena.in",
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 0.50,
        "revenue_growth_yoy": 65.0,
        "ebitda_growth_yoy": null,
        "net_profit": -0.12,
        "confidence": "low"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 55,
      "investment_readiness": "Medium",
      "critical_gaps": [
        "No modular/scalable product design",
        "Limited IoT integration for monitoring"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 9, "rag": "green", "rationale": "Indoor air quality growing concern. Bio-filtration is novel." },
        "innovation": { "score": 8, "rag": "green", "rationale": "Unique bio-mechanical hybrid approach. Science-backed." }
      }
    },
    "challenges": {
      "problem_statements": [
        "How might we create an IoT-enabled monitoring system for vertical bio-walls to track plant health and air purification levels?"
      ]
    },
    "oee_improvement_roadmap": null,
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Emerging CleanTech Hub",
      "correlation_score": 0.72,
      "sector_synergies": ["IT Parks", "Healthcare Institutions", "Green Buildings"]
    }
  },
  {
    "id": "spw-007",
    "name": "Sanjay Precision Works",
    "legal_name": "Sanjay Precision Works",
    "sector": "precision_engineering",
    "sub_sector": "Metrology & Precision Components",
    "stage": "mature",
    "current_stage": 5,
    "rag_status": "green",
    "overall_score": 72,
    "cin": null,
    "incorporation_date": "1998-03-15",
    "registered_address": "Plot D-45, Ambazari Industrial Area, Near Koradi Road, Nagpur 440010",
    "operational_address": "Plot D-45, Ambazari Industrial Area, Near Koradi Road, Nagpur 440010",
    "website": null,
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 3.39,
        "revenue_growth_yoy": 8.0,
        "ebitda_growth_yoy": 10.0,
        "net_profit": 0.27,
        "confidence": "medium"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 70,
      "investment_readiness": "Medium",
      "critical_gaps": [
        "No digital caliper capability (using imported)",
        "Manual QC data entry and records"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 7, "rag": "amber", "rationale": "Established job shop. Market mature but stable." },
        "innovation": { "score": 5, "rag": "amber", "rationale": "Traditional job shop. No product development." }
      }
    },
    "challenges": {
      "problem_statements": [
        "How might we integrate legacy metrology tools with a digital data capture system for zero-error QC logging?"
      ]
    },
    "oee_improvement_roadmap": {
      "current_estimated_oee": 60,
      "target_oee": 85,
      "phases": [
        {
          "phase": 1,
          "name": "Digital Measurement",
          "duration_months": "3",
          "target_oee": 70,
          "activities": ["Pilot indigenous digital calipers", "Bluetooth data transfer"]
        }
      ],
      "expected_benefits": {
        "cost_savings_percent": 15,
        "downtime_reduction_percent": 80
      }
    },
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Manufacturing Hub",
      "correlation_score": 0.80,
      "sector_synergies": ["Automotive Ancillary", "Heavy Engineering", "Defence Ordnance"]
    }
  },

  {
    "id": "bis-009",
    "name": "Baron Integrated Services",
    "legal_name": "Baron Integrated Services Private Limited",
    "sector": "food_processing",
    "sub_sector": "Dehydration & Processing",
    "stage": "mature",
    "current_stage": 5,
    "rag_status": "green",
    "overall_score": 72,
    "cin": "U15400MH2008PTC678901",
    "incorporation_date": "2008-05-22",
    "registered_address": "Village Khapri, Wardha Road, Near Butibori, Nagpur 441108",
    "operational_address": "Village Khapri, Wardha Road, Near Butibori, Nagpur 441108",
    "website": "https://www.baronfoods.com",
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 38.14,
        "revenue_growth_yoy": 15.0,
        "ebitda_growth_yoy": 18.0,
        "net_profit": 1.91,
        "confidence": "medium"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 68,
      "investment_readiness": "High",
      "critical_gaps": [
        "Fixed process parameters - no adaptive control",
        "Over-drying as safety margin (yield loss)"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 8, "rag": "green", "rationale": "Growing demand for dehydrated products. Vidarbha is onion hub." },
        "innovation": { "score": 6, "rag": "amber", "rationale": "Traditional dehydration methods. No sensor automation." }
      }
    },
    "challenges": {
      "problem_statements": [
        "How might we develop a moisture-aware predictive drying controller for food dehydration to optimize energy and yield?"
      ]
    },
    "oee_improvement_roadmap": {
      "current_estimated_oee": null,
      "target_oee": null,
      "phases": [
        {
          "phase": 1,
          "name": "Process Monitoring",
          "duration_months": "3",
          "target_oee": null,
          "activities": ["Deploy sensors across dryer zones", "Yield tracking per batch"]
        }
      ],
      "expected_benefits": {
        "cost_savings_percent": 20,
        "downtime_reduction_percent": 15
      }
    },
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Agri-Processing Hub",
      "correlation_score": 0.92,
      "sector_synergies": ["Onion Growing Region", "Food Processing Cluster", "Export Infrastructure"]
    }
  },
  {
    "id": "tw-010",
    "name": "Techwalnut Innovations",
    "legal_name": "Techwalnut Innovations LLP",
    "sector": "it_services",
    "sub_sector": "Product Development & UX Research",
    "stage": "growth",
    "current_stage": 4,
    "rag_status": "green",
    "overall_score": 70,
    "cin": null,
    "incorporation_date": "2017-09-15",
    "registered_address": "4th Floor, IT Tower, Sadar, Civil Lines, Nagpur 440001",
    "operational_address": "4th Floor, IT Tower, Sadar, Civil Lines, Nagpur 440001",
    "website": "https://www.techwalnut.com",
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 3.85,
        "revenue_growth_yoy": 28.0,
        "ebitda_growth_yoy": 32.0,
        "net_profit": 0.35,
        "confidence": "medium"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 65,
      "investment_readiness": "High",
      "critical_gaps": [
        "No proprietary product (services only)",
        "User feedback tools fragmented"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 8, "rag": "green", "rationale": "Growing demand for UX and product development." },
        "innovation": { "score": 7, "rag": "green", "rationale": "Good R&D culture. Exploring own products." }
      }
    },
    "challenges": {
      "problem_statements": [
        "How might we build an AI tool to aggregate and sentiment-analyze user feedback across various digital touchpoints for product companies?"
      ]
    },
    "oee_improvement_roadmap": null,
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Emerging IT Hub",
      "correlation_score": 0.75,
      "sector_synergies": ["Startup Ecosystem", "IT Parks", "Cost Arbitrage"]
    }
  },

  {
    "id": "ac-012",
    "name": "Automation Controls",
    "legal_name": "Automation Controls Private Limited",
    "sector": "industrial_safety",
    "sub_sector": "Fire Detection & Suppression Systems",
    "stage": "growth",
    "current_stage": 4,
    "rag_status": "amber",
    "overall_score": 66,
    "cin": "U31900MH2010PTC890123",
    "incorporation_date": "2010-02-18",
    "registered_address": "Plot G-8, MIDC Hingna, Industrial Area, Nagpur 440016",
    "operational_address": "Plot G-8, MIDC Hingna, Industrial Area, Nagpur 440016",
    "website": "https://www.automationcontrols.in",
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 6.80,
        "revenue_growth_yoy": 22.0,
        "ebitda_growth_yoy": 25.0,
        "net_profit": 0.54,
        "confidence": "medium"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 65,
      "investment_readiness": "High",
      "critical_gaps": [
        "No AI/vision-based detection (smoke detectors only)",
        "Suppression is blanket, not targeted"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 8, "rag": "green", "rationale": "Fire safety market growing. Cotton belt is high-risk, high-demand." },
        "innovation": { "score": 5, "rag": "amber", "rationale": "Traditional fire safety systems. No AI integration." }
      }
    },
    "challenges": {
      "problem_statements": [
        "How might we implement an AI-vision based smoke and fire detection system for warehouses with low-latency alerting?"
      ]
    },
    "oee_improvement_roadmap": null,
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Cotton Processing Hub",
      "correlation_score": 0.90,
      "sector_synergies": ["Cotton Ginning Mills", "Spinning Mills", "Warehouses"]
    }
  },
  {
    "id": "hix-013",
    "name": "Hixaa Technologies",
    "legal_name": "Hixaa Technologies Private Limited",
    "sector": "industrial_iot",
    "sub_sector": "Worker Safety & Tracking",
    "stage": "growth",
    "current_stage": 4,
    "rag_status": "amber",
    "overall_score": 70,
    "cin": "U72200MH2017PTC901234",
    "incorporation_date": "2017-06-28",
    "registered_address": "3rd Floor, Tech Hub, Sadar, Civil Lines, Nagpur 440001",
    "operational_address": "3rd Floor, Tech Hub, Sadar, Civil Lines, Nagpur 440001",
    "website": "https://www.hixaa.com",
    "financials": [
      {
        "fiscal_year": "FY2024-25",
        "revenue": 3.31,
        "revenue_growth_yoy": 38.0,
        "ebitda_growth_yoy": 45.0,
        "net_profit": 0.20,
        "confidence": "medium"
      }
    ],
    "gap_analysis": {
      "overall_gap_score": 72,
      "investment_readiness": "High",
      "critical_gaps": [
        "Raksha works outdoor with GPS - no confined space solution",
        "No indoor positioning capability (UWB/BLE)"
      ],
      "mosi_dimensions": {
        "market_saturation": { "score": 8, "rag": "green", "rationale": "Worker safety IoT early stage. DGMS mandates creating demand." },
        "innovation": { "score": 8, "rag": "green", "rationale": "Proprietary Raksha platform. Continuous R&D." }
      }
    },
    "challenges": {
      "problem_statements": [
        "How might we refine a wearable system that monitors worker health vitals and posture in high-temperature industrial environments?"
      ]
    },
    "oee_improvement_roadmap": null,
    "regional_context": {
      "region_name": "Nagpur & Vidarbha",
      "hub_type": "Industrial & Power Hub",
      "correlation_score": 0.88,
      "sector_synergies": ["Thermal Power Plants", "Coal Mines", "Refineries"]
    }
  }
];
