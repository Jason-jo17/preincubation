import pandas as pd
import json
import os

file_path = r'D:\Downloads2\Maharashtra_Tech_Ecosystem_Complete (1).xlsx'
output_path = 'maharashtra_ecosystem_data.json'

try:
    # Read all sheets
    excel_file = pd.ExcelFile(file_path)
    all_data = {}
    for sheet_name in excel_file.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        all_data[sheet_name] = df.to_dict(orient='records')
    
    with open(output_path, 'w') as f:
        json.dump(all_data, f, indent=4)
    print(f"Successfully extracted {len(excel_file.sheet_names)} sheets to {output_path}")
except Exception as e:
    print(f"Error: {e}")
