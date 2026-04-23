import csv
import io
import os

log_path = r"C:\Users\jason\.gemini\antigravity\brain\678d8202-b03b-4125-8a14-2119cb37b992\.system_generated\logs\overview.txt"
with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

start_m = "Company Name,Website,Category,Subcategory,Product/Service Description"
end_m = ", also allow me to select the ecosystem"

idx1 = text.rfind(start_m)
idx2 = text.find(end_m, idx1)

if idx1 == -1 or idx2 == -1:
    print("Marks not found.")
    exit(1)

csv_text = text[idx1:idx2].strip()

f_csv = io.StringIO(csv_text)
reader = csv.DictReader(f_csv)

cats = {
    "Product Startup": {"id": "product-startup", "title": "Product Startups", "icon": "Rocket", "desc": "Hardware and software startups"},
    "AI/ML Company": {"id": "ai-ml", "title": "AI & ML Specialists", "icon": "Cpu", "desc": "Core AI/ML providers"},
    "AI/ML Services": {"id": "ai-ml", "title": "AI & ML Specialists", "icon": "Cpu", "desc": "Core AI/ML providers"},
    "Software Services": {"id": "software-services", "title": "Software Services", "icon": "Code", "desc": "Application development"},
    "Industrial Automation": {"id": "industry-40", "title": "Industry 4.0 & Automation", "icon": "Factory", "desc": "Robotics and smart manufacturing"},
    "Robotics": {"id": "industry-40", "title": "Industry 4.0 & Automation", "icon": "Factory", "desc": "Robotics and smart manufacturing"},
    "Electronics Design": {"id": "electronics", "title": "Electronics & Hard-Tech", "icon": "Cpu", "desc": "PCB and electronics"},
    "PCB Manufacturing": {"id": "electronics", "title": "Electronics & Hard-Tech", "icon": "Cpu", "desc": "PCB and electronics"},
    "Contract Manufacturing": {"id": "electronics", "title": "Electronics & Hard-Tech", "icon": "Cpu", "desc": "PCB and electronics"},
    "3D Printing": {"id": "manufacturing", "title": "Advanced Manufacturing", "icon": "Layers", "desc": "3D printing and prototyping"},
    "IoT Platform": {"id": "iot", "title": "IoT & Edge Computing", "icon": "Wifi", "desc": "IoT platforms and solutions"},
    "IoT Solutions": {"id": "iot", "title": "IoT & Edge Computing", "icon": "Wifi", "desc": "IoT platforms and solutions"},
    "Workflow Automation": {"id": "dt", "title": "Digital Transformation", "icon": "TrendingUp", "desc": "RPA and enterprise processes"},
    "RPA Services": {"id": "dt", "title": "Digital Transformation", "icon": "TrendingUp", "desc": "RPA and enterprise processes"},
    "ERP Implementation": {"id": "erp", "title": "Enterprise Resource Planning", "icon": "Database", "desc": "ERP implementation partners"},
    "Custom ERP": {"id": "erp", "title": "Enterprise Resource Planning", "icon": "Database", "desc": "ERP implementation partners"},
    "Tally Partner": {"id": "erp", "title": "Enterprise Resource Planning", "icon": "Database", "desc": "ERP implementation partners"},
    "Cloud/DevOps": {"id": "cloud", "title": "Cloud & Infrastructure", "icon": "Cloud", "desc": "DevOps and cloud migration"},
    "Digital Transformation": {"id": "dt", "title": "Digital Transformation", "icon": "TrendingUp", "desc": "Digital transformation experts"},
    "Incubator Portfolio": {"id": "incubators", "title": "Incubator Portfolios", "icon": "Lightbulb", "desc": "Leading deep-tech incubators"},
    "Tier-2 Flagship": {"id": "tier-2", "title": "Regional Leaders", "icon": "MapPin", "desc": "Regional tech companies"},
    "Tier-2 Company": {"id": "tier-2", "title": "Regional Leaders", "icon": "MapPin", "desc": "Regional tech companies"},
    "Notable Startup": {"id": "startups", "title": "Notable Startups", "icon": "Star", "desc": "Fast-growing companies"}
}

grouped = {}
for r in reader:
    raw = r.get('Category') or ""
    raw = raw.strip()
    c = cats.get(raw, {"id": "other", "title": raw, "icon": "Briefcase", "desc": "Other services"})
    cid = c["id"]
    if cid not in grouped:
        grouped[cid] = c.copy()
        grouped[cid]["companies"] = []
    
    comp = {
        "id": f"{cid}-{len(grouped[cid]['companies'])+1}",
        "name": r.get('Company Name', '').replace("'", "\\'"),
        "description": r.get('Product/Service Description', '').replace("'", "\\'"),
        "location": r.get('Location', '').replace("'", "\\'"),
        "contact": {
            "email": r.get('Contact/LinkedIn', '').replace("'", "\\'"),
            "website": f"https://{r.get('Website', '').replace('+', '')}" if r.get('Website', '') else ""
        },
        "services": [s.strip().replace("'", "\\'") for s in r.get('Tech Stack / Capabilities', '').split(',')]
    }
    grouped[cid]["companies"].append(comp)

out = "import { EcosystemCategory } from './ecosystem-providers';\n\nexport const MAHARASHTRA_ECOSYSTEM: EcosystemCategory[] = [\n"
for g in grouped.values():
    out += f"    {{\n        id: '{g['id']}',\n        title: '{g['title']}',\n        description: '{g['desc']}',\n        icon_name: '{g['icon']}' as any,\n        companies: [\n"
    for c in g['companies']:
        out += f"            {{\n                id: '{c['id']}',\n                name: '{c['name']}',\n                description: '{c['description']}',\n                rating: 4.8,\n                location: '{c['location']}',\n                contact: {{\n                    email: '{c['contact']['email']}',\n                    phone: '',\n                    website: '{c['contact']['website']}'\n                }},\n                services: [{', '.join([f'{chr(39)}{s}{chr(39)}' for s in c['services'] if s])}],\n                match_score: 92\n            }},\n"
    out += "        ]\n    },\n"
out += "];\n"

out_path = r"d:\Buisness intel\msme-intelligence-platform\msme-demo\lib\demo-data\maharashtra-ecosystem.ts"
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(out)

print(f"Done processing {len(grouped.keys())} categories to {out_path}")
