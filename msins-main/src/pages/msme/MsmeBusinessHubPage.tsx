import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Calendar, Download, ExternalLink, FileText, MessageSquare, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  businessHubTabs,
  companyProfileDefaults,
  completedProjectsRows,
  fundingSchemes,
  hubEvents,
  labInfraRows,
  mentorProfiles,
  messageThreads,
  normalizeBusinessHubTab,
  reportCards,
  resourceCards,
} from "@/data/msme-business-hub";

export default function MsmeBusinessHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = normalizeBusinessHubTab(tabParam);

  const setTab = useCallback(
    (value: string) => {
      const v = normalizeBusinessHubTab(value);
      setSearchParams(v === "resources" ? {} : { tab: v }, { replace: true });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (tabParam && normalizeBusinessHubTab(tabParam) !== tabParam) {
      const v = normalizeBusinessHubTab(tabParam);
      setSearchParams(v === "resources" ? {} : { tab: v }, { replace: true });
    }
  }, [tabParam, setSearchParams]);

  const [company, setCompany] = useState({ ...companyProfileDefaults });

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Business Hub</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Resources, support, communication, growth tools, and company management
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setTab} className="w-full">
        <TabsList className="flex h-auto min-h-10 w-full flex-wrap justify-start gap-1 bg-muted/80 p-1">
          {businessHubTabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="text-xs sm:text-sm px-2.5 sm:px-3 data-[state=active]:bg-background"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="resources" className="mt-6 space-y-4 focus-visible:outline-none">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resourceCards.map((r) => (
              <Card key={r.id} className="border-border hover:border-primary/25 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base leading-snug">{r.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">{r.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pt-0">
                  <Button size="sm" variant="secondary" className="text-xs h-8" onClick={() => toast.message("Opened", { description: r.title })}>
                    Open
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => toast.success("Download", { description: `${r.title}.pdf` })}>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs h-8" onClick={() => toast.success("Saved to library", { description: r.title })}>
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Save
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="funding" className="mt-6 space-y-4 focus-visible:outline-none">
          <div className="space-y-3">
            {fundingSchemes.map((s) => (
              <Card key={s.id} className="border-border">
                <CardContent className="p-4 sm:p-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 space-y-2">
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/80">Eligibility:</span> {s.eligibility}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/80">Support:</span> {s.supportAmount}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="font-mono">Deadline: {s.deadline}</span>
                    </div>
                  </div>
                  <Button className="shrink-0" onClick={() => toast.success("Application started", { description: s.name })}>
                    Apply
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="labs" className="mt-6 space-y-4 focus-visible:outline-none">
          <div className="grid gap-4 md:grid-cols-2">
            {labInfraRows.map((lab) => (
              <Card key={lab.id} className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{lab.name}</CardTitle>
                  <CardDescription>{lab.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{lab.capabilities}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => toast.message("Lab details", { description: lab.name })}>
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="text-xs h-8" onClick={() => toast.success("Access requested", { description: lab.name })}>
                      Request access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentors" className="mt-6 focus-visible:outline-none">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mentorProfiles.map((m) => (
              <Card key={m.id} className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{m.name}</CardTitle>
                  <CardDescription>{m.focus}</CardDescription>
                  <p className="text-[11px] text-muted-foreground pt-1">{m.org}</p>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button size="sm" className="text-xs h-8" onClick={() => toast.success("Session requested", { description: m.name })}>
                    Request session
                  </Button>
                  <Button size="sm" variant="secondary" className="text-xs h-8" onClick={() => setTab("messages")}>
                    <MessageSquare className="h-3.5 w-3.5 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => toast.success("Saved mentor", { description: m.name })}>
                    Save
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-6 focus-visible:outline-none">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Upcoming &amp; recent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-border">
              {hubEvents.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="w-full flex items-center justify-between gap-3 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 rounded-md px-2 -mx-2 transition-colors"
                  onClick={() => toast.message(name, { description: "Add to calendar (prototype)" })}
                >
                  <span>{name}</span>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    Register
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-6 focus-visible:outline-none">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Unified inbox</CardTitle>
              <CardDescription>Teams · Mentors · Platform admin · Support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {messageThreads.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => toast.message(th.title, { description: th.preview })}
                  className={cn(
                    "w-full rounded-xl border border-border p-4 text-left transition-all",
                    "hover:border-primary/30 hover:bg-muted/30",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {th.channel}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">{th.time}</span>
                  </div>
                  <p className="font-medium text-foreground mt-2">{th.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{th.preview}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-6 focus-visible:outline-none">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Completed projects</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto pt-0">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Challenge</th>
                    <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Team</th>
                    <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Outcome</th>
                    <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Score</th>
                    <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {completedProjectsRows.map((row) => (
                    <tr key={row.id} className="border-b border-border/50 hover:bg-muted/40">
                      <td className="py-2.5 px-3 font-medium">{row.challenge}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{row.team}</td>
                      <td className="py-2.5 px-3 text-xs">{row.outcome}</td>
                      <td className="py-2.5 px-3 font-mono text-primary font-semibold">{row.score}</td>
                      <td className="py-2.5 px-3 text-xs">{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="mt-6 focus-visible:outline-none">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Company profile</CardTitle>
              <CardDescription>Visible to verified solvers under your sharing rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="co-name">Company name</Label>
                  <Input id="co-name" value={company.companyName} onChange={(e) => setCompany((c) => ({ ...c, companyName: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-sector">Sector</Label>
                  <Input id="co-sector" value={company.sector} onChange={(e) => setCompany((c) => ({ ...c, sector: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-city">City</Label>
                  <Input id="co-city" value={company.city} onChange={(e) => setCompany((c) => ({ ...c, city: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-size">Size</Label>
                  <Input id="co-size" value={company.size} onChange={(e) => setCompany((c) => ({ ...c, size: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-web">Website</Label>
                  <Input id="co-web" value={company.website} onChange={(e) => setCompany((c) => ({ ...c, website: e.target.value }))} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="co-areas">Key problem areas</Label>
                  <Textarea id="co-areas" rows={2} value={company.keyProblemAreas} onChange={(e) => setCompany((c) => ({ ...c, keyProblemAreas: e.target.value }))} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="co-domains">Preferred domains</Label>
                  <Textarea id="co-domains" rows={2} value={company.preferredDomains} onChange={(e) => setCompany((c) => ({ ...c, preferredDomains: e.target.value }))} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="co-contact">Contact person</Label>
                  <Input id="co-contact" value={company.contactPerson} onChange={(e) => setCompany((c) => ({ ...c, contactPerson: e.target.value }))} />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setCompany({ ...companyProfileDefaults })}>
                  Reset
                </Button>
                <Button size="sm" onClick={() => toast.success("Profile saved", { description: company.companyName })}>
                  <Save className="h-4 w-4 mr-1" />
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6 focus-visible:outline-none">
          <div className="grid gap-4 sm:grid-cols-2">
            {reportCards.map((r) => (
              <Card key={r.id} className="border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <CardTitle className="text-base">{r.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">{r.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pt-0">
                  <Button size="sm" className="text-xs h-8" onClick={() => toast.success("Generating…", { description: r.title })}>
                    Generate
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => toast.success("Export queued", { description: `${r.title}.xlsx` })}>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Export
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
