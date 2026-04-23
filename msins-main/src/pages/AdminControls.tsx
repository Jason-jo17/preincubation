import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Users, Shield, Settings, Database, FileText } from "lucide-react";

const users = [
  { name: "CEO Office", email: "ceo@maharashtra.gov.in", role: "Super Admin", status: "Active", lastLogin: "2h ago" },
  { name: "Regional Director — Pune", email: "rd.pune@maharashtra.gov.in", role: "Admin", status: "Active", lastLogin: "4h ago" },
  { name: "Regional Director — Nagpur", email: "rd.nagpur@maharashtra.gov.in", role: "Admin", status: "Active", lastLogin: "1d ago" },
  { name: "Program Manager", email: "pm@maharashtra.gov.in", role: "Manager", status: "Active", lastLogin: "6h ago" },
  { name: "Finance Controller", email: "finance@maharashtra.gov.in", role: "Finance", status: "Active", lastLogin: "3h ago" },
  { name: "Data Analyst", email: "analyst@maharashtra.gov.in", role: "Viewer", status: "Active", lastLogin: "1h ago" },
  { name: "External Auditor", email: "audit@external.com", role: "Viewer", status: "Inactive", lastLogin: "30d ago" },
];

const permissions = [
  { module: "CEO Overview", superAdmin: true, admin: true, manager: true, finance: false, viewer: true },
  { module: "Regional Intelligence", superAdmin: true, admin: true, manager: true, finance: false, viewer: true },
  { module: "Fund Governance", superAdmin: true, admin: true, manager: false, finance: true, viewer: false },
  { module: "Admin Controls", superAdmin: true, admin: false, manager: false, finance: false, viewer: false },
  { module: "Reports Center", superAdmin: true, admin: true, manager: true, finance: true, viewer: true },
];

const auditLogs = [
  { action: "User login", user: "CEO Office", time: "2h ago", details: "Successful login from 10.0.x.x" },
  { action: "Report exported", user: "Data Analyst", time: "3h ago", details: "Monthly CEO Report — PDF" },
  { action: "Alert resolved", user: "Program Manager", time: "5h ago", details: "Closed: 12 Low Activity Cohorts" },
  { action: "Data source updated", user: "Regional Director — Pune", time: "8h ago", details: "MSME registry sync completed" },
  { action: "User role changed", user: "Super Admin", time: "1d ago", details: "External Auditor → Viewer role" },
];

const AdminControls = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Admin Controls</h1>
          <p className="text-xs text-muted-foreground mt-1">User management, permissions, data sources, and audit logs</p>
        </div>

        {/* User Management */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">User Management</h2>
            </div>
            <button className="text-xs text-primary-foreground bg-primary px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">+ Add User</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Name", "Email", "Role", "Status", "Last Login"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.email} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors">
                    <td className="py-2.5 px-3 font-medium text-foreground">{u.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground text-xs">{u.email}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={u.role} /></td>
                    <td className="py-2.5 px-3"><StatusBadge status={u.status} /></td>
                    <td className="py-2.5 px-3 text-xs text-muted-foreground">{u.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Permission Matrix */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Permission Matrix</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-2 text-left text-[10px] text-muted-foreground">Module</th>
                    <th className="py-2 px-2 text-center text-[10px] text-muted-foreground">Super Admin</th>
                    <th className="py-2 px-2 text-center text-[10px] text-muted-foreground">Admin</th>
                    <th className="py-2 px-2 text-center text-[10px] text-muted-foreground">Manager</th>
                    <th className="py-2 px-2 text-center text-[10px] text-muted-foreground">Finance</th>
                    <th className="py-2 px-2 text-center text-[10px] text-muted-foreground">Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map(p => (
                    <tr key={p.module} className="border-b border-border/50">
                      <td className="py-2 px-2 text-foreground">{p.module}</td>
                      {[p.superAdmin, p.admin, p.manager, p.finance, p.viewer].map((v, i) => (
                        <td key={i} className="py-2 px-2 text-center">{v ? <span className="text-success">✓</span> : <span className="text-muted-foreground">—</span>}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Audit Logs</h2>
            </div>
            <div className="space-y-2">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-secondary/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-foreground">{log.action}</span>
                      <span className="text-[10px] text-muted-foreground">{log.time}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{log.user} — {log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Data Source Settings</h2>
            </div>
            <div className="space-y-2">
              {[
                { name: "MSME Registry", status: "Connected", lastSync: "2h ago" },
                { name: "MSINS Incubation Data", status: "Connected", lastSync: "4h ago" },
                { name: "Fund Disbursement System", status: "Connected", lastSync: "1h ago" },
                { name: "Startup India Registry", status: "Pending", lastSync: "—" },
              ].map(ds => (
                <div key={ds.name} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-xs font-medium text-foreground">{ds.name}</p>
                    <p className="text-[10px] text-muted-foreground">Last sync: {ds.lastSync}</p>
                  </div>
                  <StatusBadge status={ds.status === "Connected" ? "Active" : "Pending"} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Database className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Add Incubator</h2>
            </div>
            <div className="space-y-3">
              <input className="w-full text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground" placeholder="Incubator Name" />
              <input className="w-full text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground" placeholder="District" />
              <select className="w-full text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground">
                <option>Select Division</option>
                <option>Pune</option><option>Konkan</option><option>Nashik</option><option>Aurangabad</option><option>Amravati</option><option>Nagpur</option>
              </select>
              <button className="w-full text-xs text-primary-foreground bg-primary px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors">Add Incubator</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminControls;
