import pandas as pd
import json
import sys

file_path = r'D:\Downloads2\Maharashtra_Tech_Ecosystem_Complete.xlsx'

try:
    df = pd.read_excel(file_path, sheet_name=0)
    # Get top 30 rows and relevant columns if they exist
    # Let's see the columns first
    cols = df.columns.tolist()
    data = df.head(50).to_dict(orient='records')
    print(json.dumps({"columns": cols, "data": data}, indent=2))
except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
