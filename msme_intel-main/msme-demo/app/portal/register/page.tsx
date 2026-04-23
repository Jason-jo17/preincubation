'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

function RegisterForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { toast } = useToast();

  useEffect(() => {
    if (!token) {
        setIsValidToken(false);
        return;
    }
    // In a real app, you would verify the token here
    setIsValidToken(true);
  }, [token]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ variant: 'destructive', title: 'Error', description: 'Passwords do not match' });
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/portal/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invite_token: token, password, name }),
      });

      if (!res.ok) throw new Error('Registration failed');
      
      toast({ title: 'Success', description: 'Registration complete! You can now log in.' });
      router.push('/portal/login');
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Registration failed', description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidToken === false) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md border-red-100 shadow-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-2">
              <AlertCircle className="h-7 w-7 text-red-500" />
            </div>
            <CardTitle className="text-xl">Invalid Invite</CardTitle>
            <CardDescription>The invite link is invalid or has expired.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="outline" asChild><Link href="/portal/login">Back to Login</Link></Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-lg border-blue-50">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
            <ShieldCheck className="h-7 w-7 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Complete Registration</CardTitle>
          <CardDescription>Enter your details to create your secure account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Create Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-10 mt-2" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Complete Registration <CheckCircle2 className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t py-4">
          <p className="text-sm text-muted-foreground">Already have an account? <Link href="/portal/login" className="text-blue-600 hover:underline">Log in</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function PortalRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600 w-8 h-8" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
