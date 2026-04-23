
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const DEMO_STEPS = [
    {
        step: 1,
        title: 'Browse Companies',
        description: 'Explore 30 pre-loaded MSME companies across 3 sectors',
        link: '/companies',
        completed: false,
    },
    {
        step: 2,
        title: 'View Company Profile',
        description: 'See detailed company information, financials, and funding',
        link: '/companies/comp-001',
        completed: false,
    },
    {
        step: 3,
        title: 'Run Gap Analysis',
        description: 'Analyze company across 6 verticals and 9 dimensions',
        link: '/companies/comp-001/analyze',
        completed: false,
    },
    {
        step: 4,
        title: 'Generate Roadmap',
        description: 'Create a 6-month strategic roadmap',
        link: '/companies/comp-001/roadmap',
        completed: false,
    },
    {
        step: 5,
        title: 'Explore Ecosystem',
        description: 'Browse matched service providers',
        link: '/companies/comp-001/ecosystem',
        completed: false,
    },
];

export default function DemoFlowPage() {
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Demo Walkthrough</h1>
                <p className="text-muted-foreground mt-2">
                    Follow this guided tour to see all platform capabilities
                </p>
            </div>

            <div className="space-y-4">
                {DEMO_STEPS.map((demoStep) => (
                    <Card key={demoStep.step}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>
                                    Step {demoStep.step}: {demoStep.title}
                                </span>
                                {completedSteps.includes(demoStep.step) && (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">{demoStep.description}</p>
                            <Link href={demoStep.link}>
                                <Button>
                                    Go to {demoStep.title}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
