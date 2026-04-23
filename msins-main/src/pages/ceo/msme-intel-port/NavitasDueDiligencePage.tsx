import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, TrendingDown, Target, ShieldAlert, CheckCircle2, Building2, UserCircle2, ExternalLink } from "lucide-react";

export default function NavitasDueDiligencePage() {
  return (
    <DashboardLayout>
      <div className="container max-w-6xl mx-auto py-8 px-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="destructive" className="px-2 py-1 uppercase tracking-widest text-[10px] font-black">
                High-Severity Alert
              </Badge>
              <Badge variant="outline" className="px-2 py-1 uppercase tracking-widest text-[10px] font-black">
                Registry ID: nav-011
              </Badge>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-foreground">Navitas (Zero Systems)</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl font-medium">
              Intelligence Brief: Critical Sector Mismatch and Compliance Audit for Nagpur-based entity.
            </p>
          </div>
          <div className="flex gap-3">
             <Badge variant="secondary" className="bg-success/10 text-success border-success/20 px-3 py-1.5 font-bold">Verified Data</Badge>
          </div>
        </div>

        <Alert variant="destructive" className="mb-8 border-2 shadow-lg bg-destructive/5 text-destructive dark:bg-destructive/10">
          <ShieldAlert className="h-5 w-5" />
          <AlertTitle className="font-black uppercase tracking-wide">Critical Sector Mismatch Identified</AlertTitle>
          <AlertDescription className="font-medium">
            The entity identified as "Navitas" in Nagpur is an **LED lighting manufacturer**, NOT a drone/UAV company. 
            No evidence of drone/UAV involvement was found across statutory, digital, or industry databases.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border">
                <div className="flex items-center gap-2">
                   <Building2 className="w-5 h-5 text-primary" />
                   <CardTitle>Basic Company Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-black text-muted-foreground uppercase text-[10px] tracking-widest w-1/3">Legal Name</TableCell>
                      <TableCell className="font-medium">Navitas Led Lighting Private Limited / Zero Systems</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-black text-muted-foreground uppercase text-[10px] tracking-widest">CIN</TableCell>
                      <TableCell className="font-mono">U31909MH2018PTC312960</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-black text-muted-foreground uppercase text-[10px] tracking-widest">GSTIN</TableCell>
                      <TableCell className="font-mono">27AFNPK2259K1Z0</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-black text-muted-foreground uppercase text-[10px] tracking-widest">Industry</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                          LED Lighting (Confirmed)
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-black text-muted-foreground uppercase text-[10px] tracking-widest">Headquarters</TableCell>
                      <TableCell>Plot No. 17, Navnath Society, Maske Layout, Narendra Nagar, Nagpur 440015</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-black text-muted-foreground uppercase text-[10px] tracking-widest">Website</TableCell>
                      <TableCell>
                        <a href="http://lightnavitas.com" target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                          lightnavitas.com <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border">
                <div className="flex items-center gap-2">
                   <Target className="w-5 h-5 text-primary" />
                   <CardTitle>Product Line Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Industrial LED Lighting</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-success" /> PWD Certified Street Lights
                      </li>
                      <li className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-success" /> Flameproof Well Glass Lights
                      </li>
                      <li className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-success" /> Troffer/Panel Lights
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Portable Emergency Systems</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> Pneumatic Emergency Lighting Tower (480W)
                      </li>
                      <li className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> Inflatable LED Balloon Lights
                      </li>
                      <li className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> Portable Rechargeable Flood Lights
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border text-destructive">
                <div className="flex items-center gap-2">
                   <AlertCircle className="w-5 h-5" />
                   <CardTitle>Red Flags & Compliance Risks</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[
                  { title: "Sector Misidentification", severity: "HIGH", desc: "Fundamental mismatch between claimed sector (Drone) and actual sector (LED Lighting)." },
                  { title: "MCA Filing Non-Compliance", severity: "HIGH", desc: "Last balance sheet filed for FY2018-19; 6+ years of missing mandatory annual filings." },
                  { title: "Minimum Statutory Capital", severity: "MEDIUM", desc: "Authorized and paid-up capital at ₹1 lakh (legal minimum), suggesting shell status." },
                  { title: "Revenue Data Unreliable", severity: "MEDIUM", desc: "7x variance across sources (₹76 lakhs to ₹5 Cr); no audited financials available." }
                ].map((flag, idx) => (
                  <div key={idx} className="flex gap-4 p-4 border rounded-xl bg-muted/5">
                    <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${flag.severity === 'HIGH' ? 'bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                    <div>
                      <h4 className="font-bold text-sm">{flag.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{flag.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm border-l-4 border-l-warning">
              <CardHeader className="bg-muted/30 border-b border-border">
                <div className="flex items-center gap-2">
                   <Target className="w-5 h-5 text-warning" />
                   <CardTitle>Active Ecosystem Challenge</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4 text-sm font-medium">
                   <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg space-y-3">
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-warning shrink-0" />
                        <h4 className="font-bold">SECTOR MISMATCH: Misidentified as Drone/UAV company in original brief</h4>
                     </div>
                     <p className="text-muted-foreground text-xs pl-4">Target 25–40% faster coverage of priority grid cells in exercises, with a manufacturable payload module Navitas can pilot with district responders. This challenge is actively tracked in the Innovator workspace under "Intelligent Modular Drone System".</p>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Metrics */}
          <div className="space-y-8">
            <Card className="border-border shadow-sm overflow-hidden">
               <CardHeader className="bg-primary text-primary-foreground border-none">
                  <CardTitle className="text-sm font-black uppercase tracking-widest opacity-80">Gap Analysis Score</CardTitle>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-5xl font-black">38</span>
                    <span className="text-lg font-bold opacity-70 mb-1">/ 100</span>
                  </div>
               </CardHeader>
               <CardContent className="pt-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                       <span>Innovation Moat</span>
                       <span>3/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full">
                       <div className="h-full bg-destructive w-[30%] rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                       <span>Talent Quality</span>
                       <span>2/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full">
                       <div className="h-full bg-destructive w-[20%] rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                       <span>Compliance Health</span>
                       <span>1/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full">
                       <div className="h-full bg-destructive w-[10%] rounded-full" />
                    </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                 <div className="flex items-center gap-2">
                    <UserCircle2 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-sm">Founder Intelligence</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                    <h5 className="font-bold text-sm">Rashmi Kulkarni</h5>
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">Co-Founder / Managing Partner</p>
                 </div>
                 <div>
                    <h5 className="font-bold text-sm">Ashish Nikhare</h5>
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">Owner (Zero Systems)</p>
                 </div>
                 <Badge variant="outline" className="w-full justify-center py-1 mt-2 border-dashed text-muted-foreground text-[10px] uppercase font-bold">
                    Family-Run Entity
                 </Badge>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
               <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Intelligence Recommendation</h4>
               </div>
               <p className="text-xs leading-relaxed font-medium">
                Investment or partnership in the drone sector should be terminated immediately. Target entity has zero capability or presence in Aerospace/UAV verticals.
               </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
