// src/constants/compliance-rules.ts
import { Project, ComplianceFlag } from '@prisma/client';

// Mocking helper functions for compliance checks
const containsProfanity = (text: string) => false;
const filterProfanity = (text: string) => text;
const containsCredentials = (text: string) => false;
const redactCredentials = (text: string) => text;
const getSpellingErrors = (text: string) => [];
const fixSpelling = (text: string) => text;

export const COMPLIANCE_RULES = [
  // Content Rules
  {
    id: 'content-001',
    name: 'Title Length',
    category: 'CONTENT',
    severity: 'WARNING',
    check: (project: any) => project.title.length >= 10 && project.title.length <= 100,
    message: 'Title should be between 10-100 characters',
    suggestion: 'Make your title descriptive but concise',
    autoFixable: false,
  },
  {
    id: 'content-002',
    name: 'Description Minimum',
    category: 'CONTENT',
    severity: 'ERROR',
    check: (project: any) => (project.fullDescription || '').length >= 200,
    message: 'Description must be at least 200 characters',
    suggestion: 'Add more details about your project\'s features and benefits',
    autoFixable: false,
  },
  {
    id: 'content-003',
    name: 'Profanity Check',
    category: 'CONTENT',
    severity: 'CRITICAL',
    check: (project: any) => !containsProfanity(project.fullDescription || ''),
    message: 'Content contains inappropriate language',
    suggestion: 'Remove or replace inappropriate terms',
    autoFixable: true,
    autoFix: (text: string) => filterProfanity(text),
  },
  
  // Documentation Rules
  {
    id: 'doc-001',
    name: 'Demo URL Required',
    category: 'DOCUMENTATION',
    severity: 'WARNING',
    check: (project: any) => !!project.demoUrl,
    message: 'Demo URL is recommended for better engagement',
    suggestion: 'Add a live demo link or video walkthrough',
    autoFixable: false,
  },
  {
    id: 'doc-002',
    name: 'Steps Documentation',
    category: 'DOCUMENTATION',
    severity: 'INFO',
    check: (project: any) => (project.steps || []).length >= 3,
    message: 'At least 3 setup/usage steps are recommended',
    suggestion: 'Document how users can set up and use your project',
    autoFixable: false,
  },
  {
    id: 'doc-003',
    name: 'Media Required',
    category: 'DOCUMENTATION',
    severity: 'WARNING',
    check: (project: any) => (project.media || []).length >= 1,
    message: 'At least one image or video is required',
    suggestion: 'Add screenshots, diagrams, or demo videos',
    autoFixable: false,
  },
  
  // Technical Rules
  {
    id: 'tech-001',
    name: 'Tech Stack Tags',
    category: 'TECHNICAL',
    severity: 'ERROR',
    check: (project: any) => (project.techStackTags || []).length >= 2,
    message: 'At least 2 tech stack tags are required',
    suggestion: 'Tag the main technologies used in your project',
    autoFixable: false,
  },
  {
    id: 'tech-002',
    name: 'Sector Tagging',
    category: 'TECHNICAL',
    severity: 'ERROR',
    check: (project: any) => (project.sectorTags || []).length >= 1,
    message: 'At least one sector tag is required',
    suggestion: 'Select the industries your project serves',
    autoFixable: false,
  },
  
  // Security Rules
  {
    id: 'sec-001',
    name: 'No Credentials in Description',
    category: 'SECURITY',
    severity: 'CRITICAL',
    check: (project: any) => !containsCredentials(project.fullDescription || ''),
    message: 'Description may contain sensitive credentials',
    suggestion: 'Remove any API keys, passwords, or tokens',
    autoFixable: true,
    autoFix: (text: string) => redactCredentials(text),
  },
  {
    id: 'sec-002',
    name: 'Secure Demo URL',
    category: 'SECURITY',
    severity: 'WARNING',
    check: (project: any) => !project.demoUrl || project.demoUrl.startsWith('https://'),
    message: 'Demo URL should use HTTPS',
    suggestion: 'Use a secure HTTPS URL for your demo',
    autoFixable: true,
    autoFix: (url: string) => url.replace('http://', 'https://'),
  },
  
  // Licensing Rules
  {
    id: 'lic-001',
    name: 'License Clarity',
    category: 'LICENSING',
    severity: 'INFO',
    check: (project: any) => (project.fullDescription || '').toLowerCase().includes('license') || 
                        (project.fullDescription || '').toLowerCase().includes('open source') ||
                        (project.fullDescription || '').toLowerCase().includes('proprietary'),
    message: 'Consider clarifying licensing terms',
    suggestion: 'Mention if your project is open source or proprietary',
    autoFixable: false,
  },
  
  // Quality Rules
  {
    id: 'qual-001',
    name: 'Spelling Check',
    category: 'QUALITY',
    severity: 'INFO',
    check: (project: any) => getSpellingErrors(project.fullDescription || '').length < 3,
    message: 'Multiple spelling errors detected',
    suggestion: 'Review and fix spelling mistakes',
    autoFixable: true,
    autoFix: (text: string) => fixSpelling(text),
  },
  {
    id: 'qual-002',
    name: 'Metrics Provided',
    category: 'QUALITY',
    severity: 'INFO',
    check: (project: any) => !!project.deployments || !!project.activeUsers || !!project.timesSaved,
    message: 'Consider adding usage metrics',
    suggestion: 'Add deployment count, active users, or time saved metrics',
    autoFixable: false,
  },
];

export async function runComplianceCheck(project: any): Promise<any> {
  const flags: any[] = [];
  let totalScore = 100;
  
  for (const rule of COMPLIANCE_RULES) {
    const passed = await rule.check(project);
    
    if (!passed) {
      flags.push({
        ruleId: rule.id,
        ruleName: rule.name,
        category: rule.category,
        severity: rule.severity,
        message: rule.message,
        suggestion: rule.suggestion,
        autoFixable: rule.autoFixable,
      });
      
      const deductions: Record<string, number> = { INFO: 2, WARNING: 5, ERROR: 15, CRITICAL: 30 };
      totalScore -= deductions[rule.severity];
    }
  }
  
  return {
    score: Math.max(0, totalScore),
    isCompliant: !flags.some(f => f.severity === 'ERROR' || f.severity === 'CRITICAL'),
    flags,
    checkedAt: new Date(),
  };
}
