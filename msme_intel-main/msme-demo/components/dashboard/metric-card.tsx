"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface MetricCardProps {
    title: string
    value: string | number
    change?: number
    icon: React.ReactNode
    description: string
    trend?: "up" | "down"
    sparklineData?: number[]
}

export function MetricCard({
    title,
    value,
    change,
    icon,
    description,
    trend = "up",
    sparklineData,
}: MetricCardProps) {
    const isPositive = (change ?? 0) >= 0;
    const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
    const changeColor = isPositive ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="border-slate-200/60 shadow-sm transition-all hover:shadow-md h-full">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">{title}</p>
                                <div className="text-2xl font-bold tracking-tight text-slate-900">{value}</div>
                            </div>
                            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500">
                                {icon}
                            </div>
                        </div>
                        
                        <div className="mt-4 flex items-center gap-2">
                            {change !== undefined && (
                                <div className={cn(
                                    "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold",
                                    changeColor
                                )}>
                                    <TrendIcon className="h-3 w-3" />
                                    <span>{Math.abs(change).toFixed(1)}%</span>
                                </div>
                            )}
                            <p className="text-[11px] text-slate-500 font-medium">{description}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
