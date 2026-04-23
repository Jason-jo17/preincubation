import re

report_path = r"d:\Buisness intel\msme-intelligence-platform\msme-demo\navitas-report.md"
ts_path = r"d:\Buisness intel\msme-intelligence-platform\msme-demo\lib\demo-data\new-companies.ts"

with open(report_path, 'r', encoding='utf-8') as f:
    report_text = f.read()

with open(ts_path, 'r', encoding='utf-8') as f:
    ts_content = f.read()

navitas_idx = ts_content.find("id: 'navitas-zero-systems'")
if navitas_idx == -1:
    print("Could not find Navitas in new-companies.ts")
    exit(1)

pattern = re.compile(r'(due_diligence_report:\s*`)(.*?)(`,)', re.DOTALL)
match = pattern.search(ts_content, navitas_idx)
if not match:
    print("Could not find due_diligence_report for Navitas")
    exit(1)

escaped_report = report_text.replace('`', '\\`').replace('$', '\\$')
new_ts_content = ts_content[:match.start(2)] + escaped_report + ts_content[match.end(2):]

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(new_ts_content)

print(f"Successfully updated Navitas due_diligence_report with {len(escaped_report)} characters.")
