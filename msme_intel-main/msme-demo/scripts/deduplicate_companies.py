
import os

file_path = r'd:\Buisness intel\msme-intelligence-platform\msme-demo\lib\demo-data\new-companies.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# High-fidelity block markers (lines indices 0-indexed)
# 3023: // NAGPUR NEXT MSME 7: SANJAY PRECISION WORKS
# 3502: }
start_tail = -1
end_tail = -1

for i, line in enumerate(lines):
    if '// NAGPUR NEXT MSME 7: SANJAY PRECISION WORKS' in line and i > 2500:
        start_tail = i
    if start_tail != -1 and 'id: "company-hixaa-013"' in line:
        # find the end of this object
        for j in range(i, len(lines)):
            if lines[j].strip() == '}' and (j+1 >= len(lines) or '];' in lines[j+1]):
                end_tail = j
                break
        break

if start_tail == -1 or end_tail == -1:
    print(f"Error: Could not find tail block. start={start_tail}, end={end_tail}")
    exit(1)

high_fidelity_block = lines[start_tail:end_tail+1]

# Placeholder block markers
# 2157: // NAGPUR NEXT: Open Category
# 2503: } (end of flow-012)
start_placeholder = -1
end_placeholder = -1

for i, line in enumerate(lines):
    if '// NAGPUR NEXT: Open Category' in line:
        start_placeholder = i
    if start_placeholder != -1 and 'id: \'company-flow-012\'' in line:
        for j in range(i, len(lines)):
            if lines[j].strip() == '}' and (j+1 >= len(lines) or '    //' in lines[j+1] or '//' in lines[j+1] or '];' in lines[j+1]):
                # Check if next line is "// NAGPUR NEXT MSME 7" or similar or blank
                if j+1 < len(lines) and ('// NAGPUR NEXT MSME 7' in lines[j+1] or '];' in lines[j+1]):
                    end_placeholder = j
                    break
                # In current file, line 2505 is challenges end
                if ']' in lines[j-1] and '}' in lines[j]:
                     end_placeholder = j
                     break
        break

# Manual override based on previous view_file
start_placeholder = 2156 # index for line 2157
end_placeholder = 2504 # line 2505 is end of Flow Control

print(f"Tail: {start_tail} to {end_tail}")
print(f"Placeholder: {start_placeholder} to {end_placeholder}")

# Perform the swap:
# 1. Remove tail
new_lines = lines[:start_tail] + lines[end_tail+1:]
# 2. Replace placeholder with high_fidelity
final_lines = new_lines[:start_placeholder] + high_fidelity_block + new_lines[end_placeholder+1:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(final_lines)

print("Successfully deduplicated new-companies.ts")
