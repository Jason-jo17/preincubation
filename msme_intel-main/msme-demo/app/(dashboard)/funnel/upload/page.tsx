'use client';

import { CSVUploader } from '@/components/funnel/csv-uploader';
import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FunnelUploadPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Companies</h1>
                <p className="text-muted-foreground">Stage 1: Bulk upload MSMEs for analysis.</p>
            </div>

            {/* Static progress for Upload stage */}
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
                <div className="space-y-6">
                    <CSVUploader />
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manual Entry</CardTitle>
                            <CardDescription>Add a single company for quick analysis.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                                Manual entry form coming soon.
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-2">
                            <p>• Ensure valid CIN numbers for automatic MCA data fetching.</p>
                            <p>• Sector names should match predefined sectors for accurate thesis scoring.</p>
                            <p>• Upload limit: 500 records per batch.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
