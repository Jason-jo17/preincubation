import re
import os

path = r"d:\MSINS-Incubation-main\MSINS-Incubation-main\src\data\nagpur-next-data.ts"
backup_path = path + ".bak"

if not os.path.exists(backup_path):
    with open(path, 'r', encoding='utf-8') as f:
        with open(backup_path, 'w', encoding='utf-8') as b:
            b.write(f.read())

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Stage 1: Basic Cleanup
clean_lines = []
for line in lines:
    # Remove markers like "Line 123:"
    line = re.sub(r'Line \d+:', '', line)
    # Fix corrupted Rupee symbols
    line = line.replace(',', '₹').replace('', '₹').replace('?', '₹')
    clean_lines.append(line)

content = "".join(clean_lines)

# Stage 2: Extract Challenges
# We look for objects with an 'id: "challenge-nag-..." property
challenge_pattern = r'{\s*id:\s*"challenge-nag-\d+".*?},?\s*(?=\s*{|$|\])'
# Note: This regex is tricky for nested objects. 
# Better: Find indices of challenge IDs and split.

indices = [m.start() for m in re.finditer(r'id:\s*"challenge-nag-(\d+)"', content)]
# Each index points to the start of the ID line. We backtrack to the nearest '{'.

challenge_blocks = {}
for idx in indices:
    # Find start brace
    start_brace = content.rfind('{', 0, idx)
    # This is a bit naive but if the file is mostly correct, it works.
    # A better way is to count braces.
    
    # Extract ID
    id_match = re.search(r'id:\s*"(challenge-nag-\d+)"', content[idx:idx+50])
    if id_match:
        challenge_id = id_match.group(1)
        if challenge_id not in challenge_blocks:
            # We only keep the FIRST occurrence (usually the most complete one)
            # Find the match for this challenge
            # We'll use a brace counter to find the real end of the object
            brace_count = 0
            found_start = False
            end_pos = -1
            for i in range(start_brace, len(content)):
                if content[i] == '{':
                    brace_count += 1
                    found_start = True
                elif content[i] == '}':
                    brace_count -= 1
                    if found_start and brace_count == 0:
                        end_pos = i + 1
                        break
            if end_pos != -1:
                block = content[start_brace:end_pos]
                # Fix internal prd corruption in case it's there
                # Remove nested prd: { prd: {
                block = re.sub(r'prd:\s*{\s*prd:\s*{', 'prd: {', block)
                # Ensure success_metrics is closed before prd properties
                block = re.sub(r'primary_kpis:\s*\[(.*?)\],\s*prd:\s*{', 
                               r'primary_kpis: [\1\n        ],\n      },\n      prd: {', block, flags=re.DOTALL)
                
                challenge_blocks[challenge_id] = block

# Stage 3: Reassemble the file
header = """import { type MsmeChallengeListItem } from "./msme-challenges-list";

export interface ProgramMetadata {
  program: string;
  platform: string;
  category: string;
  program_duration: string;
  format: string;
  culmination: string;
  opportunity: string;
  source_document: string;
  version: string;
  created_date: string;
  total_challenges: number;
}

export interface TranscriptEntry {
  id: string;
  speaker: string;
  text: string;
  timestamp: number;
  status: string;
  opportunity?: boolean;
}

export interface MosiInterview {
  id: string;
  challenge_id: string;
  company_id: string;
  stakeholder_id: string;
  status: string;
  date: string;
  duration: number;
  summary: string;
  problem_summary: string;
  potential_roi: string;
  tech_stack_recommended: string[];
  metadata: {
    stakeholder: string;
    designation: string;
    company: string;
    location: string;
    session_name: string;
  };
  transcript: TranscriptEntry[];
}

export interface ChallengePRD {
  executive_summary: string;
  problem_statement?: {
    overview: string;
    current_state?: string[];
    desired_state?: string[];
    impact?: string;
    root_causes?: string[];
    constraints?: string[];
    requirements?: string[];
    use_cases?: string[];
    fire_risks?: string[];
    current_issues?: string[];
  };
  functional_requirements?: {
    id: string;
    category: string;
    requirement: string;
    priority: string;
  }[];
  non_functional_requirements?: {
    id: string;
    category: string;
    requirement: string;
  }[];
  technical_specifications?: {
    architecture?: string;
    tech_stack_recommended?: string[];
    integration_points?: string[];
    hardware_requirements?: string[];
    frontend?: string;
    backend?: string;
    cad_integration?: string;
    nesting?: string;
    design_tools?: string[];
    semiconductor?: string;
    pcb?: string;
    testing?: string;
    hardware?: string[];
    software?: string[];
    power?: string;
    sensing?: string;
    processor?: string;
    display?: string;
    battery?: string;
    plc?: string;
    tension_control?: string;
    hmi?: string;
    data?: string;
    sensors?: string[];
    controller?: string;
    database?: string;
    ml_platform?: string;
    widget?: string;
    analytics?: string;
    nlp?: string;
    optics?: string;
    led?: string;
    gimbal?: string;
    vision?: string;
    ai?: string;
    compute?: string;
    actuator?: string;
    positioning?: string;
    vitals?: string;
    safety?: string;
    network?: string;
    wearable?: string;
  };
  success_metrics: {
    primary_kpis: {
      metric?: string;
      baseline?: string;
      target: string;
      timeframe?: string;
    }[];
    secondary_kpis?: {
      metric: string;
      baseline: string;
      target: string;
    }[];
  };
  timeline_weeks: number;
  budget_estimate: string;
  eligibility_criteria?: {
    msme_requirements: string[];
    problem_requirements: string[];
  };
  evaluation_criteria?: string[];
}

export interface NagpurNextChallenge extends MsmeChallengeListItem {
  challenge_number: number;
  official_title: string;
  domain: string;
  tech_stack: string[];
  hmw_statement: string;
  challenge_overview: string;
  student_deliverables: string[];
  expected_outcome: string;
  complexity: "Variable" | "Low" | "Medium" | "High" | "Very High";
  skills_required: string[];
  prd?: ChallengePRD;
  mosi_interviews?: MosiInterview[];
  reference_videos?: string[];
  existing_product?: string;
  proposed_solution_pdf?: string;
  industry_context?: string;
  tags: string[];
}

export const NAGPUR_NEXT_PROGRAM_META: ProgramMetadata = {
  program: "Nagpur NEXT Student Innovation Challenge 2026",
  platform: "Inpulse by InUnity",
  category: "MSME Innovation",
  program_duration: "3 months of intensive collaboration",
  format: "Student teams partnered with MSME mentors",
  culmination: "Demo Day pitch to industry leaders",
  opportunity: "Incubation support for winning solutions",
  source_document: "Nagpur_NEXT_Innovation_Challenge_Documentation.docx",
  version: "2.0.0",
  created_date: "2026-04-07",
  total_challenges: 12,
};

// Aggregate Metrics for Data Uniformity
export const NAGPUR_TOTAL_CHALLENGES = 12;
export const NAGPUR_TOTAL_APPLICANTS = 121;
export const NAGPUR_AVG_IMPACT = 8.4;

export const NAGPUR_NEXT_CHALLENGES: NagpurNextChallenge[] = [
"""

footer = "\n];\n"

# Order the challenges logically (by number)
ordered_ids = sorted(challenge_blocks.keys(), key=lambda x: int(x.split('-')[-1]))

with open(path, 'w', encoding='utf-8') as f:
    f.write(header)
    for cid in ordered_ids:
        f.write(challenge_blocks[cid] + ",\n")
    f.write(footer)

print(f"Rescue successful. Reassembled {len(ordered_ids)} unique challenges.")
