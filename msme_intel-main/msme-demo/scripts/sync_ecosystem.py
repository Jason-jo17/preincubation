import pandas as pd
import json
import os

# Paths
excel_path = r'D:\Downloads2\Maharashtra_Tech_Ecosystem_Complete (1).xlsx'
json_path = r'd:\Buisness intel\msme-intelligence-platform\msme-demo\maharashtra_ecosystem.json'

def convert_excel_to_json():
    try:
        # Read Excel
        df = pd.read_excel(excel_path)
        
        # Replace NaN with empty string
        df = df.fillna('')
        
        # Convert to list of dicts
        records = df.to_dict(orient='records')
        
        # Wrap in expected structure
        final_data = {
            "Complete Database": records
        }
        
        # Write to JSON
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(final_data, f, indent=2, ensure_ascii=False)
            
        print(f"Successfully updated {json_path} with {len(records)} records.")
        
    except Exception as e:
        print(f"Error during conversion: {e}")

if __name__ == "__main__":
    convert_excel_to_json()
