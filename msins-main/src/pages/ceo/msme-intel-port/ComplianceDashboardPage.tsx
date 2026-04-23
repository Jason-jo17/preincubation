import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, RefreshCw, ShieldAlert, BadgeCheck, Scale, Info, ShieldCheck } from "lucide-react";
import { Progress } from '@/components/ui/progress';

const RISK_FACTORS = [
    { id: 1, severity: 'critical', factor: 'GST Verification Mismatch', description: 'Business activities reported under GST differ fundamentally from RoC primary classifications.', affected_companies: 142 },
    { id: 2, severity: 'warning', factor: 'Delayed Annual Filings', description: 'Entities failing to submit AOC-4 for the preceding financial year.', affected_companies: 89 },
    { id: 3, severity: 'warning', factor: 'Udyam Deregistration Risk', description: 'Re-classification bounds breached due to abnormal revenue fluctuations.', affected_companies: 34 }
];

export default function ComplianceDashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-7xl mx-auto py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Compliance & Governance Center</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Regional statutory health and industrial alignment analytics.</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 shadow-sm">
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                        Regenerate Regional Audit
                    </Button>
                </div>

                <div className="mb-8 p-5 bg-primary/10 border border-primary/20 rounded-xl flex items-start gap-4 shadow-sm">
                    <div className="p-2 bg-background border border-primary/20 rounded-lg text-primary shadow-sm mt-0.5">
                        <Info className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-foreground tracking-tight">Regional Compliance Directive</p>
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
                            Governance telemetry is synthesized from verified RoC (Registrar of Companies) filings, GST return frequency, and BOPPL-verified field audits. Mismatches indicate industrial operations that deviate from registered primary business activities.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <Card className="border-border shadow-sm">
                        <CardHeader className="pb-3 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-[11px] uppercase text-muted-foreground tracking-widest font-bold">Total Scanned Entities</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-4xl font-black text-foreground">1,248</div>
                            <div className="mt-2 h-1.5 w-full bg-success/20 rounded-full overflow-hidden">
                                <div className="bg-success h-full" style={{width: '100%'}}></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border shadow-sm">
                        <CardHeader className="pb-3 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-[11px] uppercase text-muted-foreground tracking-widest font-bold">Compliant Status</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-4xl font-black text-success">86%</div>
                            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-success h-full" style={{width: '86%'}}></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border shadow-sm">
                        <CardHeader className="pb-3 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-[11px] uppercase text-muted-foreground tracking-widest font-bold">Flagged Anomalies</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-4xl font-black text-destructive">204</div>
                            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-destructive h-full" style={{width: '14%'}}></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-5">
                    <Card className="lg:col-span-3 border-border shadow-sm">
                        <CardHeader className="bg-muted/10 border-b border-border">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                Sector Realignment Distribution
                            </CardTitle>
                            <CardDescription>Concentration of verified sector identity vs. registered identity</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-xl bg-muted/5">
                                <ShieldCheck className="h-10 w-10 text-muted-foreground/30 mb-3" />
                                <span className="text-sm font-bold text-muted-foreground/80">Matrix generation requires live Python connection.</span>
                                <span className="text-xs text-muted-foreground mt-1">Check terminal for API sync.</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2 border-border shadow-sm">
                        <CardHeader className="bg-muted/10 border-b border-border">
                            <CardTitle className="text-lg font-bold">Critical Risk Inventory</CardTitle>
                            <CardDescription>Highest priority systemic governance issues</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4 pt-6">
                            {RISK_FACTORS.map((risk) => (
                                <div key={risk.id} className="p-4 rounded-xl border border-border bg-background shadow-sm hover:border-primary/20 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-2 bg-muted/50 rounded-lg border border-border">
                                            {risk.severity === 'critical' ? (
                                                <ShieldAlert className="h-4 w-4 text-destructive" />
                                            ) : (
                                                <AlertCircle className="h-4 w-4 text-warning" />
                                            )}
                                        </div>
                                        <Badge variant="outline" className={`uppercase tracking-widest text-[10px] font-bold ${risk.severity === 'critical' ? 'text-destructive border-destructive/20 bg-destructive/5' : 'text-warning border-warning/20 bg-warning/5'}`}>
                                            {risk.severity} Alert
                                        </Badge>
                                    </div>
                                    <div className="space-y-1.5 mb-4">
                                        <p className="text-sm font-bold text-foreground tracking-tight">{risk.factor}</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{risk.description}</p>
                                    </div>
                                    <div className="pt-3 flex items-center justify-between border-t border-border border-dashed">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            <Scale className="h-3 w-3" />
                                            <span>Affected Nodes</span>
                                        </div>
                                        <span className="text-xs font-black text-foreground">{risk.affected_companies} Entities</span>
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mt-2">
                                Export Global Risk Audit
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                    <div className="flex items-center gap-2 bg-success/10 px-3 py-1.5 rounded-full border border-success/20 text-success">
                        <BadgeCheck className="h-4 w-4" />
                        <span>Mocked RoC Live Feed Verified</span>
                    </div>
                    <span>Last Regional Audit Check: {new Date().toLocaleDateString()}</span>
                </div>
            </div>
        </DashboardLayout>
    );
}
