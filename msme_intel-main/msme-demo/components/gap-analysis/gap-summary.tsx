import { GapAnalysis, RAGScore } from '@/lib/types/gap-analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GapSummaryProps {
    analysis: GapAnalysis;
}

function RagBadge({ count, type }: { count: number; type: RAGScore }) {
    const colors = {
        red: 'bg-rag-red text-white',
        amber: 'bg-rag-amber text-white',
        green: 'bg-rag-green text-white',
    };

    return (
        <div className={`flex flex-col items-center justify-center p-4 rounded-lg flex-1 ${colors[type]}`}>
            <span className="text-3xl font-bold">{count}</span>
            <span className="text-sm font-medium uppercase tracking-wider">{type}</span>
        </div>
    )
}

export function GapSummary({ analysis }: GapSummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="text-4xl font-bold text-primary mb-1">{analysis.overall_score}</div>
                        <div className="text-sm text-muted-foreground">Overall Maturity Score</div>
                    </div>
                    <div className="flex gap-2 flex-[2]">
                        <RagBadge count={analysis.rag_distribution.green} type="green" />
                        <RagBadge count={analysis.rag_distribution.amber} type="amber" />
                        <RagBadge count={analysis.rag_distribution.red} type="red" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Key Strengths</h4>
                        <ul className="list-disc ml-4 space-y-1 text-sm text-muted-foreground">
                            {analysis.key_strengths.map((str, i) => <li key={i}>{str}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Top Opportunities</h4>
                        <ul className="list-disc ml-4 space-y-1 text-sm text-muted-foreground">
                            {analysis.top_opportunities.map((opp, i) => <li key={i}>{opp}</li>)}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
