'use client';

import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Building2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, login, logout, setRole } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Public pages in portal
    const isPublic = pathname === '/portal/login' || pathname === '/portal/register';
    if (isPublic) return;

    // AUTO-AUTHENTICATION FOR DEMO
    if (!user) {
      console.log('Demo mode: Auto-initializing session');
      const role = pathname.startsWith('/portal/student') ? 'student' : 'company_owner';
      setRole(role);
      return;
    }

    // Role-based path checks
    const isStudentPath = pathname.startsWith('/portal/student');
    const isCompanyPath = pathname.startsWith('/portal/company');

    if (isStudentPath && user.role !== 'student') {
      setRole('student');
    } else if (isCompanyPath && user.role !== 'company_owner') {
      setRole('company_owner');
    }
  }, [user, pathname, setRole]);

  if (pathname === '/portal/login' || pathname === '/portal/register') {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="h-16 border-b bg-white px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link 
            href={pathname.startsWith('/portal/student') ? "/portal/student" : "/portal/company"} 
            className="font-bold text-xl text-blue-600 flex items-center gap-2"
          >
            <Building2 className="h-6 w-6" />
            <span>{pathname.startsWith('/portal/student') ? "Student Portal" : "Company Portal"}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href={pathname.startsWith('/portal/student') ? "/portal/student" : "/portal/company"}>
              <Button variant={(pathname === '/portal/student' || pathname === '/portal/company') ? 'secondary' : 'ghost'} size="sm">
                Dashboard
              </Button>
            </Link>
            {pathname.startsWith('/portal/student') && (
              <Link href="/portal/student/prd-builder">
                <Button variant={pathname === '/portal/student/prd-builder' ? 'secondary' : 'ghost'} size="sm">
                  PRD Builder
                </Button>
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user?.name || "Demo User"}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ') || (pathname.startsWith('/portal/student') ? "student" : "industry partner")}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => { logout(); router.push('/portal/login'); }}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-white py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 MSME Intelligence Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="#" className="hover:underline">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
