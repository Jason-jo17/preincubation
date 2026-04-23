'use client';

import { Search, Bell, LogOut, User, Settings as SettingsIcon } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/layout/mobile-nav';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RoleSwitcher } from '@/components/auth/role-switcher';

export function Header() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <MobileNav />
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
                    <Input
                        type="search"
                        placeholder="Search Intelligence..."
                        className="pl-9 h-9 bg-slate-100/50 border-none focus-visible:ring-1 focus-visible:ring-blue-500/50 transition-all rounded-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <Bell className="h-5 w-5 text-slate-500" />
                    <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-blue-600 border border-white" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-bold leading-none">{user?.name || 'Guest User'}</p>
                                <p className="text-[10px] leading-none text-muted-foreground uppercase tracking-wider font-medium">
                                    {user?.email || 'guest@example.com'}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push('/profile')}>
                            <User className="h-4 w-4" /> Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push('/settings')}>
                            <SettingsIcon className="h-4 w-4" /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" /> Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
