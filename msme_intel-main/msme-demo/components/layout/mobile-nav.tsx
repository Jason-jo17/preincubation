'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
    LayoutDashboard, 
    Building2, 
    Search, 
    Menu, 
    Zap, 
    Mic, 
    LineChart, 
    Network, 
    UserCircle, 
    Settings,
    ChevronRight,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useAuthStore } from '@/lib/store/auth-store';

const navGroups = [
  {
    title: 'Core Platform',
    icon: LayoutDashboard,
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'analyst', 'viewer'] },
      { name: 'Funnel', href: '/funnel', icon: Filter, roles: ['admin', 'analyst'] },
      { name: 'Companies', href: '/companies', icon: Building2, roles: ['admin', 'analyst'] },
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
      { name: 'My Company', href: '/portal/company', icon: UserCircle, roles: ['company_owner'] },
    ]
  }
];

export function MobileNav() {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const userRole = user?.role || 'viewer';
    const [open, setOpen] = useState(false);

    const bottomNavItems = [
        { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Companies', href: '/companies', icon: Building2 },
        { name: 'Search', href: '/search', icon: Search },
    ];

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                    <SheetHeader className="p-6 border-b text-left">
                        <SheetTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            MSME Intel
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col h-full bg-slate-50/30 overflow-y-auto pb-20">
                        <nav className="flex-1 px-4 py-6 space-y-8">
                            {navGroups.map((group) => {
                                const filteredItems = group.items.filter(item => item.roles.includes(userRole));
                                if (filteredItems.length === 0) return null;

                                return (
                                    <div key={group.title} className="space-y-3">
                                        <h4 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <group.icon className="h-3 w-3" />
                                            {group.title}
                                        </h4>
                                        <div className="space-y-1">
                                            {filteredItems.map((item) => {
                                                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setOpen(false)}
                                                        className={cn(
                                                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group',
                                                            isActive
                                                                ? 'bg-blue-600 text-white shadow-md'
                                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                        )}
                                                    >
                                                        <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500")} />
                                                        {item.name}
                                                        {isActive && <ChevronRight className="ml-auto h-4 w-4 text-white/70" />}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Bottom Mobile Tab Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-4 lg:hidden safe-area-bottom pb-safe">
                {bottomNavItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex flex-col items-center justify-center gap-1 transition-all',
                                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
                        </Link>
                    );
                })}
                <button
                    onClick={() => setOpen(true)}
                    className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 transition-all"
                >
                    <Menu className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">More</span>
                </button>
            </div>
        </>
    );
}
