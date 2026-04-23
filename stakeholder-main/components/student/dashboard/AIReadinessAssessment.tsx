"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Sparkles, Activity, TrendingUp, DollarSign } from "lucide-react"

export function AIReadinessAssessment({ recommendations }: { recommendations?: any }) {
    const context = recommendations?.context || { trl: 1, crl: 0, irl: 0 }
    return (
        <Card className="h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-100 dark:border-indigo-900">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    AI Readiness Assessment
                </CardTitle>
                <CardDescription className="text-sm">
                    Real-time evaluation of your project's maturity levels
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                            <Activity className="h-4 w-4 text-blue-500" /> Technology Readiness (TRL)
                        </span>
                        <span className="font-bold">Level {context.trl}</span>
                    </div>
                    <Progress value={context.trl * 10} className="h-2 bg-blue-100 dark:bg-blue-950/50" />
                    <p className="text-xs text-muted-foreground">Lab validation in progress.</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                            <TrendingUp className="h-4 w-4 text-emerald-500" /> Commercial Readiness (CRL)
                        </span>
                        <span className="font-bold">{context.crl}%</span>
                    </div>
                    <Progress value={context.crl} className="h-2 bg-emerald-100 dark:bg-emerald-950/50" />
                    <p className="text-xs text-muted-foreground">Market applications identified.</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                            <DollarSign className="h-4 w-4 text-amber-500" /> Investment Readiness (IRL)
                        </span>
                        <span className="font-bold">{context.irl}%</span>
                    </div>
                    <Progress value={context.irl} className="h-2 bg-amber-100 dark:bg-amber-950/50" />
                    <p className="text-xs text-muted-foreground">Initial problem/solution fit.</p>
                </div>

                <div className="pt-2">
                    <Button suppressHydrationWarning className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-md transition-all">
                        <Sparkles className="h-4 w-4" />
                        Run AI Assessment
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
