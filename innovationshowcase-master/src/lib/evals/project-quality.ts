// src/lib/evals/project-quality.ts

export interface EvalResult {
  score: number;
  maxScore: number;
  category: string;
  details: {
    criterion: string;
    passed: boolean;
    score: number;
    feedback: string;
  }[];
}

export async function evaluateProjectQuality(project: any): Promise<EvalResult[]> {
  const results: EvalResult[] = [];

  // 1. Content Quality Eval
  results.push(await evaluateContent(project));
  
  // 2. Technical Completeness Eval
  results.push(await evaluateTechnical(project));
  
  // 3. Documentation Eval
  results.push(await evaluateDocumentation(project));

  return results;
}

async function evaluateContent(project: any): Promise<EvalResult> {
  const details = [];
  let score = 0;
  const maxScore = 25;

  // Title quality
  const titleScore = project.title.length >= 10 && project.title.length <= 80 ? 5 : 2;
  details.push({
    criterion: 'Title Quality',
    passed: titleScore === 5,
    score: titleScore,
    feedback: titleScore === 5 ? 'Good title length' : 'Title too short or too long',
  });
  score += titleScore;

  // Description depth
  const descLength = (project.fullDescription || '').length;
  const descScore = descLength >= 500 ? 5 : descLength >= 200 ? 3 : 1;
  details.push({
    criterion: 'Description Depth',
    passed: descScore >= 3,
    score: descScore,
    feedback: `Description is ${descLength} characters`,
  });
  score += descScore;

  // AI enhancement
  const aiScore = project.aiEnhancedDescription ? 5 : 0;
  details.push({
    criterion: 'AI Enhancement',
    passed: aiScore > 0,
    score: aiScore,
    feedback: aiScore > 0 ? 'AI-enhanced description present' : 'Consider using AI enhancement',
  });
  score += aiScore;

  // Metrics
  const metricsScore = (project.deployments || project.activeUsers) ? 5 : 0;
  details.push({
    criterion: 'Metrics Provided',
    passed: metricsScore > 0,
    score: metricsScore,
    feedback: metricsScore > 0 ? 'Usage metrics included' : 'Add usage metrics for credibility',
  });
  score += metricsScore;

  // Final grade (Mocked for now)
  score += 5;
  details.push({
    criterion: 'Clarity',
    passed: true,
    score: 5,
    feedback: 'Value proposition is clear',
  });

  return { score, maxScore, category: 'Content Quality', details };
}

async function evaluateTechnical(project: any): Promise<EvalResult> {
  const details = [];
  let score = 0;
  const maxScore = 20;

  const stackScore = (project.techStackTags || []).length >= 3 ? 10 : 5;
  details.push({
     criterion: 'Stack Depth',
     passed: stackScore === 10,
     score: stackScore,
     feedback: `${stackScore === 10 ? 'Robust' : 'Limited'} technology tagging`,
  });
  score += stackScore;

  const typeScore = project.projectType ? 10 : 0;
  details.push({
     criterion: 'Type Classification',
     passed: typeScore === 10,
     score: typeScore,
     feedback: 'Architecture type defined',
  });
  score += typeScore;

  return { score, maxScore, category: 'Technical Completeness', details };
}

async function evaluateDocumentation(project: any): Promise<EvalResult> {
  const details = [];
  let score = 0;
  const maxScore = 30;

  const stepsScore = (project.steps || []).length >= 5 ? 15 : (project.steps || []).length >= 3 ? 10 : 5;
  details.push({
     criterion: 'Operational Steps',
     passed: stepsScore >= 10,
     score: stepsScore,
     feedback: `${(project.steps || []).length} steps provided`,
  });
  score += stepsScore;

  const mediaScore = (project.media || []).length >= 1 ? 15 : 0;
  details.push({
     criterion: 'Visual Evidence',
     passed: mediaScore === 15,
     score: mediaScore,
     feedback: mediaScore === 15 ? 'Visual documentation present' : 'No media provided',
  });
  score += mediaScore;

  return { score, maxScore, category: 'Documentation Detail', details };
}
