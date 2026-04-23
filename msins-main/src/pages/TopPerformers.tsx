import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Trophy, Star, Zap, Award } from "lucide-react";

const badgeIcons: Record<string, typeof Trophy> = {
  "High Impact": Star,
  "Fast Execution": Zap,
  "Innovation Leader": Award,
};

const topInnovators = [
  { name: "Dr. Priya Sharma", region: "Pune", score: 98, achievements: "3 deployed solutions, 2 patents", badge: "High Impact" },
  { name: "Rajesh Patil", region: "Nashik", score: 95, achievements: "AgriTech pioneer, 5 startups mentored", badge: "Innovation Leader" },
  { name: "Sneha Kulkarni", region: "Mumbai", score: 94, achievements: "FinTech breakthrough, ₹8Cr raised", badge: "Fast Execution" },
  { name: "Amit Deshmukh", region: "Nagpur", score: 91, achievements: "Rural innovation, 4 community projects", badge: "High Impact" },
  { name: "Meera Joshi", region: "Kolhapur", score: 89, achievements: "Textile innovation, export-ready product", badge: "Innovation Leader" },
];

const topTeams = [
  { name: "AquaTech Solutions", region: "Pune", score: 96, achievements: "Smart water monitoring, pilot in 3 districts", badge: "High Impact" },
  { name: "FarmConnect Platform", region: "Nashik", score: 94, achievements: "Connected 2,400 farmers to markets", badge: "Fast Execution" },
  { name: "CoolTrack Systems", region: "Nashik", score: 92, achievements: "Reduced post-harvest loss by 32%", badge: "Innovation Leader" },
  { name: "VisionAI Labs", region: "Mumbai", score: 90, achievements: "AI quality control for manufacturing", badge: "Fast Execution" },
  { name: "EcoFiber Industries", region: "Kolhapur", score: 88, achievements: "Textile waste to fiber, zero-waste model", badge: "High Impact" },
];

const topCohorts = [
  { name: "Pune Smart Manufacturing", region: "Pune", score: 94, achievements: "68 teams, 52 projects, 78% completion", badge: "High Impact" },
  { name: "Mumbai FinTech Accelerator", region: "Mumbai", score: 91, achievements: "56 teams, 84% completion rate", badge: "Fast Execution" },
  { name: "Nashik AgriTech Program", region: "Nashik", score: 87, achievements: "44 teams, 15% YoY improvement", badge: "Innovation Leader" },
];

const topIncubators = [
  { name: "COEP Bhau Institute", region: "Pune", score: 96, achievements: "142 startups, 48 graduated, ₹42Cr revenue", badge: "High Impact" },
  { name: "IIT Bombay Society", region: "Mumbai", score: 94, achievements: "128 startups, 620 jobs created", badge: "Innovation Leader" },
  { name: "Venture Center Pune", region: "Pune", score: 92, achievements: "118 startups, 38 graduated, 14 patents", badge: "Fast Execution" },
];

const topMentors = [
  { name: "Prof. Anil Kakodkar", region: "Pune", score: 97, achievements: "Mentored 24 teams, 8 successful exits", badge: "High Impact" },
  { name: "Dr. Raghunath Mashelkar", region: "Mumbai", score: 96, achievements: "Innovation policy advisor, 18 patents guided", badge: "Innovation Leader" },
  { name: "Kiran Mazumdar-Shaw", region: "Pune", score: 94, achievements: "Healthcare incubation, 12 startups mentored", badge: "High Impact" },
];

const sections = [
  { title: "Top Innovators", icon: Star, data: topInnovators },
  { title: "Top Teams", icon: Trophy, data: topTeams },
  { title: "Top Cohorts", icon: Award, data: topCohorts },
  { title: "Top Incubators", icon: Zap, data: topIncubators },
  { title: "Top Mentors", icon: Star, data: topMentors },
];

const TopPerformers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Top Performers</h1>
          <p className="text-xs text-muted-foreground mt-1">Recognizing excellence across the Maharashtra Innovation Ecosystem</p>
        </div>

        {sections.map(section => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-3">
              <section.icon className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.data.map((item, i) => {
                const BadgeIcon = badgeIcons[item.badge] || Trophy;
                return (
                  <div key={item.name} className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          #{i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.name}</p>
                          <p className="text-[11px] text-muted-foreground">{item.region}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold font-mono text-primary">{item.score}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">{item.achievements}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <BadgeIcon className="h-3 w-3 text-warning" />
                      <StatusBadge status={item.badge} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TopPerformers;
