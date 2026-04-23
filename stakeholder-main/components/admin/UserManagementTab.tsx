import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { toast } from "sonner"

export function UserManagementTab() {
    const [roleFilter, setRoleFilter] = useState<string>("ALL")
    const queryClient = useQueryClient()

    const { data: users, isLoading } = useQuery({
        queryKey: ['admin-users', roleFilter],
        queryFn: async () => {
            const url = roleFilter === "ALL" ? '/api/admin/users' : `/api/admin/users?role=${roleFilter}`
            const res = await fetch(url)
            return res.json()
        }
    })

    const roleMutation = useMutation({
        mutationFn: async ({ userId, role }: { userId: string, role: string }) => {
            const res = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role })
            })
            if (!res.ok) throw new Error('Failed to update role')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] })
            toast.success("User role updated successfully")
        }
    })

    const handleRoleChange = (userId: string, newRole: string) => {
        roleMutation.mutate({ userId, role: newRole })
    }

    if (isLoading) return <div>Loading users...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border-none shadow-lg">
                <h3 className="font-black uppercase tracking-widest text-muted-foreground text-sm">User Directory</h3>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Filter by Role:</span>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Roles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Roles</SelectItem>
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="MANAGER">Manager</SelectItem>
                            <SelectItem value="STAKEHOLDER">Stakeholder</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-xl border-none shadow-2xl bg-card overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="border-none">
                            <TableHead className="font-bold text-primary py-4">Name</TableHead>
                            <TableHead className="font-bold text-primary">Email</TableHead>
                            <TableHead className="font-bold text-primary">Current Role</TableHead>
                            <TableHead className="font-bold text-primary">Joined</TableHead>
                            <TableHead className="font-bold text-primary text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user: any) => (
                            <TableRow key={user.id} className="hover:bg-primary/5 transition-colors border-primary/5">
                                <TableCell className="font-bold py-4">{user.name}</TableCell>
                                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-black uppercase text-[10px] tracking-widest">
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs font-medium">
                                    {user.createdAt ? format(new Date(user.createdAt), 'MMM d, yyyy') : 'N/A'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Select 
                                        defaultValue={user.role} 
                                        onValueChange={(val) => handleRoleChange(user.id, val)}
                                    >
                                        <SelectTrigger className="w-[140px] ml-auto h-8 text-[10px] font-bold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="STUDENT">Student</SelectItem>
                                            <SelectItem value="MANAGER">Manager</SelectItem>
                                            <SelectItem value="STAKEHOLDER">Stakeholder</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="RESEARCHER">Researcher</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
