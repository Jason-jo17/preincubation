"use client"
 
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
 import { Button } from "@/components/ui/button"
 import { Input } from "@/components/ui/input"
 import { Label } from "@/components/ui/label"
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 import { Plus, UserPlus, Loader2 } from "lucide-react"
 import { useState } from "react"
 import { toast } from "sonner"
 
 interface AddStakeholderDialogProps {
     mode: 'admin' | 'student'
     trigger?: React.ReactNode
 }
 
 const DISTRICTS = [
     "Dakshina Kannada",
     "Udupi",
     "Mysuru",
     "Mandya",
     "Hassan",
     "Chikkamagaluru",
     "Kodagu",
     "Chamarajanagar",
     "Shivamogga"
 ]
 
 const ORG_TYPES = [
     "Government",
     "NGO",
     "Private",
     "Academic",
     "Cooperative",
     "Community"
 ]
 
 export function AddStakeholderDialog({ mode, trigger }: AddStakeholderDialogProps) {
     const [open, setOpen] = useState(false)
     const [loading, setLoading] = useState(false)
     const [formData, setFormData] = useState({
         name: "",
         email: "",
         organization: "",
         organizationType: "",
         role: "",
         district: "",
         notes: ""
     })
 
     const handleSubmit = async () => {
         if (!formData.name || !formData.email || !formData.role || !formData.district) {
             toast.error("Please fill in all required fields (Name, Email, Role, District)")
             return
         }
 
         setLoading(true)
         try {
             const response = await fetch('/api/stakeholders', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ ...formData, mode })
             })
 
             const data = await response.json()
 
             if (!response.ok) {
                 throw new Error(data.error || 'Failed to save stakeholder')
             }
 
             toast.success(data.message || "Stakeholder saved successfully!")
             setOpen(false)
             // Reset form
             setFormData({
                 name: "",
                 email: "",
                 organization: "",
                 organizationType: "",
                 role: "",
                 district: "",
                 notes: ""
             })
         } catch (error: any) {
             toast.error(error.message || "Something went wrong")
         } finally {
             setLoading(false)
         }
     }
 
     return (
         <Dialog open={open} onOpenChange={setOpen}>
             <DialogTrigger asChild>
                 {trigger ? trigger : (
                     <Button variant={mode === 'admin' ? "default" : "outline"}>
                         <UserPlus className="mr-2 h-4 w-4" />
                         {mode === 'admin' ? "Add Verified Stakeholder" : "Propose Stakeholder"}
                     </Button>
                 )}
             </DialogTrigger>
             <DialogContent className="sm:max-w-[500px]">
                 <DialogHeader>
                     <DialogTitle>{mode === 'admin' ? "Add New Stakeholder" : "Propose New Stakeholder"}</DialogTitle>
                     <DialogDescription>
                         {mode === 'admin'
                             ? "Add a verified stakeholder directly to the directory."
                             : "Submit a stakeholder for verification by the admin team."}
                     </DialogDescription>
                 </DialogHeader>
 
                 <div className="space-y-4 py-4">
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                             <Label>Full Name*</Label>
                             <Input
                                 placeholder="Dr. Name Surname"
                                 value={formData.name}
                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                 disabled={loading}
                             />
                         </div>
                         <div className="space-y-2">
                             <Label>Email*</Label>
                             <Input
                                 placeholder="email@org.com"
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                 disabled={loading}
                             />
                         </div>
                     </div>
 
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                             <Label>Organization</Label>
                             <Input
                                 placeholder="Organization Name"
                                 value={formData.organization}
                                 onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                 disabled={loading}
                             />
                         </div>
                         <div className="space-y-2">
                             <Label>Organization Type</Label>
                             <Select 
                                 value={formData.organizationType} 
                                 onValueChange={(val) => setFormData({ ...formData, organizationType: val })}
                                 disabled={loading}
                             >
                                 <SelectTrigger>
                                     <SelectValue placeholder="Select type" />
                                 </SelectTrigger>
                                 <SelectContent>
                                     {ORG_TYPES.map(type => (
                                         <SelectItem key={type} value={type}>{type}</SelectItem>
                                     ))}
                                 </SelectContent>
                             </Select>
                         </div>
                     </div>
 
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                             <Label>Role / Designation*</Label>
                             <Input
                                 placeholder="e.g. Director"
                                 value={formData.role}
                                 onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                 disabled={loading}
                             />
                         </div>
                         <div className="space-y-2">
                             <Label>District*</Label>
                             <Select 
                                 value={formData.district} 
                                 onValueChange={(val) => setFormData({ ...formData, district: val })}
                                 disabled={loading}
                             >
                                 <SelectTrigger>
                                     <SelectValue placeholder="Select district" />
                                 </SelectTrigger>
                                 <SelectContent>
                                     {DISTRICTS.map(d => (
                                         <SelectItem key={d} value={d}>{d}</SelectItem>
                                     ))}
                                 </SelectContent>
                             </Select>
                         </div>
                     </div>
 
                     <div className="space-y-2">
                         <Label>{mode === 'admin' ? "Verification Notes" : "Context / Notes"}</Label>
                         <Input
                             placeholder={mode === 'admin' ? "Internal notes about this stakeholder" : "How did you meet? Why verify them?"}
                             value={formData.notes}
                             onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                             disabled={loading}
                         />
                     </div>
 
                     <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                         {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                         {mode === 'admin' ? "Create Stakeholder" : "Submit Proposal"}
                     </Button>
                 </div>
             </DialogContent>
         </Dialog>
     )
 }
 
