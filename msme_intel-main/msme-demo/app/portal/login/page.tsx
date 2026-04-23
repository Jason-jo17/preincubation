'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Building2, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function PortalLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Demo login
      if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true' && email === 'demo@company.com' && password === 'demo123') {
        login({ id: 'demo-co-1', name: 'Acme Manufacturing', email: 'demo@company.com', role: 'company_owner', company_id: 'comp-1' }, 'mock-token');
        router.push('/portal/company');
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/portal/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Invalid credentials');
      
      const data = await res.json();
      login(data.user, data.token);
      router.push('/portal/company');
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Login failed', description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-lg border-blue-50">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
            <Building2 className="h-7 w-7 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Company Portal</CardTitle>
          <CardDescription>Enter your credentials to manage your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-10" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center border-t py-4 text-sm text-muted-foreground">
          <p>Want to join as an Industry Partner? <Link href="/portal/company/register" className="text-blue-600 hover:underline font-bold">Start Onboarding Questionnaire</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
