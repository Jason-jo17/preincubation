'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuthStore } from '@/lib/store/auth-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, FileSpreadsheet, MapPin, BarChart4, Users, Target, 
  CheckCircle2, AlertTriangle, Loader2, ArrowRight, Download, Filter, Search 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function IntelligencePage() {
  const { user } = useAuthStore();
  const [region, setRegion] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<any>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('region_label', region || 'Unnamed Region');

    try {
      const res = await fetch(`${API}/api/intelligence/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setJobId(data.job_id);
      toast({ title: 'Upload Successful', description: 'Processing company data...' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Could not process file' });
    } finally {
      setIsUploading(false);
    }
  }, [region, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
    multiple: false,
    disabled: isUploading || !!jobId,
  });

  // Polling for job status
  useEffect(() => {
    if (!jobId || jobStatus?.status === 'complete' || jobStatus?.status === 'error') return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API}/api/intelligence/${jobId}`);
        const data = await res.json();
        setJobStatus(data);
        if (data.status === 'complete') {
          clearInterval(interval);
          toast({ title: 'Analysis Complete', description: 'Intelligence report is ready!' });
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId, jobStatus, toast]);

  if (jobStatus?.status === 'complete') {
    return <IntelligenceResults jobStatus={jobStatus} jobId={jobId!} onReset={() => { setJobId(null); setJobStatus(null); }} />;
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-6">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Regional Intelligence Engine</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Upload regional company data (Udyam exports or custom lists) to identify ecosystem gaps, 
          competitive clusters, and growth opportunities.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <Card className="md:col-span-1 border-blue-50 bg-blue-50/20">
              <CardHeader className="pb-2">
                 <Label className="text-xs uppercase tracking-wider text-blue-700 font-bold">Step 1</Label>
                 <CardTitle className="text-sm">Identify Region</CardTitle>
              </CardHeader>
              <CardContent>
                 <Input value={region} onChange={e => setRegion(e.target.value)} placeholder="e.g. Coimbatore, TN" className="text-sm" disabled={!!jobId} />
              </CardContent>
           </Card>

           <div className="md:col-span-3">
              <div {...getRootProps()} className={`
                border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}
                ${jobId ? 'opacity-50 cursor-not-allowed' : ''}
              `}>
                <input {...getInputProps()} />
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Drop company data here</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6">XLSX or CSV files supported</p>
                <Button variant="secondary" disabled={isUploading || !!jobId} className="px-8">
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Select File
                </Button>
              </div>
           </div>
        </div>

        {jobId && (
          <Card className="border-blue-100">
             <CardContent className="py-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                         <FileSpreadsheet className="h-6 w-6" />
                      </div>
                      <div>
                         <p className="font-semibold text-sm">Processing Intelligence Job</p>
                         <p className="text-xs text-muted-foreground">Analysing {jobStatus?.total_companies || '...'} records for {region}</p>
                      </div>
                   </div>
                   <Badge variant="outline" className="animate-pulse bg-blue-50 border-blue-200">
                      {jobStatus?.status === 'processing' ? 'Running Analysis' : 'Pending'}
                   </Badge>
                </div>
                
                <div className="space-y-4">
                   {[
                      { label: 'Normalising Columns', status: true },
                      { label: 'Analysing Sector Profiles', status: true },
                      { label: 'Gap Analysis Engine', status: jobStatus?.status === 'processing' },
                      { label: 'Competitive Mapping', status: false },
                   ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                         {step.status ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <div className="h-4 w-4 rounded-full border border-slate-300" />}
                         <span className={step.status ? 'text-slate-900' : 'text-slate-400'}>{step.label}</span>
                      </div>
                   ))}
                </div>
             </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function IntelligenceResults({ jobStatus, jobId, onReset }: { jobStatus: any, jobId: string, onReset: () => void }) {
  const [results, setResults] = useState<any>({ ecosystem: null, competitors: null, opportunities: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        try {
            const [eco, comp, opp] = await Promise.all([
                fetch(`${API}/api/intelligence/${jobId}/ecosystem`).then(r => r.json()),
                fetch(`${API}/api/intelligence/${jobId}/competitors`).then(r => r.json()),
                fetch(`${API}/api/intelligence/${jobId}/opportunities`).then(r => r.json()),
            ]);
            setResults({ ecosystem: eco.ecosystem_gaps, competitors: comp.competitor_clusters, opportunities: opp.opportunities });
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, [jobId]);

  if (loading) return (
      <div className="container py-12 px-6 space-y-8 animate-pulse">
         <div className="h-12 w-64 bg-slate-200 rounded" />
         <div className="h-[500px] w-full bg-slate-100 rounded-xl" />
      </div>
  );

  return (
    <div className="container max-w-7xl mx-auto py-8 px-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{jobStatus?.region_label} Intelligence</h1>
          <p className="text-muted-foreground mt-1">Full analysis report for dataset: {jobStatus?.filename} ({jobStatus?.total_companies} companies)</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onReset}>New Analysis</Button>
            <Button size="sm" className="bg-blue-600">Export PDF</Button>
        </div>
      </div>

      <Tabs defaultValue="ecosystem" className="space-y-6">
        <TabsList className="bg-slate-100/50 p-1">
          <TabsTrigger value="ecosystem" className="gap-2"><Target className="h-4 w-4" /> Ecosystem Gaps</TabsTrigger>
          <TabsTrigger value="competitors" className="gap-2"><Users className="h-4 w-4" /> Clusters</TabsTrigger>
          <TabsTrigger value="opportunities" className="gap-2"><BarChart4 className="h-4 w-4" /> Opportunities</TabsTrigger>
          <TabsTrigger value="companies" className="gap-2"><FileSpreadsheet className="h-4 w-4" /> Data</TabsTrigger>
        </TabsList>

        {/* TAB 1: ECOSYSTEM GAPS */}
        <TabsContent value="ecosystem" className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.ecosystem?.critical_gaps?.map((gap: any, i: number) => (
                <Card key={i} className="border-l-4 border-l-amber-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold">{gap.category}</Badge>
                        <Badge variant="secondary" className="text-[10px]">{gap.urgency}</Badge>
                    </div>
                    <CardTitle className="text-base mt-2">{gap.gap}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">{gap.rationale || "Infrastructure deficit affecting regional capability."}</p>
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-medium">
                            <span>Affected Companies</span>
                            <span>{gap.affected_companies_percentage}%</span>
                        </div>
                        <Progress value={gap.affected_companies_percentage} className="h-1 bg-slate-100" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Provider Gaps</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {gap.potential_providers?.map((p: string, j: number) => (
                                <Badge key={j} variant="secondary" className="text-[10px] font-normal">{p}</Badge>
                            ))}
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
           </div>

           <Card>
              <CardHeader>
                 <CardTitle className="text-base">Missing Services Analysis</CardTitle>
                 <CardDescription>Support services benchmarked against regional requirements</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                     {Object.entries(results.ecosystem?.missing_services || {}).map(([key, val]: any) => (
                        <div key={key} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">{key.replace('_', ' ')}</p>
                           <p className="text-xs leading-relaxed">{val}</p>
                        </div>
                     ))}
                  </div>
              </CardContent>
           </Card>
        </TabsContent>

        {/* TAB 2: COMPETITOR CLUSTERS */}
        <TabsContent value="competitors" className="space-y-6">
           {results.competitors?.clusters?.map((cluster: any, i: number) => (
              <Card key={i}>
                <CardHeader className="border-b bg-slate-50/30">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-lg">{cluster.sector}</CardTitle>
                     <div className="flex gap-2">
                        <Badge variant="outline">{cluster.sub_clusters?.length} Clusters</Badge>
                        <Badge className="bg-green-100 text-green-700 border-green-200">High Growth potential</Badge>
                     </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Market Breakdown</h4>
                         <div className="space-y-3">
                            {cluster.sub_clusters?.map((sc: any, j: number) => (
                               <div key={j} className="p-3 bg-white border rounded-lg shadow-sm">
                                  <div className="flex justify-between items-start mb-1">
                                     <p className="font-semibold text-sm">{sc.cluster_name}</p>
                                     <Badge variant="secondary" className="text-[10px]">{sc.growth_potential}</Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-3">{sc.characteristics}</p>
                                  <div className="flex gap-4 text-[10px] text-slate-500 font-medium">
                                     <span>Avg Turnover: ₹{sc.avg_turnover_lakhs}L</span>
                                     <span>Avg Employees: {sc.avg_employees}</span>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-6">
                         <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Top Performers</h4>
                            <div className="flex flex-wrap gap-2">
                               {cluster.top_performers?.map((name: string) => (
                                  <Badge key={name} variant="outline" className="px-3 py-1 bg-blue-50/50">{name}</Badge>
                               ))}
                            </div>
                         </div>
                         <div className="p-4 bg-green-50/30 border border-green-100 rounded-xl">
                            <h4 className="text-xs font-bold text-green-800 uppercase tracking-widest mb-2">Collaboration Signal</h4>
                            <p className="text-xs leading-relaxed text-green-900">{cluster.collaboration_opportunities?.[0]}</p>
                         </div>
                      </div>
                   </div>
                </CardContent>
              </Card>
           ))}
        </TabsContent>

        {/* TAB 3: OPPORTUNITY MATRIX */}
        <TabsContent value="opportunities" className="space-y-6">
           <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Target className="h-48 w-48 text-white" />
              </div>
              <CardContent className="py-12 px-8 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    <div className="space-y-2">
                       <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Regional Opportunity</p>
                       <h2 className="text-4xl font-black">₹{results.opportunities?.regional_summary?.total_opportunity_inr_cr} Cr</h2>
                    </div>
                    <div className="space-y-1">
                       <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Dominant Sector</p>
                       <p className="text-lg font-bold">{results.opportunities?.regional_summary?.dominant_sector}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Emerging Growth Area</p>
                       <p className="text-lg font-bold">{results.opportunities?.regional_summary?.emerging_sector}</p>
                    </div>
                 </div>
                 <div className="mt-8 pt-8 border-t border-slate-800">
                    <p className="text-sm italic text-slate-400">"{results.opportunities?.regional_summary?.recommended_focus}"</p>
                 </div>
              </CardContent>
           </Card>

           <Card>
              <CardHeader>
                 <CardTitle className="text-base">Sector Opportunity Matrix</CardTitle>
                 <CardDescription>Multi-factor growth scoring across regional sectors</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                       <thead>
                          <tr className="bg-slate-50 border-y">
                             <th className="px-4 py-3 text-left font-semibold">Sector</th>
                             <th className="px-4 py-3 text-center font-semibold">Companies</th>
                             <th className="px-4 py-3 text-center font-semibold">Strength</th>
                             <th className="px-4 py-3 text-center font-semibold">Growth</th>
                             <th className="px-4 py-3 text-center font-semibold">Score</th>
                             <th className="px-4 py-3 text-center font-semibold">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y">
                          {results.opportunities?.sector_matrix?.map((row: any, i: number) => (
                             <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-4 py-4 font-medium">{row.sector}</td>
                                <td className="px-4 py-4 text-center">{row.company_count}</td>
                                <td className="px-4 py-4 text-center">
                                   <div className="flex flex-col items-center">
                                      <span className="text-xs mb-1">{row.current_strength}/10</span>
                                      <div className="w-12 h-1 bg-slate-100 rounded-full">
                                         <div className="h-full bg-blue-500 rounded-full" style={{ width: `${row.current_strength * 10}%` }} />
                                      </div>
                                   </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                   <div className="flex flex-col items-center">
                                      <span className="text-xs mb-1">{row.growth_potential}/10</span>
                                      <div className="w-12 h-1 bg-slate-100 rounded-full">
                                         <div className="h-full bg-green-500 rounded-full" style={{ width: `${row.growth_potential * 10}%` }} />
                                      </div>
                                   </div>
                                </td>
                                <td className="px-4 py-4 text-center font-bold text-blue-600">{row.composite_score}</td>
                                <td className="px-4 py-4 text-center">
                                   <div className={`h-2.5 w-2.5 rounded-full mx-auto ${
                                      row.rag_status === 'green' ? 'bg-green-500' : 
                                      row.rag_status === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                                   }`} />
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        {/* TAB 4: COMPANIES (Placeholder for import logic) */}
        <TabsContent value="companies">
           <Card>
              <CardContent className="py-24 text-center space-y-4">
                 <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                    <CheckCircle2 className="h-8 w-8" />
                 </div>
                 <div className="max-w-xs mx-auto space-y-2">
                    <h3 className="font-bold">Analysed {jobStatus?.total_companies} Companies</h3>
                    <p className="text-sm text-muted-foreground">The full dataset is processed. You can now import selected sectors or performers into the master platform.</p>
                 </div>
                 <div className="flex justify-center gap-3">
                    <Button variant="outline">View All Records</Button>
                    <Button className="bg-blue-600">Import All to Platform</Button>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
