import { GapAnalysis } from '@/lib/types/gap-analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GripHorizontal } from 'lucide-react';
import Link from 'next/link';

interface GapRecommendationsProps {
    analysis: GapAnalysis;
}

export function GapRecommendations({ analysis }: GapRecommendationsProps) {
    return (
        <Card className="bg-muted/30">
            <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {analysis.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-card border shadow-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            {i + 1}
                        </div>
                        <div>
                            <p className="font-medium">{rec}</p>
                        </div>
                    </div>
                ))}

                <div className="pt-4 flex justify-end">
                    <Link href={`/companies/${analysis.company_id}/roadmap`}>
                        <Button>
                            Generate Implementation Roadmap
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
