
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { AnimatedLoading } from '@/components/shared/animated-loading';
import { simulateLoading } from '@/lib/utils/simulate-loading';
import { getRoadmap } from '@/lib/demo-data/roadmaps';
import { RoadmapTimeline } from '@/components/roadmap/roadmap-timeline';
import { RoadmapMilestones } from '@/components/roadmap/roadmap-milestones';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { AlertCircle, Zap } from 'lucide-react';

export default function RoadmapPage({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [roadmap, setRoadmap] = useState<any>(null);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const loadRoadmap = async () => {
            // Simulate animation delay for roadmap generation
            await simulateLoading(4000);

            const data = getRoadmap(params.id);
            if (data) {
                setRoadmap(data);
                toast({
                    title: "Roadmap Generated",
                    description: "Strategic implementation plan created successfully.",
                })
            }
            setIsLoading(false);
        };

        loadRoadmap();
    }, [params.id, toast]);

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-3xl mx-auto pt-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Generating Strategic Roadmap</h2>
                    <p className="text-muted-foreground">Tailoring milestones based on gap analysis results...</p>
                </div>
                <AnimatedLoading type="roadmap" />
            </div>
        );
    }

    if (!roadmap) {
        return (
            <div className="space-y-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div className="text-center py-20">
                    <h2 className="text-xl font-semibold">Roadmap Not Available</h2>
                    <p className="text-muted-foreground">Demo roadmap is only available for select companies (e.g., TechForge).</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 page-transition">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <PageHeader
                        title="Strategic Roadmap"
                        description="6-month implementation plan with key milestones."
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button variant="default" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                    <TabsTrigger value="milestones">Milestone Details</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-6">
                    <RoadmapTimeline roadmap={roadmap} />
                </TabsContent>

                <TabsContent value="milestones" className="mt-6">
                    <RoadmapMilestones milestones={roadmap.milestones} />
                </TabsContent>
      </Tabs>

      <ExpertReviewsSection roadmapId={roadmap.id} />
    </div>
  );
}

function ExpertReviewsSection({ roadmapId }: { roadmapId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  useEffect(() => {
    fetch(`${API}/api/roadmaps/${roadmapId}/reviews`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(err => console.error("Expert review fetch error:", err));
  }, [roadmapId, API]);

  if (reviews.length === 0) return null;

  const verdictColor = (v: string) =>
    v === 'approved' ? 'text-green-600' :
    v === 'approved_with_changes' ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="space-y-4 mt-12 border-t pt-8">
      <h3 className="text-xl font-bold flex items-center gap-2">
        Expert Validations
        <Badge variant="secondary" className="px-2 py-0 h-5">{reviews.length}</Badge>
      </h3>
      <div className="grid gap-6">
        {reviews.map(review => (
          <Card key={review.id} className="border-slate-100 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {review.expert_profiles?.name?.[0] || 'E'}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{review.expert_profiles?.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{review.expert_profiles?.credentials}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-xs uppercase tracking-tight ${verdictColor(review.overall_verdict)}`}>
                    {review.overall_verdict?.replace(/_/g, ' ')}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">Confidence: {review.confidence_score}/10</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm leading-relaxed text-slate-700 italic">"{review.overall_comment}"</p>
              
              {review.expert_additions?.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Expert Enhancements ({review.expert_additions.length})
                  </p>
                  <div className="grid gap-2">
                    {review.expert_additions.map((addition: any, i: number) => (
                      <div key={i} className="p-3 bg-blue-50/30 rounded-lg text-sm border border-blue-100/50 flex gap-3">
                        <div className="mt-0.5">
                           {addition.type === 'risk' ? <AlertCircle className="h-4 w-4 text-red-500" /> : <Zap className="h-4 w-4 text-blue-500" />}
                        </div>
                        <div>
                          <span className="font-bold capitalize text-blue-900 leading-none">[{addition.type}] {addition.content?.title || addition.content?.name}</span>
                          <p className="text-xs text-slate-600 mt-1">{addition.rationale}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
