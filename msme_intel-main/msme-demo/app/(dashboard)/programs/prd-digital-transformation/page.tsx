import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Factory, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { isDemoMode } from "@/lib/config";

export default function DigitalTransformationPRD() {
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
                        PRD: Build 4 X Open Innovation Challenge <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">TRL 3-5</Badge>
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Product Requirements Document for the MSME Digital Transformation Program.
                    </p>
                </div>
            </div>

            <Card className="border-indigo-100 shadow-sm mt-6">
                <CardHeader className="bg-indigo-50/50 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-600" />
                        1. Executive Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-slate-700">
                    <p>
                        <strong>Objective:</strong> To bridge the technology gap for traditional MSMEs by crowd-sourcing digital solutions (ERP, IoT, Automation) from top student and startup talent through an incentivized challenge framework.
                    </p>
                    <p>
                        <strong>Target Audience:</strong> 
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Challengers:</strong> T-School students, early-stage tech startups (TRL 3-5).</li>
                        <li><strong>Problem Sponsors (Seekers):</strong> MSMEs with manual processes and low digital penetration scoring &gt; 60% on our Gap Analysis.</li>
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
                        <h4 className="font-bold text-slate-900 mb-2">Phase 1: Problem Statement Curation</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Direct extraction of pain points from MSME Gap Analysis reports.</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Vetting by industry experts for technical feasibility.</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Publishing to the Build 4 X portal for talent matching.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2">Phase 2: Solution Procurement</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> 48-Hour Makeathon focusing on low-code/no-code and scalable MVP stacks.</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Minimum requirement: Functional UI and mock API database.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2">Phase 3: Integration & Incubation</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Top 3 solutions selected by the MSME sponsor.</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Paid pilot contract awarded (₹1.5L - ₹3L).</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> Teams placed in Pre-Incubation for legal entity formation (TRL 5+).</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 border-b pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Factory className="h-5 w-5 text-slate-600" />
                        3. Success Metrics (KPIs)
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-3 gap-4">
                     <div className="p-4 bg-slate-50 rounded border">
                        <p className="text-xl font-bold">15+</p>
                        <p className="text-xs font-semibold uppercase text-muted-foreground mt-1">MSME Sponsors Acquired</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded border">
                        <p className="text-xl font-bold">50%</p>
                        <p className="text-xs font-semibold uppercase text-muted-foreground mt-1">Prototype to Pilot Ratio</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded border">
                        <p className="text-xl font-bold">₹25L</p>
                        <p className="text-xs font-semibold uppercase text-muted-foreground mt-1">Total Pilot Funding Unlocked</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
