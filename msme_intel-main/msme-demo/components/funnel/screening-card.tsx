import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Target, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"

interface ScreeningCardProps {
    classification: "best_bet" | "best_fit" | "stretched_fit" | "rejected" | string
    thesisScore: number
    financialScore: number
    marketOppScore: number
    proofs?: string
}

export function ScreeningCard({
    classification,
    thesisScore,
    financialScore,
    marketOppScore,
    proofs
}: ScreeningCardProps) {

    const getClassificationColor = (cls: string) => {
        switch (cls) {
            case "best_bet": return "bg-green-500 hover:bg-green-600"
            case "best_fit": return "bg-emerald-500 hover:bg-emerald-600"
            case "stretched_fit": return "bg-amber-500 hover:bg-amber-600"
            case "rejected": return "bg-red-500 hover:bg-red-600"
            default: return "bg-slate-500"
        }
    }

    const getLabel = (cls: string) => {
        return cls.replace('_', ' ').toUpperCase()
    }

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">Screening Analysis</CardTitle>
                    <Badge className={getClassificationColor(classification)}>
                        {getLabel(classification)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1"><Target className="h-3 w-3" /> Thesis Alignment</span>
                        <span className="font-bold">{thesisScore}/100</span>
                    </div>
                    <Progress value={thesisScore} className="h-2" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Financial Health</span>
                        <span className="font-bold">{financialScore}/100</span>
                    </div>
                    <Progress value={financialScore} className="h-2" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> Market Opportunity</span>
                        <span className="font-bold">{marketOppScore}/100</span>
                    </div>
                    <Progress value={marketOppScore} className="h-2" />
                </div>

                {proofs && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
                        <p className="font-medium mb-1">Thesis Proof Points:</p>
                        <div className="text-muted-foreground whitespace-pre-wrap text-xs">
                            {proofs}
                        </div>
                    </div>
                )}

                <div className="pt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between p-2 border rounded-md bg-background">
                        <span className="text-xs font-medium">Detailed Report</span>
                        <div className="h-4 w-4 rounded-full border border-primary bg-primary" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md bg-background">
                        <span className="text-xs font-medium">Market Analysis</span>
                        <div className="h-4 w-4 rounded-full border border-primary bg-primary" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md bg-background">
                        <span className="text-xs font-medium">Risk Assessment</span>
                        <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md bg-background">
                        <span className="text-xs font-medium">Sector Thesis</span>
                        <div className="h-4 w-4 rounded-full border border-primary bg-primary" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
