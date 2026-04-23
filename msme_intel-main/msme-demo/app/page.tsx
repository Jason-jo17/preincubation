'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileSpreadsheet, Target, TrendingUp, Map } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                    🎯 Platform Overview
                </div>
                <h1 className="text-5xl font-bold mb-6">
                    MSME Intelligence Platform
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Multi-stage funnel that analyzes companies from upload to roadmap generation
                    with AI-powered scoring, RAG classification, and comprehensive gap analysis.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/funnel-demo">
                        <Button size="lg">
                            Explore Platform
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/demo-flow">
                        <Button variant="outline" size="lg">
                            Guided Tour
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    6-Stage Analysis Funnel
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            icon: <FileSpreadsheet className="h-8 w-8 text-primary" />,
                            title: 'Stage 1: Upload',
                            description: '30 pre-loaded companies. CSV upload or manual entry.',
                        },
                        {
                            icon: <Target className="h-8 w-8 text-primary" />,
                            title: 'Stage 2: Thesis Scoring',
                            description: 'AI-powered scoring with evidence points (3-5 sec simulation).',
                        },
                        {
                            icon: <TrendingUp className="h-8 w-8 text-primary" />,
                            title: 'Stage 3: Financials',
                            description: 'Revenue, CAGR, balance sheet. Auto-calculate ratios.',
                        },
                        {
                            icon: <div className="text-3xl">🚦</div>,
                            title: 'Stage 4: RAG Classification',
                            description: 'Red/Amber/Green: Stretched Fit, Best Fit, Best Bet.',
                        },
                        {
                            icon: <div className="text-3xl">🔍</div>,
                            title: 'Stage 5: Gap Analysis',
                            description: '8-dimension diagnostic with radar chart visualization.',
                        },
                        {
                            icon: <Map className="h-8 w-8 text-primary" />,
                            title: 'Stage 6: Roadmap + ROI',
                            description: '6-month roadmap with cost-benefit analysis.',
                        },
                    ].map((feature, idx) => (
                        <Card key={idx}>
                            <CardHeader>
                                <div className="mb-2">{feature.icon}</div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Demo Stats */}
            <section className="bg-muted py-16">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-4 text-center">
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">30</div>
                            <div className="text-sm text-muted-foreground">Sample Companies</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">45%</div>
                            <div className="text-sm text-muted-foreground">Funnel Conversion</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">15</div>
                            <div className="text-sm text-muted-foreground">Best Bet Companies</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">200%</div>
                            <div className="text-sm text-muted-foreground">Avg ROI</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to explore the platform?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    No signup required. All data is pre-loaded. Experience the complete funnel in action.
                </p>
                <Link href="/funnel-demo">
                    <Button size="lg">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </section>
        </div>
    );
}
