
import os
import re

file_path = r'd:\Buisness intel\msme-intelligence-platform\msme-demo\lib\demo-data\new-companies.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the ecosystem peers block
peers_block = """
          ecosystem_peers: [
            { name: "ideaForge (Navi Mumbai)", role: "Sector Leader (UAV)", alignment: "High" },
            { name: "Hiotron (Pune)", role: "IIoT Partner", alignment: "High" },
            { name: "Aeron Systems (Pune)", role: "Navigation Partner", alignment: "High" },
            { name: "Infinite Uptime (Pune)", role: "Predictive Maintenance", alignment: "High" }
          ]"""

# Define economic indicators for Nagpur
nagpur_indicators = """
          economic_indicators: {
              "industrial_corridor_proximity": "High",
              "export_scale_potential": "High",
              "mihan_sez_proximity": "High",
              "logistics_cluster_density": "High"
          },"""

def enrich_company(match):
    company_text = match.group(0)
    
    # 1. Update ecosystem_peers if it exists or add it to regional_context
    if 'ecosystem_peers: [' in company_text:
        # Replace existing ones with the high-fidelity consistent list
        company_text = re.sub(r'ecosystem_peers: \[[^\]]*\]', peers_block.strip(), company_text)
    elif 'regional_context: {' in company_text:
        # Insert inside regional_context
        company_text = company_text.replace('regional_context: {', 'regional_context: {' + peers_block + ',')

    # 2. Update economic_indicators if it's empty {}
    if 'economic_indicators: {}' in company_text:
        company_text = company_text.replace('economic_indicators: {}', nagpur_indicators.strip())
    
    return company_text

# Regex to find Nagpur companies in NEW_COMPANIES
# We look for headquarters_city: 'Nagpur' and regional_context
nagpur_patterns = [
    r'(\{\s+id: \'company-sanjay-precision-007\'[\s\S]*?headquarters_city: \'Nagpur\'[\s\S]*?regional_context: \{[\s\S]*?\})',
    r'(\{\s+id: \'company-baron-009\'[\s\S]*?headquarters_city: \'Nagpur\'[\s\S]*?regional_context: \{[\s\S]*?\})',
    r'(\{\s+id: \'company-techwalnut-010\'[\s\S]*?headquarters_city: \'Nagpur\'[\s\S]*?regional_context: \{[\s\S]*?\})',
    r'(\{\s+id: "company-automation-controls-012"[\s\S]*?headquarters_city: "Nagpur"[\s\S]*?regional_context: \{[\s\S]*?\})',
    r'(\{\s+id: "company-hixaa-013"[\s\S]*?headquarters_city: "Nagpur"[\s\S]*?regional_context: \{[\s\S]*?\})'
]

new_content = content
for pattern in nagpur_patterns:
    new_content = re.sub(pattern, enrich_company, new_content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully enriched Nagpur companies with ecosystem intelligence.")
