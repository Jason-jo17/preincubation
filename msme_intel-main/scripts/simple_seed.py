import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='d:/Buisness intel/msme-intelligence-platform/.env')

client = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))

# 1. Get Sector ID
sector = client.table('sectors').select('id').eq('name', 'Aerospace & Precision Manufacturing').execute()
if not sector.data:
    print("❌ Sector not found")
    exit(1)
sector_id = sector.data[0]['id']

# 2. Insert Companies
companies = [
    {"name": "Aequs Limited", "primary_sector_id": sector_id, "stage": "mature", "funnel_stage": "gap_analysis"},
    {"name": "TechForge Manufacturing", "primary_sector_id": sector_id, "stage": "growth", "funnel_stage": "screened"}
]

print("🏢 Inserting Companies...")
comp_res = client.table('companies').insert(companies).execute()
if comp_res.data:
    print(f"✅ Inserted {len(comp_res.data)} companies")
    aequs_id = next(c['id'] for c in comp_res.data if c['name'] == 'Aequs Limited')
    techforge_id = next(c['id'] for c in comp_res.data if c['name'] == 'TechForge Manufacturing')

    # 3. Insert Stakeholders
    stakeholders = [
        {"company_id": aequs_id, "name": "Aravind Melligeri", "role": "CEO"},
        {"company_id": techforge_id, "name": "Mr. Rajesh Kumar", "role": "Operations Head"}
    ]
    sh_res = client.table('mosi_stakeholders').insert(stakeholders).execute()
    print(f"✅ Inserted {len(sh_res.data)} stakeholders")
    
    aravind_id = next(s['id'] for s in sh_res.data if s['name'] == 'Aravind Melligeri')
    
    # 4. Insert Sessions
    sessions = [
        {"stakeholder_id": aravind_id, "company_id": aequs_id, "status": "Published", "date": "Apr 01, 2026", "summary": "Full CEO Interview"}
    ]
    sess_res = client.table('mosi_sessions').insert(sessions).execute()
    print(f"✅ Inserted {len(sess_res.data)} sessions")
else:
    print("❌ Company insertion failed or returned no data")
