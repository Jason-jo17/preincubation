import re
import os

path = r"d:\MSINS-Incubation-main\MSINS-Incubation-main\src\data\nagpur-next-data.ts"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove Line XXX: markers (global)
# Handles Line 123: and Line 123:Line 124: styles
content = re.sub(r'Line \d+:', '', content)

# 2. Fix the corrupted prd blocks
# Pattern: complexity: "...", }, timeline_weeks: 12, budget_estimate: "..."
# We need to wrap it back into prd: { ... }
# And remove the stray }, opening
    
def fix_prd_structure(match):
    complexity = match.group(1)
    props = match.group(2)
    return f'complexity: "{complexity}",\n    prd: {{\n      {props.strip()}\n    }},'

# This pattern looks for complexity followed by a stray closing brace and then prd properties
pattern = r'complexity:\s*"([^"]+)",\s*},\s*((?:timeline_weeks|budget_estimate).*?)\s*},'
content = re.sub(pattern, fix_prd_structure, content, flags=re.DOTALL)

# 3. Handle cases where success_metrics was left open
# Pattern: primary_kpis: [ ... ], prd: {
def fix_success_metrics(match):
    kpis = match.group(1)
    return f'primary_kpis: [\n{kpis.strip()}\n        ],\n      }},\n'

pattern_metrics = r'primary_kpis:\s*\[(.*?)\],\s*prd:\s*{'
content = re.sub(pattern_metrics, fix_success_metrics, content, flags=re.DOTALL)

# 4. Final Cleanup: Fix double prd: { opening if any
content = re.sub(r'prd:\s*{\s*prd:\s*{', 'prd: {', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Data rescue completed successfully.")
