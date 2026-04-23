'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
    LayoutDashboard,
    Building2,
    LineChart,
    Network,
    Search,
    Settings,
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Sectors', href: '/sectors', icon: LineChart },
    { name: 'Ecosystem', href: '/ecosystem', icon: Network },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-card">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <h1 className="text-xl font-bold">MSME Intel</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="border-t p-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">JD</span>
                    </div>
                    <div className="flex-1 text-sm">
                        <p className="font-medium">John Doe</p>
                        <p className="text-muted-foreground">Analyst</p>
                    </div>
                </div>
            </div>

            {/* Powered by InUnity Branding */}
            <div className="px-6 py-4 flex items-center justify-center border-t border-slate-100 bg-white/50">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] leading-none mb-0.5">Powered by</span>
                    <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                        <div className="h-4 w-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center transform rotate-45 shadow-sm">
                            <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                        </div>
                        <span className="text-xs font-black tracking-tighter text-slate-800">InUnity</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
