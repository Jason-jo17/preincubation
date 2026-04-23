import csv
import io
from typing import List, Dict, Any

class CSVService:
    @staticmethod
    def parse_company_csv(file_content: bytes) -> List[Dict[str, Any]]:
        """
        Parses a CSV file containing company data.
        Expected columns might vary, so we map common variations to our schema.
        """
        content_str = file_content.decode('utf-8')
        reader = csv.DictReader(io.StringIO(content_str))
        
        companies = []
        for row in reader:
            company_data = CSVService._map_row_to_company(row)
            if company_data:
                companies.append(company_data)
                
        return companies
    
    @staticmethod
    def _map_row_to_company(row: Dict[str, str]) -> Dict[str, Any]:
        """
        Maps a CSV row to the Company schema.
        Handles Traxn / MCA / Generic formats by checking multiple possible column names.
        """
        # Normalize keys to lowercase for easier matching
        row_lower = {k.lower().strip(): v for k, v in row.items()}
        
        name = row_lower.get('company name') or row_lower.get('name') or row_lower.get('company_name')
        if not name:
            return None
            
        return {
            "name": name,
            "website": row_lower.get('website') or row_lower.get('url'),
            "description": row_lower.get('description') or row_lower.get('about'),
            "founded_year": CSVService._parse_int(row_lower.get('founded year') or row_lower.get('founded_year') or row_lower.get('incorporation date')),
            "headquarters_location": row_lower.get('headquarters') or row_lower.get('location') or row_lower.get('city'),
            "employee_count": CSVService._parse_int(row_lower.get('employee count') or row_lower.get('employees')),
            "raw_data": row # Store original row for potential extra extraction
        }

    @staticmethod
    def _parse_int(value: str) -> int:
        if not value:
            return None
        try:
            # Handle "10-50", "100+", "2020", etc.
            clean_val = ''.join(filter(str.isdigit, str(value).split('-')[0])) 
            return int(clean_val)
        except:
            return None
