'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FundingRound } from '@/lib/types/company';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';

interface FundingTimelineProps {
    fundingRounds?: FundingRound[];
}

export function FundingTimeline({ fundingRounds }: FundingTimelineProps) {
    if (!fundingRounds || fundingRounds.length === 0) {
        return (
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Funding History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">No funding history available.</p>
                </CardContent>
            </Card>
        )
    }

    // Sort by date
    const sortedRounds = [...fundingRounds].sort((a, b) =>
        new Date(b.announced_date).getTime() - new Date(a.announced_date).getTime()
    );

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Funding History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8 pl-2">
                    {sortedRounds.map((round, index) => (
                        <div key={round.id} className="relative border-l pl-6 pb-2 last:pb-0">
                            {/* Dot */}
                            <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-base">{round.round_type}</span>
                                    <span className="text-sm text-muted-foreground">{formatDate(round.announced_date)}</span>
                                </div>
                                <div className="text-lg font-bold text-foreground">
                                    {formatCurrency(round.amount_raised)}
                                </div>
                                {round.lead_investors && round.lead_investors.length > 0 && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Investors: {round.lead_investors.join(', ')}
                                    </p>
                                )}
                                {round.valuation && (
                                    <p className="text-xs text-muted-foreground">
                                        Valuation: {formatCurrency(round.valuation)}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
