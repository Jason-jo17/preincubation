'use client';

import * as React from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Shield, User, GraduationCap, Building2, Eye } from 'lucide-react';

export function RoleSwitcher() {
  const { user, setRole } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [pendingRole, setPendingRole] = React.useState<any>(null);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => { setMounted(true); }, []);
  
  const currentRole = user?.role || 'viewer';

  const handleRoleChange = (newRole: any) => {
    // Roles requiring credentials
    if (newRole === 'admin' || newRole === 'expert' || newRole === 'student') {
        setPendingRole(newRole);
        setIsDialogOpen(true);
        setPassword('');
        setError('');
        return;
    }
    
    executeSwitch(newRole);
  };

  const executeSwitch = (newRole: any) => {
    setRole(newRole);
    
    toast({
        title: `Switched to ${newRole.replace('_', ' ')} view`,
        description: `Now simulating ${newRole.replace('_', ' ')} permissions.`,
    });

    let path = '/dashboard';
    if (newRole === 'expert') path = '/experts';
    if (newRole === 'company_owner') path = '/portal/company';
    if (newRole === 'student') path = '/portal/student';
    if (newRole === 'viewer') path = '/regional';

    router.push(path);
  };

  const verifyCredentials = () => {
    const validCredentials: Record<string, string> = {
        'admin': 'admin123',
        'expert': 'expert456',
        'student': 'student789'
    };

    if (password === validCredentials[pendingRole]) {
        executeSwitch(pendingRole);
        setIsDialogOpen(false);
    } else {
        setError('Invalid credentials for this role.');
    }
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-muted/50 border border-border shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-2">Active Role:</span>
      {!mounted ? (
        // Prevents hydration mismatch — show static label until client hydrates
        <div className="h-7 w-[160px] flex items-center px-2 text-xs font-medium text-muted-foreground">
          <User className="h-3.5 w-3.5 mr-2 text-slate-400" /> Guest Viewer
        </div>
      ) : (
      <Select
        value={currentRole}
        onValueChange={handleRoleChange}
      >
        <SelectTrigger className="h-7 w-[160px] border-none bg-transparent focus:ring-0 text-xs font-medium">
          <SelectValue placeholder="Select Role">
            {/* Show label inline so it never appears blank */}
            {{
              admin: <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-rose-500" />General Admin</span>,
              analyst: <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-purple-500" />Analyst</span>,
              expert: <span className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-amber-500" />Expert Reviewer</span>,
              company_owner: <span className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5 text-emerald-500" />Company Owner</span>,
              student: <span className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-blue-500" />Student / Solver</span>,
              viewer: <span className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-slate-500" />Public Viewer</span>,
            }[currentRole] || <span>Select Role</span>}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-rose-500" />
              <span>General Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="analyst">
            <div className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-purple-500" />
              <span>Analyst</span>
            </div>
          </SelectItem>
          <SelectItem value="expert">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5 text-amber-500" />
              <span>Expert Reviewer</span>
            </div>
          </SelectItem>
          <SelectItem value="company_owner">
            <div className="flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Company Owner</span>
            </div>
          </SelectItem>
          <SelectItem value="student">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
              <span>Student / Solver</span>
            </div>
          </SelectItem>
          <SelectItem value="viewer">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-slate-500" />
              <span>Public Viewer</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Elevated Access Required
            </DialogTitle>
            <DialogDescription>
              Please enter the dummy password for the <strong>{pendingRole}</strong> role to proceed.
              <br />
              <span className="text-[10px] text-muted-foreground italic mt-2 block">
                  Tip: Use <code className="bg-slate-100 px-1 rounded">admin123</code>, <code className="bg-slate-100 px-1 rounded">expert456</code>, or <code className="bg-slate-100 px-1 rounded">student789</code>
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Access Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && verifyCredentials()}
                placeholder="Enter password..."
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-[10px] text-red-500 font-bold">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={verifyCredentials} className="bg-blue-600 hover:bg-blue-700">Verify & Switch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
