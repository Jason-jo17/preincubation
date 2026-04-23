'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useAuthStore } from '@/lib/store/auth-store';
import { useEcosystemStore } from '@/lib/hooks/use-ecosystem';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  LineChart,
  Network,
  Search,
  Settings,
  Filter,
  Zap,
  ShieldCheck, 
  UserCircle,
  ChevronDown,
  ChevronRight,
  LogOut,
  RefreshCw,
  Mic,
  FileText
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const navGroups = [
  {
    title: 'Core Platform',
    icon: LayoutDashboard,
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'analyst', 'viewer'] },
      { name: 'Funnel', href: '/funnel', icon: Filter, roles: ['admin', 'analyst'] },
      { name: 'Companies', href: '/companies', icon: Building2, roles: ['admin', 'analyst'] },
      { name: 'Compliance', href: '/compliance', icon: ShieldCheck, roles: ['admin', 'analyst'] },
    ]
  },
  {
    title: 'Intelligence',
    icon: Zap,
    items: [
      { name: 'Discovery Feed', href: '/ceed', icon: Mic, roles: ['admin', 'analyst', 'viewer'] },
      { name: 'Sector Thesis', href: '/sectors', icon: LineChart, roles: ['admin', 'analyst', 'viewer'] },
      { name: 'Regional Intel', href: '/regional', icon: Network, roles: ['admin', 'analyst', 'expert', 'viewer'] },
    ]
  },
  {
    title: 'Ecosystem',
    icon: Network,
    items: [
      { name: 'Automation Repos', href: '/automation', icon: Zap, roles: ['admin', 'analyst', 'viewer'] },
      { name: 'Ecosystem', href: '/ecosystem', icon: Network, roles: ['admin', 'analyst', 'viewer'] },
      { name: 'Programs & Challenges', href: '/programs', icon: Zap, roles: ['admin', 'analyst', 'viewer', 'expert'] },
    ]
  },
  {
    title: 'Tools & Portals',
    icon: UserCircle,
    items: [
      { name: 'Student Portal', href: '/portal/student', icon: UserCircle, roles: ['admin', 'analyst', 'student'] },
      { name: 'PRD Builder', href: '/portal/student/prd-builder', icon: FileText, roles: ['admin', 'analyst', 'student'] },
      { name: 'Expert Hub', href: '/experts', icon: ShieldCheck, roles: ['admin', 'expert'] },
      { name: 'My Company', href: '/portal/company', icon: UserCircle, roles: ['company_owner'] },
    ]
  },
  {
    title: 'General',
    icon: Settings,
    items: [
      { name: 'Search', href: '/search', icon: Search, roles: ['admin', 'analyst', 'viewer'] },
      { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin', 'analyst', 'viewer', 'company_owner', 'expert'] },
    ]
  }
];

interface NavSectionProps {
  title: string;
  icon: any;
  items: any[];
  pathname: string;
  userRole: string;
}

function NavSection({ title, icon: Icon, items, pathname, userRole }: NavSectionProps) {
  const filteredItems = items.filter(item => item.roles.includes(userRole));
  
  const isChildActive = filteredItems.some(item => 
    pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
  );

  const [isOpen, setIsOpen] = useState(isChildActive);

  if (filteredItems.length === 0) return null;

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
          isChildActive ? 'text-blue-600 bg-blue-50/50' : 'text-muted-foreground hover:bg-slate-100 hover:text-foreground'
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className={cn("h-5 w-5", isChildActive ? "text-blue-600" : "text-muted-foreground")} />
          <span className="truncate">{title}</span>
        </div>
        <ChevronRight className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-90")} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            className="overflow-hidden pl-4 space-y-1"
          >
            {filteredItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-muted-foreground hover:bg-slate-100 hover:text-foreground'
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground/70")} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, login, logout, setRole } = useAuthStore();
  const { activeEcosystem, setActiveEcosystem } = useEcosystemStore();
  const userRole = user?.role || 'viewer';

  const switchRole = (role: 'admin' | 'analyst' | 'expert' | 'viewer' | 'company_owner' | 'student') => {
    setRole(role);

    // Role-based redirects
    if (role === 'expert') router.push('/experts');
    else if (role === 'student') router.push('/portal/student');
    else if (role === 'company_owner') router.push('/portal/company');
    else router.push('/dashboard');
  };

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:border-r lg:bg-white shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
      {/* Logo Section - Premium Hardened */}
      <div className="flex h-20 items-center px-8 border-b border-slate-100/80 bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
             <Zap className="h-5 w-5 text-white fill-white/20" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 leading-none">
              MSME Intel
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation - Enhanced spacing and typography */}
      <nav className="flex-1 space-y-6 px-4 py-8 overflow-y-auto scroller-hide bg-mesh">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <div className="space-y-1">
              <NavSection 
                key={group.title}
                title={group.title}
                icon={group.icon}
                items={group.items}
                pathname={pathname}
                userRole={userRole}
              />
            </div>
          </div>
        ))}
      </nav>

      {/* User Branding & Profile - Integrated Premium Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <div className="mb-4 px-2">
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600/5 to-indigo-600/5 border border-blue-100/50 cursor-pointer hover:bg-blue-50/50 transition-colors group">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Current Sector</p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-xs font-black text-slate-800 capitalize leading-tight">
                             {activeEcosystem} Ecosystem
                          </span>
                       </div>
                       <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                 </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-56 mb-2 p-2 rounded-2xl shadow-xl border-slate-100 bg-white">
                 <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Intelligence Sector</DropdownMenuLabel>
                 <DropdownMenuSeparator className="bg-slate-50" />
                 <DropdownMenuItem 
                     onClick={() => setActiveEcosystem('maharashtra')}
                     className={cn("flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition-colors", activeEcosystem === 'maharashtra' ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-slate-50")}
                 >
                     <span className="text-xs">Maharashtra Ecosystem</span>
                 </DropdownMenuItem>
                 <DropdownMenuItem 
                     onClick={() => setActiveEcosystem('national')}
                     className={cn("flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition-colors", activeEcosystem === 'national' ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-slate-50")}
                 >
                     <span className="text-xs">National / Generic</span>
                 </DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full hover:bg-white hover:shadow-md p-2.5 rounded-2xl transition-all duration-300 text-left group border border-transparent hover:border-slate-100 bg-white/40">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </div>
              <div className="flex-1 text-xs truncate">
                <p className="font-black text-slate-900 truncate tracking-tight">{user?.name || 'Guest User'}</p>
                <div className="flex items-center gap-1 text-slate-500">
                   <p className="capitalize font-bold text-[10px] tracking-wide">{userRole?.replace('_', ' ')}</p>
                   <ChevronDown className="h-3 w-3 opacity-50" />
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="w-64 mb-2 p-2 rounded-2xl shadow-2xl border-slate-100">
            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Access Level</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-50" />
            <div className="grid grid-cols-1 gap-1 py-1">
                {[
                  { role: 'admin', label: 'Admin Terminal', badge: 'ROOT' },
                  { role: 'analyst', label: 'Analyst Hub' },
                  { role: 'expert', label: 'Expert Evaluation' },
                  { role: 'viewer', label: 'Public Insights' },
                  { role: 'company_owner', label: 'Corporate Portal' },
                  { role: 'student', label: 'Innovation Lab' }
                ].map((item) => (
                  <DropdownMenuItem 
                    key={item.role}
                    onClick={() => switchRole(item.role as any)} 
                    className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors",
                        userRole === item.role ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-slate-50"
                    )}
                  >
                    <span className="text-xs">{item.label}</span>
                    {item.badge && <Badge variant="outline" className="text-[8px] h-4 bg-white font-black">{item.badge}</Badge>}
                  </DropdownMenuItem>
                ))}
            </div>
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50 px-3 py-2.5 rounded-xl cursor-pointer" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" /> <span className="text-xs font-bold">Sign Out Platform</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Corporate Footer */}
      <div className="px-8 py-6 flex flex-col items-center gap-3 border-t border-slate-100 bg-white/80">
          <div className="flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <span className="text-[9px] font-black text-slate-400 tracking-[0.3em] uppercase">Powered by</span>
            <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-slate-900 rounded-sm transform rotate-45"></div>
                <span className="text-[11px] font-black tracking-tighter text-slate-900">InUnity</span>
            </div>
          </div>
      </div>
    </div>
  );
}
