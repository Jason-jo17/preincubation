'use client';

import { useParams } from 'next/navigation';
import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

export default function FinancialsPage() {
    const params = useParams();
    const companyId = params.id as string;

    const handleSubmit = () => {
        // Mock submission
        window.location.href = `/funnel/${companyId}/rag-classification`;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Financial Health Check</h1>
                <p className="text-muted-foreground">Stage 3: Verify and analyze basic financial metrics.</p>
            </div>

            <FunnelProgress
                currentStage={3}
                stageStatuses={{
                    stage_1_status: 'complete',
                    stage_2_status: 'complete',
                    stage_3_status: 'pending', // Current
                    stage_4_status: 'pending',
                    stage_5_status: 'pending',
                    stage_6_status: 'pending'
                }}
                passedFilters={{
                    passed_stage_2_filter: true
                }}
            />

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Enter Financial Data</CardTitle>
                        <CardDescription>
                            Input latest fiscal year data. We&apos;ll cross-reference with MCA where possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="revenue">Annual Revenue (₹ Lakhs)</Label>
                                <Input id="revenue" placeholder="0.00" type="number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="profit">Net Profit (₹ Lakhs)</Label>
                                <Input id="profit" placeholder="0.00" type="number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ebitda">EBITDA Margin (%)</Label>
                                <Input id="ebitda" placeholder="0%" type="number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cagr">3-Year CAGR (%)</Label>
                                <Input id="cagr" placeholder="0%" type="number" />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button onClick={handleSubmit}>Validate & Save Financials</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>MCA Data</CardTitle>
                        <CardDescription>Auto-fetched from database</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Authorized Capital</span>
                                <span className="font-medium">₹ 10.0L</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Paid-up Capital</span>
                                <span className="font-medium">₹ 1.0L</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Status</span>
                                <span className="font-medium text-green-600 flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Active
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
