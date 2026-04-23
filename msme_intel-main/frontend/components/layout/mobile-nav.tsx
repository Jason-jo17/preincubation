'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';

// We need to modify the Sidebar component to be reusable or create a simplified navigation list.
// For now, I'll assume we can reuse the Sidebar content or duplicate the nav logic.
// A better approach is to refactor the nav items into a constant or hook.
// But given the constraints, I'll just render the Sidebar component inside the Sheet.
// Note: Sidebar component has 'hidden lg:flex' classes, so we might need to adjust or override them
// when rendered inside the mobile sheet, or create a specific MobileSidebarContent.

// Let's create a specific MobileNav component content.
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
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Sectors', href: '/sectors', icon: LineChart },
    { name: 'Ecosystem', href: '/ecosystem', icon: Network },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
                <div className="flex flex-col h-full bg-card">
                    <div className="flex h-16 items-center border-b px-6">
                        <h1 className="text-xl font-bold">MSME Intel</h1>
                    </div>
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
                </div>
            </SheetContent>
        </Sheet>
    );
}
