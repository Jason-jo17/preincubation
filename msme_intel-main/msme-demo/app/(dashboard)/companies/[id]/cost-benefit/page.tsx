"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

export default function CostBenefitPage() {
    const params = useParams()
    // Mock data - in real app, fetch from /api/companies/{id}/roadmaps or similar

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Cost vs Benefit Analysis</h2>
                    <p className="text-muted-foreground">Strategic ROI assessment for proposed roadmap.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Cost Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><DollarSign className="mr-2 h-5 w-5 text-red-500" /> Projected Costs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Implementation</span>
                            <span className="font-bold">₹ 5,00,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Technology Stack</span>
                            <span className="font-bold">₹ 2,50,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Training & Upskilling</span>
                            <span className="font-bold">₹ 1,00,000</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total Investment</span>
                            <span>₹ 8,50,000</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Benefit Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-green-500" /> Projected Benefits (12M)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Revenue Increase (20%)</span>
                            <span className="font-bold">₹ 15,00,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Cost Savings</span>
                            <span className="font-bold">₹ 4,00,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Efficiency Gain</span>
                            <span className="font-bold">₹ 3,50,000</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total Value</span>
                            <span>₹ 22,50,000</span>
                        </div>
                    </CardContent>
                </Card>

                {/* ROI Summary */}
                <Card className="bg-slate-50 dark:bg-slate-900 border-2 border-primary/20">
                    <CardHeader>
                        <CardTitle>ROI Projections</CardTitle>
                        <CardDescription>Expected return on investment over 12 months</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-4 py-4">
                        <div className="text-5xl font-bold text-primary">2.6x</div>
                        <Badge variant="outline" className="text-lg px-4 py-1">High Potential</Badge>
                        <div className="text-center text-sm text-muted-foreground mt-4">
                            Based on successful implementation of Phase 1 & 2 roadmap initiatives.
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Strategic Fit */}
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Strategic Value Proposition</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold">Market Penetration</h4>
                                    <p className="text-sm text-muted-foreground">Addresses critical gap in Tier-2 city logistics, aligning with current expansion thesis.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold">Innovation Leadership</h4>
                                    <p className="text-sm text-muted-foreground">Proprietary logic for last-mile delivery matches &quot;Tech-First&quot; investment criteria.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <AlertCircle className="h-6 w-6 text-amber-500 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold">Risk Factor: Talent</h4>
                                    <p className="text-sm text-muted-foreground">Key technical leadership is thin; requires immediate hiring support (budgeted in Cost).</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
