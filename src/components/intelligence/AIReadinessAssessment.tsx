"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Sparkles, Activity, TrendingUp, DollarSign, Cpu } from "lucide-react"

export function AIReadinessAssessment({ recommendations }: { recommendations?: any }) {
    const context = recommendations?.context || { trl: 1, crl: 15, irl: 8 }
    
    return (
        <Card className="h-full bg-bg-surface border-border overflow-hidden relative group">
            {/* Animated Glow Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-all duration-700" />
            
            <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl font-black italic uppercase tracking-tighter">
                    <div className="p-2 rounded-xl bg-accent/10 text-accent">
                        <Cpu className="h-5 w-5" />
                    </div>
                    Readiness Audit
                </CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Real-time ecosystem compatibility mapping
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                            <Activity className="h-3.5 w-3.5 text-accent" /> Tech Maturity (TRL)
                        </span>
                        <span className="text-xs font-black">Level {context.trl}</span>
                    </div>
                    <Progress value={context.trl * 10} className="h-1.5" />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                            <TrendingUp className="h-3.5 w-3.5 text-success" /> Commercial Cap (CRL)
                        </span>
                        <span className="text-xs font-black">{context.crl}%</span>
                    </div>
                    <Progress value={context.crl} className="h-1.5" />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                            <DollarSign className="h-3.5 w-3.5 text-warning" /> Investment Index (IRL)
                        </span>
                        <span className="text-xs font-black">{context.irl}%</span>
                    </div>
                    <Progress value={context.irl} className="h-1.5" />
                </div>

                <div className="pt-4">
                    <Button className="w-full bg-accent text-bg-base hover:brightness-110 font-black uppercase tracking-widest text-[10px] h-12 rounded-2xl gap-2 shadow-xl shadow-accent/10">
                        <Sparkles className="h-4 w-4" />
                        Execute AI Sync
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
