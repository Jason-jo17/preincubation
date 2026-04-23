'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardCheck, Clock, MapPin, Building2, ChevronRight, 
  Search, Filter, CheckCircle2, AlertCircle, Bookmark 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { PENDING_REVIEWS_MOCK } from '@/lib/demo-data/experts';
import { COMPANIES_DATA } from '@/lib/demo-data/new-companies';
import { DetailedCompany } from '@/lib/types/detailed-company';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ExpertPortalPage() {
  const { user } = useAuthStore();
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) return;
    
    // In a real app, use user.id (expert_id)
    const expertId = user.id; 
    
    fetch(`${API}/api/experts/${expertId}/pending`)
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
            setPendingReviews(data);
        } else {
            setPendingReviews(PENDING_REVIEWS_MOCK);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn("Expert API error or networking issue, using mock data:", err);
        setPendingReviews(PENDING_REVIEWS_MOCK);
        setLoading(false);
      });
  }, [user]);

  const filteredReviews = pendingReviews.filter(r => 
    r.company_roadmaps?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.companies?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-6xl mx-auto py-8 px-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Expert Review Center</h1>
          <p className="text-muted-foreground">Validate and enhance AI-generated growth roadmaps for MSMEs</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
              ))}
              <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                +12
              </div>
           </div>
           <p className="text-xs font-medium text-muted-foreground underline cursor-pointer">View Expert Network</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 space-y-6">
           <Card className="bg-slate-50 border-none shadow-none">
              <CardHeader className="pb-3">
                 <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Pending</span>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700">{pendingReviews.length}</Badge>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Validated</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">42</Badge>
                 </div>
                 <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-xs font-bold">Total Earnings</span>
                    <span className="text-sm font-black text-blue-600">₹84,000</span>
                 </div>
              </CardContent>
           </Card>

           <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Domains</Label>
              <div className="flex flex-wrap gap-2">
                 {user?.expert_domains?.map(d => (
                   <Badge key={d} variant="outline" className="px-3 py-1 bg-white">{d}</Badge>
                 ))}
                 {!user?.expert_domains && <Badge variant="outline">General Manufacturing</Badge>}
              </div>
           </div>
        </aside>

        {/* Main Review List */}
        <div className="md:col-span-3 space-y-6">
           <div className="flex gap-2">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input 
                    placeholder="Search by company or roadmap title..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-white shadow-sm"
                 />
              </div>
              <Button variant="outline" className="h-11 px-4 gap-2">
                 <Filter className="h-4 w-4" /> Filter
              </Button>
           </div>

           {loading ? (
             <div className="space-y-4">
                {[1, 2, 3].map(i => <Card key={i} className="h-40 animate-pulse bg-slate-50" />)}
             </div>
           ) : filteredReviews.length === 0 ? (
             <Card className="py-20 text-center border-dashed">
                <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <ClipboardCheck className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold">Queue is empty!</h3>
                <p className="text-sm text-muted-foreground">Great job! There are no pending reviews for your expertise area.</p>
             </Card>
           ) : (
             <div className="space-y-4">
                {filteredReviews.map(review => (
                   <Card key={review.id} className="group hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
                      <CardContent className="p-0">
                         <div className="flex flex-col md:flex-row">
                            <div className="flex-1 p-6">
                               <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-100">Pending Review</Badge>
                                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                     <Clock className="h-3 w-3" /> Due in 2 days
                                  </span>
                               </div>
                               <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                                  {review.companies?.name} Acceleration
                               </h3>
                               <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {review.companies?.district}, {review.companies?.state}
                               </p>
                               <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">AI Verdict Summary</p>
                                  <p className="text-xs italic leading-relaxed line-clamp-2">
                                     {review.company_roadmaps?.executive_summary || "Strategic roadmap focusing on digital transformation and market expansion."}
                                  </p>
                               </div>
                            </div>
                            <div className="md:w-48 bg-slate-50 flex flex-col items-center justify-center p-6 border-t md:border-t-0 md:border-l space-y-3">
                               <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 shadow-md group-hover:scale-[1.02] transition-transform" asChild>
                                  <Link href={`/experts/review/${review.roadmap_id}?expert_id=${review.expert_id}`}>
                                     Start Review
                                  </Link>
                               </Button>
                               <Button variant="ghost" size="sm" className="text-xs text-slate-500">Skip / Reassign</Button>
                            </div>
                         </div>
                      </CardContent>
                   </Card>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
