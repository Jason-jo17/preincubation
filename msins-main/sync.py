import os
import shutil
import re
from pathlib import Path

SOURCE_ROOT = Path(r"D:\MSINS-Incubation-main (1)\MSINS-Incubation-main\src")
DEST_ROOT = Path(r"d:\MSINS-Incubation-main\MSINS-Incubation-main\src")

def resolve_import_path(base_dir, import_str):
    if import_str.startswith("@/"):
        rel = import_str[2:]
        return SOURCE_ROOT / rel
    elif import_str.startswith("."):
        return (base_dir / import_str).resolve()
    return None

def find_file_with_extensions(base_path):
    # Base path might not have extension
    if base_path.is_file():
        return base_path
    for ext in ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts']:
        p = Path(str(base_path) + ext)
        if p.is_file():
            return p
    return None

def process_file(file_path):
    if not file_path.exists():
        return
        
    try:
        content = file_path.read_text(encoding='utf-8')
    except Exception:
        return
        
    # Extract imports
    imports = re.findall(r'from\s+[\'"]([^\'"]+)[\'"]|import\s+[\'"]([^\'"]+)[\'"]', content)
    imports = [match[0] or match[1] for match in imports]
    
    for imp in imports:
        resolved_src_base = resolve_import_path(file_path.parent, imp)
        if not resolved_src_base:
            continue
            
        resolved_src = find_file_with_extensions(resolved_src_base)
        if not resolved_src:
            continue
            
        # Calculate relative path
        try:
            rel_path = resolved_src.relative_to(SOURCE_ROOT)
        except ValueError:
            continue
            
        dest_path = DEST_ROOT / rel_path
        
        # If it DOES NOT exist in dest, copy it and process it
        if not dest_path.exists():
            print(f"Missing dependency found: copy {rel_path}")
            os.makedirs(dest_path.parent, exist_ok=True)
            shutil.copy2(resolved_src, dest_path)
            # Recursively process the newly copied file
            process_file(resolved_src)

routes = [
    r"pages\innovator\InnovatorSprintPage.tsx",
    r"pages\innovator\InnovatorDashboard.tsx",
    r"pages\msme\MsmeDashboard.tsx",
    r"pages\cohort\CohortManagerDashboard.tsx",
    r"pages\cohort\CohortProgramBuilderPage.tsx"
]

print("Starting dependency scan...")
for r in routes:
    src_file = SOURCE_ROOT / r
    process_file(src_file)
print("Done!")
