"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Loader2 } from "lucide-react"

export function AddMenteeDialog() {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        institution: "",
        program: "",
        projectName: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch('/api/manager/mentees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ['my-mentees'] })
                setOpen(false)
                setFormData({ name: "", email: "", password: "", institution: "", program: "", projectName: "" })
            } else {
                alert(data.error || "Failed to add mentee")
            }
        } catch (error: any) {
            alert(error?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Mentee
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Student Credential</DialogTitle>
                    <DialogDescription>
                        Register a new student and automatically allocate them to your active pipeline.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="password">Temporary Password</Label>
                        <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="institution">Institution</Label>
                            <Input id="institution" name="institution" value={formData.institution} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="program">Program</Label>
                            <Input id="program" name="program" value={formData.program} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} required />
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Create Credential
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
