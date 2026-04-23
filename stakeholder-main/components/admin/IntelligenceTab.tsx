"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw, BrainCircuit, Users, Heart } from "lucide-react"
import { toast } from "sonner"

export function IntelligenceTab() {
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSyncAll = async () => {
    setIsSyncing(true)
    try {
      const res = await fetch('/api/admin/intelligence/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) // Empty body triggers all
      })
      const data = await res.json()
      
      if (data.success) {
        toast("Intelligence Sync Complete", {
          description: `Processed intelligence for ${data.processed} students.`,
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast("Sync Failed", {
        description: error instanceof Error ? error.message : "Internal Server Error",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-primary/10 shadow-xl overflow-hidden group">
          <CardHeader className="bg-primary/5 pb-4">
            <BrainCircuit className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle>Weekly Summaries</CardTitle>
            <CardDescription>Synthesize student tool outputs and interactions into actionable reports.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Button 
                onClick={handleSyncAll} 
                className="w-full font-black uppercase tracking-widest text-[10px]"
                disabled={isSyncing}
            >
              {isSyncing ? <RefreshCw className="mr-2 h-3 w-3 animate-spin" /> : <Sparkles className="mr-2 h-3 w-3" />}
              Trigger Bulk Sync
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/10 shadow-xl overflow-hidden group">
          <CardHeader className="bg-primary/5 pb-4">
            <Heart className="h-8 w-8 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle>Loveability Engine</CardTitle>
            <CardDescription>Calculate passion and problem-fit scores based on engagement metrics.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-4">Frequency: Hourly (Auto)</p>
            <Button variant="outline" className="w-full font-black uppercase tracking-widest text-[10px]">
                View Global Metrics
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/10 shadow-xl overflow-hidden group">
          <CardHeader className="bg-primary/5 pb-4">
            <Users className="h-8 w-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle>Auto-Tagging</CardTitle>
            <CardDescription>Extract sector expertise and interest tags from stakeholder interactions.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-4">Source: Interaction Topics</p>
            <Button variant="outline" className="w-full font-black uppercase tracking-widest text-[10px]">
                Rebuild Tag Cloud
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-primary/10 shadow-xl">
        <CardHeader>
            <CardTitle className="text-xl font-black italic uppercase tracking-tighter">Recent Intelligence Jobs</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="rounded-xl border bg-muted/30 p-8 text-center">
                <p className="text-sm text-muted-foreground font-medium italic">Job logs will appear here once bulk sync is triggered.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
