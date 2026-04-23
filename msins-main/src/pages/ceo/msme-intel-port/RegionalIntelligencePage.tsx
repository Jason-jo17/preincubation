import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, FileSpreadsheet, BarChart4, Users, Target, 
  CheckCircle2, Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function RegionalIntelligencePage() {
  const [region, setRegion] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<any>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Mock the upload delay
    setTimeout(() => {
        setJobId("job_mock_82u3");
        setJobStatus({ status: 'processing', total_companies: 248, filename: acceptedFiles[0].name, region_label: region || 'Maharashtra Region' });
        setIsUploading(false);
        toast({ title: 'Upload Successful', description: 'Processing company data in pipeline...' });
    }, 1500);
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

  // Mock Polling for job status
  useEffect(() => {
    if (!jobId || jobStatus?.status === 'complete' || jobStatus?.status === 'error') return;

    const timer = setTimeout(() => {
        setJobStatus((prev: any) => ({ ...prev, status: 'complete' }));
        toast({ title: 'Analysis Complete', description: 'Intelligence report is ready!' });
    }, 4000);

    return () => clearTimeout(timer);
  }, [jobId, jobStatus, toast]);

  if (jobStatus?.status === 'complete') {
    return (
        <DashboardLayout>
            <IntelligenceResults jobStatus={jobStatus} onReset={() => { setJobId(null); setJobStatus(null); }} />
        </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
        <div className="container max-w-4xl mx-auto py-12 px-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="space-y-3 mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Discovery Intelligence Engine</h1>
            <p className="text-muted-foreground max-w-xl">
            Upload raw regional metadata (Udyam exports, registry scrapes, etc) to instantaneously identify structural ecosystem gaps, 
            competitive clusters, and programmatic growth opportunities via AI-driven segmentation.
            </p>
        </div>

        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1 shadow-sm border-border bg-primary/5">
                <CardHeader className="pb-2">
                    <Label className="text-[10px] uppercase tracking-widest text-primary font-black mb-1">Step 1</Label>
                    <CardTitle className="text-sm">Target Locale</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input 
                        value={region} 
                        onChange={e => setRegion(e.target.value)} 
                        placeholder="e.g. Pune, MH" 
                        className="text-sm focus-visible:ring-primary/50" 
                        disabled={!!jobId} 
                    />
                </CardContent>
            </Card>

            <div className="md:col-span-3">
                <div {...getRootProps()} className={`
                    border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer h-full flex flex-col items-center justify-center
                    ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-border/60 bg-muted/20 hover:border-primary/50 hover:bg-muted/40'}
                    ${jobId ? 'opacity-50 pointer-events-none' : ''}
                `}>
                    <input {...getInputProps()} />
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Drop un-normalized datasets here</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-6">Standard XLSX or raw CSV exports supported</p>
                    <Button variant="secondary" disabled={isUploading || !!jobId} className="px-8 font-semibold shadow-sm">
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Browse Files
                    </Button>
                </div>
            </div>
            </div>

            {jobId && (
            <Card className="border-primary/30 shadow-md animate-in slide-in-from-bottom-4 duration-500">
                <CardContent className="py-8 space-y-6">
                    <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <FileSpreadsheet className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-bold text-base text-foreground">Processing Discovery Payload</p>
                            <p className="text-xs font-medium text-muted-foreground mt-1">Cross-referencing {jobStatus?.total_companies || '...'} records for {jobStatus.region_label}</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="animate-pulse bg-primary/10 text-primary border-primary/20 py-1.5 px-3">
                        {jobStatus?.status === 'processing' ? 'LLM Analyzing...' : 'Pending'}
                    </Badge>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-border">
                    {[
                        { label: 'Normalising structural registry columns', status: true },
                        { label: 'Ingesting Semantic Sector Profiles', status: true },
                        { label: 'RAG-Driven Sector Matching', status: jobStatus?.status === 'processing' },
                        { label: 'Generating Operational Roadmaps', status: false },
                    ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                            {step.status ? <CheckCircle2 className="h-4 w-4 text-success" /> : <div className="h-4 w-4 rounded-full border-2 border-muted" />}
                            <span className={step.status ? 'text-foreground font-medium' : 'text-muted-foreground'}>{step.label}</span>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
            )}
        </div>
        </div>
    </DashboardLayout>
  );
}

const getMockResults = (region: string) => {
    const isMaharashtra = region.toLowerCase().includes('maharashtra') || region.toLowerCase().includes('nagpur');

    return {
        ecosystem: {
        critical_gaps: isMaharashtra ? [
            { category: "INFRASTRUCTURE", urgency: "HIGH", gap: "Digital Supply Chain Integration", affected_companies_percentage: 65, potential_providers: ["Global Supply Chain", "Nagpur Logistics Hub"] },
            { category: "FINANCIAL", urgency: "MEDIUM", gap: "DeepTech Capital Access", affected_companies_percentage: 42, potential_providers: ["SIDBI Ventures", "Maharashtra Defense Fund"] },
            { category: "REGULATORY", urgency: "MEDIUM", gap: "ZED Platinum Certification", affected_companies_percentage: 78, potential_providers: ["MSME Council", "QCI India"] }
        ] : [
            { category: "INFRASTRUCTURE", urgency: "HIGH", gap: "Data Center Cooling Costs", affected_companies_percentage: 55, potential_providers: ["Adani Edge", "NTT Global"] },
            { category: "FINANCIAL", urgency: "MEDIUM", gap: "Seed-stage Capital", affected_companies_percentage: 38, potential_providers: ["Mumbai Angels", "SIDBI Ventures"] }
        ],
        missing_services: {
            "legal_compliance": isMaharashtra ? "High deficit in IP filings for indigenous defense components." : "Bottleneck in API testing compliances.",
            "marketing_outreach": "Minimal B2B digital footprint in heavy engineering clusters."
        }
        },
        competitors: {
        clusters: isMaharashtra ? [
            { 
                sector: "Automotive & Auto Components", 
                sub_clusters: [
                    {cluster_name: "Pune (Chakan/Pimpri)", growth_potential: "Very High", characteristics: "Tier-1 Passenger Vehicle Hub", avg_turnover_lakhs: 8500, avg_employees: 450},
                    {cluster_name: "Aurangabad Cluster", growth_potential: "High", characteristics: "Heavy Engineering & Chassis", avg_turnover_lakhs: 4200, avg_employees: 280},
                    {cluster_name: "Nagpur (Hingna/Butibori)", growth_potential: "Emerging", characteristics: "Auto-ancillary & Logistics", avg_turnover_lakhs: 1200, avg_employees: 45}
                ], 
                top_performers: ["Tata Motors", "Mahindra", "Force Motors"], 
                collaboration_opportunities: ["Standardized lightweighting R&D pooling"] 
            },
            { 
                sector: "Aerospace & Defence", 
                sub_clusters: [{cluster_name: "MIHAN SEZ", growth_potential: "Very High", characteristics: "MRO & UAV Manufacturing", avg_turnover_lakhs: 15600, avg_employees: 1200}], 
                top_performers: ["Solar Industries", "Thales-Reliance"], 
                collaboration_opportunities: ["Indigenous composite material supply chains"] 
            }
        ] : [
            { 
                sector: "Financial Services", 
                sub_clusters: [{cluster_name: "Neo-lending", growth_potential: "Strong", characteristics: "API-driven lending", avg_turnover_lakhs: 450, avg_employees: 45}], 
                top_performers: ["FlexiLoan", "InCred"], 
                collaboration_opportunities: ["Account Aggregator API pooling"] 
            }
        ]
        },
        opportunities: {
        regional_summary: isMaharashtra ? { total_opportunity_inr_cr: 150000, dominant_sector: "Automotive", emerging_sector: "Defence/UAV", recommended_focus: "Establish high-speed logistics links between Pune auto hubs and Nagpur defense clusters" } 
        : { total_opportunity_inr_cr: 8400, dominant_sector: "Finance", emerging_sector: "Chemicals", recommended_focus: "Establish cloud subsidized zones" },
        sector_matrix: isMaharashtra ? [
            { sector: "Automotive", company_count: 3000, current_strength: 9, growth_potential: 8, composite_score: 88, rag_status: "green" },
            { sector: "Defence", company_count: 145, current_strength: 4, growth_potential: 9, composite_score: 72, rag_status: "amber" },
            { sector: "Agri-Processing", company_count: 850, current_strength: 7, growth_potential: 6, composite_score: 65, rag_status: "amber" },
            { sector: "IT/ITES", company_count: 512, current_strength: 8, growth_potential: 7, composite_score: 80, rag_status: "green" }
        ] : [
            { sector: "Fintech", company_count: 340, current_strength: 9, growth_potential: 9, composite_score: 92, rag_status: "green" },
            { sector: "IT/ITES", company_count: 512, current_strength: 8, growth_potential: 7, composite_score: 80, rag_status: "green" }
        ]
        }
    };
};

function IntelligenceResults({ jobStatus, onReset }: { jobStatus: any, onReset: () => void }) {
  const results = getMockResults(jobStatus?.region_label || '');

  return (
    <div className="container max-w-6xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">{jobStatus?.region_label} Intelligence Profile</h1>
          <p className="text-muted-foreground mt-1 text-sm">Full analysis report for parsed dataset: <span className="font-semibold text-foreground">{jobStatus?.filename}</span> ({jobStatus?.total_companies} registered MSMEs)</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onReset} className="rounded-lg shadow-sm font-semibold">Destroy Virtual Instance</Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md rounded-lg font-bold">Push to Global Registry</Button>
        </div>
      </div>

      <Tabs defaultValue="ecosystem" className="space-y-6">
        <TabsList className="bg-muted p-1 border border-border h-12 rounded-xl">
          <TabsTrigger value="ecosystem" className="gap-2 rounded-lg font-bold uppercase tracking-wider text-xs"><Target className="h-3.5 w-3.5" /> Market Deficit</TabsTrigger>
          <TabsTrigger value="competitors" className="gap-2 rounded-lg font-bold uppercase tracking-wider text-xs"><Users className="h-3.5 w-3.5" /> Vertical Clusters</TabsTrigger>
          <TabsTrigger value="opportunities" className="gap-2 rounded-lg font-bold uppercase tracking-wider text-xs"><BarChart4 className="h-3.5 w-3.5" /> Macro Opportunity</TabsTrigger>
        </TabsList>

        <TabsContent value="ecosystem" className="space-y-6 animate-in fade-in duration-300">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.ecosystem.critical_gaps.map((gap, i) => (
                <Card key={i} className={`shadow-sm border-l-4 ${gap.urgency === 'HIGH' ? 'border-l-destructive' : 'border-l-warning'}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="text-[10px] uppercase font-black tracking-widest">{gap.category}</Badge>
                        <Badge variant="outline" className={`text-[10px] uppercase ${gap.urgency === 'HIGH' ? 'text-destructive border-destructive/30' : 'text-warning border-warning/30'}`}>{gap.urgency} DEFICIT</Badge>
                    </div>
                    <CardTitle className="text-lg text-foreground">{gap.gap}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                            <span className="uppercase tracking-wider">Affected Portfolio Extent</span>
                            <span className="text-foreground">{gap.affected_companies_percentage}%</span>
                        </div>
                        <Progress value={gap.affected_companies_percentage} className="h-2 bg-muted" />
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg border border-border">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Algorithm Recommended Interventions</p>
                        <div className="flex flex-wrap gap-2">
                            {gap.potential_providers.map((p, j) => (
                                <Badge key={j} variant="secondary" className="text-[11px] font-semibold bg-background">{p}</Badge>
                            ))}
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6 animate-in fade-in duration-300">
           {results.competitors.clusters.map((cluster, i) => (
              <Card key={i} className="shadow-sm border-border overflow-hidden">
                <CardHeader className="border-b border-border bg-muted/10">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-xl font-black">{cluster.sector}</CardTitle>
                     <div className="flex gap-2">
                        <Badge variant="secondary" className="font-bold">{cluster.sub_clusters.length} Sub-Clusters</Badge>
                     </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Macro Sub-Groupings</h4>
                         <div className="space-y-3">
                            {cluster.sub_clusters.map((sc, j) => (
                               <div key={j} className="p-4 bg-background border border-border rounded-xl shadow-sm transition-all hover:border-primary/40 text-foreground">
                                  <div className="flex justify-between items-start mb-2">
                                     <p className="font-bold text-sm tracking-tight">{sc.cluster_name}</p>
                                     <Badge variant="secondary" className="text-[10px] uppercase">{sc.growth_potential}</Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-4">{sc.characteristics}</p>
                                  <div className="flex gap-4 text-[11px] text-muted-foreground font-semibold">
                                     <span>Avg Output: ₹{sc.avg_turnover_lakhs}L</span>
                                     <span>Avg Headcount: {sc.avg_employees}</span>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-6">
                         <div>
                            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">Vertical Outliers</h4>
                            <div className="flex flex-wrap gap-2">
                               {cluster.top_performers.map((name) => (
                                  <Badge key={name} variant="outline" className="px-3 py-1.5 bg-primary/5 border-primary/20 text-primary font-bold">{name}</Badge>
                               ))}
                            </div>
                         </div>
                         <div className="p-5 bg-success/10 border border-success/30 rounded-xl">
                            <h4 className="text-xs font-black text-success uppercase tracking-widest mb-2">Synergy Prediction Engine</h4>
                            <p className="text-sm leading-relaxed text-success font-medium">{cluster.collaboration_opportunities[0]}</p>
                         </div>
                      </div>
                   </div>
                </CardContent>
              </Card>
           ))}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6 animate-in fade-in duration-300">
           <Card className="bg-primary text-primary-foreground border-none shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 blur-[2px]">
                 <Target className="h-56 w-56 text-primary-foreground" />
              </div>
              <CardContent className="py-12 px-8 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    <div className="space-y-2">
                       <p className="text-[11px] uppercase tracking-widest font-black opacity-70">Total Aggregate Valuation Range</p>
                       <h2 className="text-5xl font-black tracking-tighter">₹{results.opportunities.regional_summary.total_opportunity_inr_cr} Cr +</h2>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[11px] uppercase tracking-widest font-black opacity-70">Over-indexed Sector</p>
                       <p className="text-xl font-black">{results.opportunities.regional_summary.dominant_sector}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[11px] uppercase tracking-widest font-black opacity-70">Rising Derivative Sector</p>
                       <p className="text-xl font-black">{results.opportunities.regional_summary.emerging_sector}</p>
                    </div>
                 </div>
                 <div className="mt-8 pt-8 border-t border-primary-foreground/20">
                    <p className="text-sm font-semibold opacity-90 italic tracking-wide">" {results.opportunities.regional_summary.recommended_focus} "</p>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/10 border-b border-border">
                 <CardTitle className="text-lg">Sector Trajectory Matrix</CardTitle>
                 <CardDescription>Algorithmic growth scoring calculated using regional telemetry arrays.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                       <thead>
                          <tr className="bg-muted/10 border-b border-border text-muted-foreground uppercase tracking-widest text-[10px] font-black">
                             <th className="px-6 py-4 text-left">Sector Topology</th>
                             <th className="px-6 py-4 text-center">Volume</th>
                             <th className="px-6 py-4 text-center">Stability Index</th>
                             <th className="px-6 py-4 text-center">Expansion Velocity</th>
                             <th className="px-6 py-4 text-center">Composite Bias</th>
                             <th className="px-6 py-4 text-center">Alert Tier</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-border">
                          {results.opportunities.sector_matrix.map((row, i) => (
                             <tr key={i} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-5 font-bold text-foreground text-[13px]">{row.sector}</td>
                                <td className="px-6 py-5 text-center font-semibold text-muted-foreground">{row.company_count}</td>
                                <td className="px-6 py-5 text-center">
                                   <div className="flex flex-col items-center">
                                      <span className="text-[11px] font-bold mb-1.5">{row.current_strength}.0</span>
                                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                         <div className="h-full bg-primary" style={{ width: `${row.current_strength * 10}%` }} />
                                      </div>
                                   </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                   <div className="flex flex-col items-center">
                                      <span className="text-[11px] font-bold mb-1.5">{row.growth_potential}.0</span>
                                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                         <div className="h-full bg-success" style={{ width: `${row.growth_potential * 10}%` }} />
                                      </div>
                                   </div>
                                </td>
                                <td className="px-6 py-5 text-center font-black text-primary text-base">{row.composite_score}</td>
                                <td className="px-6 py-5 text-center">
                                   <div className={`h-3 w-3 rounded-full mx-auto ${
                                      row.rag_status === 'green' ? 'bg-success shadow-[0_0_8px_rgba(0,0,0,0.2)] shadow-success/50' : 
                                      row.rag_status === 'amber' ? 'bg-warning shadow-[0_0_8px_rgba(0,0,0,0.2)] shadow-warning/50' : 
                                      'bg-destructive shadow-[0_0_8px_rgba(0,0,0,0.2)] shadow-destructive/50'
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
      </Tabs>
    </div>
  );
}
