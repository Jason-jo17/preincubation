import { GapAnalysis, VerticalAnalysis } from '@/lib/types/gap-analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface GapVerticalCardsProps {
    analysis: GapAnalysis;
}

function getRagColor(score: number): string {
    if (score >= 80) return 'text-rag-green border-rag-green/20 bg-rag-green/10';
    if (score >= 50) return 'text-rag-amber border-rag-amber/20 bg-rag-amber/10';
    return 'text-rag-red border-rag-red/20 bg-rag-red/10';
}

export function GapVerticalCards({ analysis }: GapVerticalCardsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {analysis.vertical_analyses.map((vertical) => (
                <Card key={vertical.vertical_name} className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-semibold">
                            {vertical.vertical_name}
                        </CardTitle>
                        <Badge variant="outline" className={cn("font-bold", getRagColor(vertical.score))}>
                            {vertical.score}/100
                        </Badge>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4 pt-4">
                        {/* Gaps */}
                        <div>
                            <h5 className="mb-2 text-sm font-medium flex items-center gap-2 text-rag-red">
                                <AlertCircle className="h-4 w-4" />
                                Critical Gaps
                            </h5>
                            <ul className="space-y-1">
                                {vertical.gaps.slice(0, 3).map((gap, i) => (
                                    <li key={i} className="text-sm text-muted-foreground list-disc ml-4">
                                        {gap}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Opportunities */}
                        <div>
                            <h5 className="mb-2 text-sm font-medium flex items-center gap-2 text-rag-green">
                                <CheckCircle2 className="h-4 w-4" />
                                Opportunities
                            </h5>
                            <ul className="space-y-1">
                                {vertical.opportunities.slice(0, 3).map((opp, i) => (
                                    <li key={i} className="text-sm text-muted-foreground list-disc ml-4">
                                        {opp}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
