
'use client';

import { useParams, useRouter } from 'next/navigation';
import { getSectorThesis } from '@/lib/demo-data/sector-thesis';
import { isDemoMode } from '@/lib/config';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SectorThesisDetail } from '@/components/sectors/sector-thesis-detail';

export default function SectorThesisPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const thesis = getSectorThesis(id);

    if (!thesis) {
        return (
            <div className="space-y-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sectors
                </Button>
                <div className="text-center py-20">
                    <h2 className="text-xl font-semibold">Thesis Not Found</h2>
                    <p className="text-muted-foreground">Detailed thesis for this sector is currently being drafted.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 page-transition">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1 flex items-center justify-between">
                    <PageHeader
                        title={`${thesis.display_name} Thesis`}
                        description={`Published: ${thesis.research_date} • Status: ${thesis.status}`}
                    />
                </div>
            </div>

            <SectorThesisDetail thesis={thesis} />
        </div>
    );
}
