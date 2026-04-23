import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Factory, FileText, Zap } from "lucide-react";
import Link from "next/link";

export default function GTMExpansionPRD() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6 bg-slate-50/30 min-h-screen">
            <div className="mb-6">
                <Link href="/programs" className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
                </Link>
            </div>
            
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        PRD: GTM Pre-Incubation Cohort <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">TRL 5-7</Badge>
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Product Requirements Document for Go-To-Market and Expansion Accelerators.
                    </p>
                </div>
            </div>

            <Card className="border-purple-100 shadow-sm mt-6">
                <CardHeader className="bg-purple-50/50 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-600" />
                        1. Executive Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-slate-700">
                    <p>
                        <strong>Objective:</strong> To assist MSMEs with validated products (TRL 5+) in scaling their market presence, optimizing sales funnels, and penetrating new geographical territories.
                    </p>
                    <p>
                        <strong>Target Audience:</strong> 
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Challengers:</strong> Marketing agencies, growth hackers, and MBAs.</li>
                        <li><strong>Problem Sponsors (Seekers):</strong> MSMEs struggling with brand positioning, D2C transitions, or low marketing ROI.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 border-b pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-amber-500" />
                        2. Key Features & Workflow
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2">Phase 1: Brand Audit & Funnel Diagnostics</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Comprehensive review of current sales channels.</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Benchmarking against competitors and identifying leakages in Customer Acquisition Cost (CAC).</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2">Phase 2: Strategy Sprint</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> 2-week intensive workshop on digital marketing, SEO, and distribution network design.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
