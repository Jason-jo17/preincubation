'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ShieldCheck, 
  BarChart4, 
  UserCheck, 
  Building2, 
  ArrowRight,
  Zap,
  LayoutDashboard
} from 'lucide-react';

const DEMO_ROLES = [
  {
    role: 'admin',
    name: 'Administrator',
    description: 'Full platform control, user management, and global settings.',
    icon: ShieldCheck,
    color: 'bg-red-100 text-red-600',
    target: '/dashboard',
    user: { id: 'admin-1', name: 'System Admin', email: 'admin@msme-intel.com', role: 'admin' }
  },
  {
    role: 'analyst',
    name: 'Strategic Analyst',
    description: 'Regional intelligence, XLSX processing, and macro trends.',
    icon: BarChart4,
    color: 'bg-blue-100 text-blue-600',
    target: '/dashboard',
    user: { id: 'analyst-1', name: 'Senior Analyst', email: 'analyst@msme-intel.com', role: 'analyst' }
  },
  {
    role: 'expert',
    name: 'Domain Expert',
    description: 'Roadmap validation, sector thesis reviews, and expert consensus.',
    icon: UserCheck,
    color: 'bg-purple-100 text-purple-600',
    target: '/experts',
    user: { id: 'expert-1', name: 'Dr. Sarah Chen', email: 'sarah.chen@experts.com', role: 'expert', expert_domains: ['Manufacturing', 'Export'] }
  },
  {
    role: 'company_owner',
    name: 'Company Owner',
    description: 'Self-reported profile, data verification, and growth portal.',
    icon: Building2,
    color: 'bg-amber-100 text-amber-600',
    target: '/portal/company',
    user: { id: 'owner-1', name: 'Rajesh Kumar', email: 'rajesh@acme-mfg.com', role: 'company_owner', company_id: 'comp-1' }
  }
];

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const handleSelectRole = (demo: typeof DEMO_ROLES[0]) => {
    setLoadingRole(demo.role);
    
    // Simulate login delay
    setTimeout(() => {
      login(demo.user as any, 'demo-token');
      router.push(demo.target);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2">
            <Zap className="h-3 w-3 fill-current" /> MSME Intel Demo Environment
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Select Platform Protocol</h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm">
            Please choose a simulated persona to access the platform&apos;s role-specific features and dashboards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {DEMO_ROLES.map((demo) => (
            <Card 
              key={demo.role} 
              className="group cursor-pointer hover:shadow-2xl hover:border-blue-200 transition-all duration-300 border-slate-200 overflow-hidden relative"
              onClick={() => handleSelectRole(demo)}
            >
              {loadingRole === demo.role && (
                <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center backdrop-blur-[2px]">
                   <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 animate-progress-fast" />
                   </div>
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={`p-4 rounded-2xl ${demo.color} transition-transform group-hover:scale-110 duration-500`}>
                    <demo.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl font-black uppercase tracking-tight">{demo.name}</CardTitle>
                <CardDescription className="text-xs leading-relaxed line-clamp-2 italic">
                  {demo.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
            <Button variant="ghost" size="sm" className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-blue-600" onClick={() => router.push('/dashboard')}>
                <LayoutDashboard className="h-3 w-3 mr-2" /> Skip to Viewer Mode
            </Button>
        </div>
      </div>
    </div>
  );
}
