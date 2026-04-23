"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { 
    LayoutDashboard, 
    Users, 
    User, 
    Shield, 
    AlertCircle, 
    Settings, 
    LogOut,
    Plus,
    FileText,
    Zap,
    Rocket,
    Calendar,
    PieChart,
    Map,
    Network,
    ChevronDown,
    Search
} from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
    const pathname = usePathname()
    const { data: session } = useSession()

    // Hide global header on homepage as it has its own custom design
    if (pathname === "/") return null

    const publicRoutes = [
        {
            href: "/stakeholders",
            label: "Directory",
            icon: Users,
            active: pathname.startsWith("/stakeholders"),
        },
        {
            href: "/problems",
            label: "Problems",
            icon: AlertCircle,
            active: pathname.startsWith("/problems"),
        },
        {
            href: "/solutions",
            label: "Solutions",
            icon: Zap,
            active: pathname.startsWith("/solutions"),
        },
        {
            href: "/research",
            label: "Research",
            icon: FileText,
            active: pathname.startsWith("/research"),
        },
    ]

    const role = (session?.user as any)?.role
    
    const getRoleLinks = () => {
        if (!role) return []
        
        switch (role) {
            case "STUDENT":
                return [
                    { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
                    { href: "/student/cofounder", label: "Cofounder Hub", icon: Rocket },
                    { href: "/calendar", label: "Calendar", icon: Calendar },
                    { href: "/student/value-proposition", label: "Value Canvas", icon: Shield },
                ]
            case "MANAGER":
                return [
                    { href: "/manager/dashboard", label: "Dashboard", icon: LayoutDashboard },
                    { href: "/manager/mentees", label: "All Mentees", icon: Users },
                    { href: "/strategy-map", label: "Strategy Map", icon: Network },
                ]
            case "ADMIN":
                return [
                    { href: "/dashboard/admin", label: "Admin Console", icon: Settings },
                    { href: "/analytics", label: "Analytics", icon: PieChart },
                    { href: "/dashboard/admin/roadmap", label: "Roadmap Sandbox", icon: Map },
                ]
            case "STAKEHOLDER":
                return [
                    { href: "/stakeholder/dashboard", label: "My Dashboard", icon: LayoutDashboard },
                ]
            default:
                return []
        }
    }

    const roleLinks = getRoleLinks()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <LayoutDashboard className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">
                            Stakeholder Platform
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
                        {publicRoutes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:bg-primary/5",
                                    pathname.startsWith(route.href)
                                        ? "text-primary bg-primary/10 font-bold"
                                        : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                <route.icon className="h-4 w-4" />
                                <span className="hidden xl:inline">{route.label}</span>
                            </Link>
                        ))}
                        
                        {roleLinks.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1 px-3 py-2 h-auto text-muted-foreground hover:text-primary hover:bg-primary/5">
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-4 w-4 text-primary" />
                                            <span className="hidden lg:inline font-bold">
                                                {role.charAt(0) + role.slice(1).toLowerCase()} Menu
                                            </span>
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56 p-2 space-y-1">
                                    <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-black px-2 py-1.5 tracking-widest">
                                        Role Shortcuts
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {roleLinks.map((link) => (
                                        <DropdownMenuItem key={link.href} asChild className="rounded-md cursor-pointer">
                                            <Link href={link.href} className="flex items-center gap-3 w-full py-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <link.icon className="h-4 w-4" />
                                                </div>
                                                <span className="font-medium">{link.label}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2 lg:gap-4">
                    <form
                        action="/stakeholders"
                        method="GET"
                        className="hidden xl:flex relative max-w-sm w-full group"
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            name="q"
                            className="w-full bg-secondary/30 hover:bg-secondary/50 border-none rounded-lg pl-10 pr-20 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="Find stakeholders..."
                            suppressHydrationWarning
                        />
                        <button
                            type="submit"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase px-2.5 py-1.5 rounded-md shadow-sm transition-all active:scale-95"
                            suppressHydrationWarning
                        >
                            Search
                        </button>
                    </form>
                    <nav className="flex items-center gap-2">
                        {session?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-primary/10 hover:border-primary/30 transition-all p-0" suppressHydrationWarning>
                                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/5 text-primary text-xs font-black">
                                            {session.user.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild className="cursor-pointer">
                                        <Link href="/settings" className="flex items-center w-full">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/stakeholders' })}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                                <Button variant="ghost" size="sm" asChild suppressHydrationWarning>
                                <Link href="/auth/signin">Log in</Link>
                            </Button>
                        )}
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
