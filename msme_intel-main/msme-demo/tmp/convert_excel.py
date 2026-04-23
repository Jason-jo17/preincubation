import pandas as pd
import json

file_path = r"D:\Downloads2\Maharashtra_Tech_Ecosystem_Complete.xlsx"
try:
    # Read the excel file
    xls = pd.ExcelFile(file_path)
    data = {}
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name)
        # Convert to list of dicts
        data[sheet_name] = df.to_dict(orient='records')
    
    # Save as JSON
    with open('maharashtra_ecosystem.json', 'w') as f:
        json.dump(data, f, indent=2, default=str)
    print("Successfully converted Excel to JSON")
except Exception as e:
    print(f"Error: {e}")
