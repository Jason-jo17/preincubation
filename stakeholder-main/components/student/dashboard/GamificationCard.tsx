"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Zap, ChevronUp } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { calculateLevel, getXPForLevel } from "@/lib/gamification-engine"

export function GamificationCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['student-intelligence'],
    queryFn: async () => {
      const res = await fetch('/api/student/intelligence')
      return res.json()
    }
  })

  if (isLoading) return <div className="h-[200px] w-full animate-pulse bg-muted rounded-xl" />

  const stats = data?.gamification || { xp: 0, points: 0, level: 1 }
  const currentXP = stats.xp
  const currentLevel = stats.level
  const nextLevelXP = getXPForLevel(currentLevel + 1)
  const currentLevelBaseXP = getXPForLevel(currentLevel)
  const progressInLevel = currentXP - currentLevelBaseXP
  const xpNeededForNext = nextLevelXP - currentLevelBaseXP
  const progressPercent = Math.min(100, Math.max(0, (progressInLevel / xpNeededForNext) * 100))

  return (
    <Card className="relative overflow-hidden border-2 border-amber-500/20 shadow-lg bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Trophy className="h-24 w-24 text-amber-600" />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-widest text-amber-600">Innovator Rank</h4>
                <CardTitle className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
                    Level {currentLevel}
                    <div className="bg-amber-100 dark:bg-amber-900/40 p-1 rounded-md">
                        <Star className="h-4 w-4 text-amber-600 fill-amber-600" />
                    </div>
                </CardTitle>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Current XP</p>
                <p className="text-lg font-black text-amber-700 dark:text-amber-400">{currentXP.toLocaleString()}</p>
            </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold">
                <span className="text-muted-foreground uppercase">Progress to Level {currentLevel + 1}</span>
                <span className="text-amber-700">{Math.round(progressPercent)}%</span>
            </div>
            <div className="relative h-3 w-full bg-amber-100 dark:bg-amber-950/50 rounded-full overflow-hidden border border-amber-200/50">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>
            <p className="text-[10px] text-center text-muted-foreground italic">
                {xpNeededForNext - progressInLevel} XP remaining for next rank
            </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg border border-amber-100/50 flex items-center gap-3">
                <div className="bg-amber-500 p-1.5 rounded-md">
                    <Zap className="h-3 w-3 text-white fill-white" />
                </div>
                <div>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Points</p>
                    <p className="text-sm font-black">{stats.points.toLocaleString()}</p>
                </div>
            </div>
            <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg border border-amber-100/50 flex items-center gap-3">
                <div className="bg-blue-500 p-1.5 rounded-md">
                    <ChevronUp className="h-3 w-3 text-white" />
                </div>
                <div>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Badge</p>
                    <p className="text-sm font-black italic">Pioneer</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
