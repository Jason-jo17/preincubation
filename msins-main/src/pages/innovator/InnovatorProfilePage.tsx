import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  ExternalLink, 
  Award, 
  Github, 
  Linkedin, 
  Globe,
  Settings,
  ShieldCheck,
  Zap,
  Target
} from "lucide-react";
import { innovatorActiveChallenge } from "@/data/innovator-active-challenge";
import { innovatorCareerReadiness } from "@/data/innovator-dashboard-workspace";

export default function InnovatorProfilePage() {
  const handleOpenRecruitProfile = () => {
    window.open("https://inpulse-staging-recruitment.web.app", "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header / Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-950 px-8 py-10 shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 -m-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[80px] opacity-50" />
        <div className="absolute bottom-0 left-0 -m-16 h-[250px] w-[250px] rounded-full bg-violet-600/20 blur-[80px] opacity-50" />
        
        <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-3xl font-black text-white shadow-xl ring-4 ring-white/10 shrink-0">
            {innovatorActiveChallenge.student.initials}
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">{innovatorActiveChallenge.student.displayName}</h1>
              <p className="text-violet-300 font-medium">{innovatorActiveChallenge.student.role} · {innovatorActiveChallenge.cohort.name}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/80 py-1 px-3">
                <MapPin className="h-3 w-3 mr-1.5 opacity-60" /> Nagpur, Maharashtra
              </Badge>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/80 py-1 px-3">
                <Mail className="h-3 w-3 mr-1.5 opacity-60" /> kiran@example.com
              </Badge>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/80 py-1 px-3">
                <Globe className="h-3 w-3 mr-1.5 opacity-60" /> portfolio.io
              </Badge>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
              <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl text-xs h-9 px-4">
                <Github className="h-3.5 w-3.5 mr-2" /> GitHub
              </Button>
              <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl text-xs h-9 px-4">
                <Linkedin className="h-3.5 w-3.5 mr-2" /> LinkedIn
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs h-9 px-4 font-bold">
                <Settings className="h-3.5 w-3.5 mr-2" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Recruitment */}
        <div className="space-y-8">
          <Card className="rounded-[2rem] border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Career Readiness
              </CardTitle>
              <CardDescription className="text-[11px] font-medium uppercase tracking-wider">Verified Proficiency Indices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs items-center">
                  <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">Overall Readiness</span>
                  <span className="font-black text-primary text-sm">{innovatorCareerReadiness.portfolioScore}%</span>
                </div>
                <Progress value={innovatorCareerReadiness.portfolioScore} className="h-2 md:h-2.5 rounded-full bg-muted shadow-inner" />
              </div>

              <div className="grid gap-4">
                {[
                  { label: "Technical Match", value: innovatorCareerReadiness.techMatchPct, color: "bg-primary" },
                  { label: "Soft Skills", value: innovatorCareerReadiness.communicationPct, color: "bg-violet-500" },
                  { label: "Leadership", value: innovatorCareerReadiness.leadershipPct, color: "bg-blue-500" },
                  { label: "Innovation Index", value: innovatorCareerReadiness.innovationIndexPct, color: "bg-amber-500" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                      <span>{stat.label}</span>
                      <span className="text-foreground">{stat.value}%</span>
                    </div>
                    <Progress value={stat.value} className="h-1.5 bg-muted/60" />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border/50">
                <Button 
                  onClick={handleOpenRecruitProfile}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-14 font-black text-sm shadow-xl shadow-primary/10 transition-all active:scale-95 group"
                >
                  Open recruit profile
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
                <p className="text-[10px] text-center text-muted-foreground mt-3 font-medium px-4 leading-relaxed italic">
                  Launch your verified Inpulse recruitment portal to showcase your MSME portfolio to global partners.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border/50 shadow-sm bg-neutral-900 overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-white/90 uppercase tracking-widest leading-none">Verified Proof</p>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1 italic">Issued via InUnity</p>
                </div>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                Your credentials are cryptographically secured on the MSINS-Inpulse ledger. These cannot be tampered with by external agencies.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Portfolio & Experience */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4 px-2">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
               <Zap className="h-5 w-5 text-primary" /> Applied Innovation Deck
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="rounded-[2rem] border-border/50 bg-card hover:bg-muted/30 transition-colors shadow-sm cursor-pointer group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-neutral-900 flex items-center justify-center shadow-lg border border-primary/20 group-hover:border-primary transition-colors">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase font-mono px-2">Live Challenge</Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-lg text-foreground group-hover:text-primary transition-colors leading-tight">SAR Drone Lighting Systems</h3>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">Collaborating with Navitas (Zero Systems) on adaptive optics for UAV search operations.</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Progress</span>
                    <span className="text-xs font-black text-foreground">85% Complete</span>
                  </div>
                  <Progress value={85} className="h-1.5" />
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-border/50 bg-card hover:bg-muted/30 transition-colors shadow-sm cursor-pointer group opacity-60 grayscale hover:grayscale-0 hover:opacity-100">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-neutral-100 flex items-center justify-center shadow-sm border border-border">
                      <Target className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground border-none text-[8px] font-black uppercase font-mono px-2">Coming Soon</Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-lg text-foreground leading-tight">Next Phase...</h3>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">System integration and pilot testing for mass manufacturing workflows.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="rounded-[2.5rem] border-border/50 bg-card shadow-sm overflow-hidden">
             <CardHeader className="pb-4">
                <CardTitle className="text-lg font-black flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" /> Skills & Domain Expertise
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-8">
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Core Technology Stack</h4>
                   <div className="flex flex-wrap gap-2">
                      {["React / Next.js", "TypeScript", "Vite", "Tailwind CSS", "Embedded Systems", "Robotics Engine", "Computer Vision", "CAD / SolidWorks"].map(s => (
                        <Badge key={s} variant="secondary" className="bg-neutral-100 hover:bg-primary/10 hover:text-primary transition-colors text-xs font-bold py-1.5 px-4 rounded-xl border-border/50">
                          {s}
                        </Badge>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Domain Specializations</h4>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: "UAV Systems", level: "Expert" },
                        { label: "Industry 4.0", level: "Advanced" },
                        { label: "CleanTech", level: "Advanced" },
                        { label: "AgriTech", level: "Medium" },
                        { label: "Smart Cities", level: "Advanced" }
                      ].map(d => (
                        <div key={d.label} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1 hover:border-primary/20 transition-all">
                           <p className="text-xs font-black text-foreground">{d.label}</p>
                           <p className="text-[9px] font-black text-primary uppercase tracking-widest">{d.level}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
