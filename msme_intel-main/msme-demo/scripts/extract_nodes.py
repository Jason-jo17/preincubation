import pandas as pd
import json
import sys

file_path = r'D:\Downloads2\Maharashtra_Tech_Ecosystem_Complete.xlsx'

try:
    df = pd.read_excel(file_path, sheet_name=0)
    # Get top 20 relevant tech node records
    tech_nodes = df.head(20).to_dict(orient='records')
    
    # Format for TypeScript pasting
    print("const MAHARASHTRA_TECH_NODES = " + json.dumps(tech_nodes, indent=2) + ";")
except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
