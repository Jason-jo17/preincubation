-- Seed data for Sector Automation Needs
-- Populates initial research-driven automation opportunities across Manufacturing, BFSI, Healthcare, Food Processing, and Logistics.

-- Assuming sector IDs are fixed or can be matched by name. 
-- In a real scenario, we'd use a subquery to find IDs.

-- Manufacturing Needs
INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, estimated_roi_percentage, implementation_complexity, time_to_value_weeks,
    tech_stack_suggested, status, is_featured, priority_rank, tags
) 
SELECT 
    id, 'AI-Powered Visual Quality Inspection', 'ai-visual-quality-inspection', 
    'Deploy computer vision for automated defect detection on production lines, replacing manual visual inspection.', 
    'computer_vision', 'efficiency', 'high', 35, 'medium', 12,
    '{"primary": ["Python", "TensorFlow/PyTorch", "OpenCV"], "secondary": ["FastAPI", "PostgreSQL", "Redis"], "edge": ["NVIDIA Jetson", "Intel NCS"]}',
    'published', true, 1, '["AI", "Quality", "Visual Inspection"]'
FROM sectors WHERE name = 'Manufacturing';

INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, estimated_roi_percentage, implementation_complexity, time_to_value_weeks,
    status, is_featured, priority_rank, tags
) 
SELECT 
    id, 'Predictive Maintenance System', 'predictive-maintenance-system', 
    'ML-based prediction of equipment failures to enable proactive maintenance scheduling.', 
    'predictive_analytics', 'efficiency', 'transformative', 45, 'high', 16,
    'published', true, 2, '["IoT", "Maintenance", "ML"]'
FROM sectors WHERE name = 'Manufacturing';

INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, estimated_roi_percentage, implementation_complexity, time_to_value_weeks,
    status, is_featured, priority_rank, tags
) 
SELECT 
    id, 'Automated RFQ Processing', 'automated-rfq-processing', 
    'AI extraction and processing of RFQ documents to auto-generate quotations.', 
    'nlp_automation', 'core', 'high', 40, 'medium', 8,
    'published', false, 3, '["NLP", "Sales", "Automation"]'
FROM sectors WHERE name = 'Manufacturing';

-- BFSI Needs
INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, estimated_roi_percentage, status, priority_rank
) 
SELECT 
    id, 'AI-Powered MSME Credit Scoring', 'ai-msme-credit-scoring', 
    'Alternative credit scoring using transaction data, GST returns, and business patterns for MSMEs.', 
    'predictive_analytics', 'disruption', 'transformative', 50, 'published', 1
FROM sectors WHERE name = 'Financial Services';

INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, estimated_roi_percentage, status, priority_rank
) 
SELECT 
    id, 'Automated KYC Document Processing', 'automated-kyc-processing', 
    'OCR and NLP-based extraction of KYC documents with validation against databases.', 
    'nlp_automation', 'efficiency', 'high', 45, 'published', 2
FROM sectors WHERE name = 'Financial Services';

-- Healthcare Needs
INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, status, priority_rank
) 
SELECT 
    id, 'AI Diagnostic Radiology Assistant', 'ai-radiology-assistant', 
    'AI-assisted detection of anomalies in X-rays, CT scans, and MRIs.', 
    'computer_vision', 'disruption', 'transformative', 'published', 1
FROM sectors WHERE name = 'Healthcare';

-- Agriculture (Food Processing) Needs
INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, status, priority_rank
) 
SELECT 
    id, 'Shelf-Life Prediction System', 'shelf-life-prediction', 
    'ML model predicting shelf life based on storage conditions and product characteristics.', 
    'predictive_analytics', 'efficiency', 'high', 'published', 1
FROM sectors WHERE name = 'Agriculture';

-- Aerospace Needs
INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, estimated_roi_percentage, implementation_complexity, time_to_value_weeks,
    tech_stack_suggested, status, is_featured, priority_rank, tags
) 
SELECT 
    id, 'AI-Integrated RFQ & Quote Optimization', 'aerospace-rfq-automation', 
    'Automate complex RFQ analysis for aerospace components. Extract technical specs from blueprints and calculate BOM costs.', 
    'nlp_automation', 'efficiency', 'high', 28, 'medium', 14,
    '{"primary": ["Python", "OpenAI GPT-4", "FastAPI"], "secondary": ["PostgreSQL", "React"]}',
    'published', true, 1, '["Aerospace", "NLP", "Supply Chain"]'
FROM sectors WHERE name = 'Aerospace';

INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, estimated_roi_percentage, implementation_complexity, time_to_value_weeks,
    status, is_featured, priority_rank, tags
) 
SELECT 
    id, 'Predictive Health Monitoring for Heavy Forging Presses', 'forging-press-predictive-maintenance', 
    'IoT-based monitoring for high-tonnage (10,000T+) forging presses using vibration and hydraulic analysis.', 
    'predictive_analytics', 'core', 'transformative', 42, 'high', 18,
    'published', true, 2, '["Aerospace", "IoT", "Maintenance"]'
FROM sectors WHERE name = 'Aerospace';

INSERT INTO sector_automation_needs (
    sector_id, title, slug, description, automation_type, ceed_quadrant, 
    impact_level, estimated_roi_percentage, implementation_complexity, time_to_value_weeks,
    status, is_featured, priority_rank, tags
) 
SELECT 
    id, 'Digital Twin for Multi-Axis CNC Machining', 'cnc-digital-twin-optimization', 
    'Virtual replica of 5-axis machining centers to optimize tool paths and reduce scrap.', 
    'iot_integration', 'disruption', 'high', 35, 'very_high', 24,
    'published', false, 3, '["Aerospace", "Digital Twin", "Manufacturing"]'
FROM sectors WHERE name = 'Aerospace';

