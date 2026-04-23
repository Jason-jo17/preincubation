'use client';

import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoUploadPage() {
    const router = useRouter();
    const [mockUploading, setMockUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const handleMockUpload = () => {
        setMockUploading(true);
        setTimeout(() => {
            setMockUploading(false);
            setUploadComplete(true);
        }, 1500); // Quick delay for effect
    };

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold tracking-tight">Add Companies</h1>
                </div>
                <p className="text-muted-foreground">Stage 1: Bulk upload MSMEs for analysis.</p>
            </div>

            <FunnelProgress
                currentStage={1}
                stageStatuses={{
                    stage_1_status: 'pending',
                    stage_2_status: 'pending',
                    stage_3_status: 'pending',
                    stage_4_status: 'pending',
                    stage_5_status: 'pending',
                    stage_6_status: 'pending'
                }}
                passedFilters={{}}
            />

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Bulk Data Import</CardTitle>
                        <CardDescription>Process strategic MSME datasets for regional intelligence.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!uploadComplete ? (
                            <div className="border-2 border-dashed rounded-lg p-10 text-center space-y-4">
                                <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">msme_intelligence_v1.csv (System Default)</p>
                                <Button onClick={handleMockUpload} disabled={mockUploading}>
                                    {mockUploading ? "Processing..." : "Process Import"}
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in duration-300">
                                <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
                                <h3 className="text-xl font-semibold">Upload Successful!</h3>
                                <p className="text-muted-foreground">30 companies added to the funnel.</p>
                                <Button className="w-full" onClick={() => router.push('/funnel-demo')}>
                                    View Dashboard
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="opacity-50 pointer-events-none">
                    <CardHeader>
                        <CardTitle>Manual Entry</CardTitle>
                        <CardDescription>Restricted to Administrator Role</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-40 bg-muted/20 rounded border border-dashed flex items-center justify-center">
                            <span className="text-muted-foreground">Manual entry disabled</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
