'use client';

import React, { useState } from 'react';
import { 
    Shield, 
    Search, 
    Filter, 
    Download, 
    Clock, 
    User, 
    Activity, 
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Lock,
    Settings,
    UserPlus,
    UserMinus,
    Database,
    Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Mock audit data
const MOCK_LOGS = [
    {
        id: 'LOG-001',
        timestamp: '2026-04-25 14:32:01',
        user: 'Jason (Admin)',
        action: 'UPDATE_ROLE',
        target: 'sarah.smith@example.com',
        details: 'Changed role from STUDENT to MANAGER',
        severity: 'MEDIUM',
        icon: UserPlus,
        color: 'text-blue-500'
    },
    {
        id: 'LOG-002',
        timestamp: '2026-04-25 14:15:22',
        user: 'System Bot',
        action: 'DB_BACKUP',
        target: 'Production-DB-Cluster',
        details: 'Automated nightly snapshot successful',
        severity: 'LOW',
        icon: Database,
        color: 'text-emerald-500'
    },
    {
        id: 'LOG-003',
        timestamp: '2026-04-25 13:45:10',
        user: 'Avery (Admin)',
        action: 'SECURITY_CONFIG',
        target: 'Auth-Middleware',
        details: 'Enabled Two-Factor Authentication enforcement for all ADMIN roles',
        severity: 'HIGH',
        icon: Shield,
        color: 'text-accent'
    },
    {
        id: 'LOG-004',
        timestamp: '2026-04-25 12:30:05',
        user: 'Marcus (Manager)',
        action: 'COHORT_CREATE',
        target: 'Q2-FinTech-Accelerator',
        details: 'Created new cohort with 15 initial seats',
        severity: 'LOW',
        icon: Zap,
        color: 'text-purple-500'
    },
    {
        id: 'LOG-005',
        timestamp: '2026-04-25 11:20:45',
        user: 'External API',
        action: 'SYNC_ERROR',
        target: 'Stripe-Integration',
        details: 'Failed to sync subscription status for sub_88291. Retrying in 5m.',
        severity: 'CRITICAL',
        icon: AlertCircle,
        color: 'text-red-500'
    },
    {
        id: 'LOG-006',
        timestamp: '2026-04-25 10:05:33',
        user: 'Jason (Admin)',
        action: 'DELETE_USER',
        target: 'temp_account_99@test.com',
        details: 'Hard deletion of test account and associated metadata',
        severity: 'HIGH',
        icon: UserMinus,
        color: 'text-red-400'
    },
    {
        id: 'LOG-007',
        timestamp: '2026-04-25 09:12:11',
        user: 'System Oracle',
        action: 'SETTINGS_CHANGE',
        target: 'Global-Theme-Config',
        details: 'Updated primary branding color to #FF3B30',
        severity: 'MEDIUM',
        icon: Settings,
        color: 'text-orange-500'
    },
    {
        id: 'LOG-008',
        timestamp: '2026-04-24 23:59:59',
        user: 'System Bot',
        action: 'PURGE_CACHE',
        target: 'Vercel-Edge-Config',
        details: 'Cleared deployment cache for branch main',
        severity: 'LOW',
        icon: RefreshCw,
        color: 'text-slate-500'
    }
];

export default function AuditLogsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [severityFilter, setSeverityFilter] = useState('ALL');

    const filteredLogs = MOCK_LOGS.filter(log => {
        const matchesSearch = log.details.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             log.action.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
        return matchesSearch && matchesSeverity;
    });

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case 'LOW': return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">Low</Badge>;
            case 'MEDIUM': return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-[9px] font-black uppercase tracking-widest">Medium</Badge>;
            case 'HIGH': return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[9px] font-black uppercase tracking-widest">High</Badge>;
            case 'CRITICAL': return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-[9px] font-black uppercase tracking-widest animate-pulse">Critical</Badge>;
            default: return null;
        }
    };

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-accent">
                        <Lock className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Security Protocol</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.8]">
                        System<br />
                        <span className="text-accent">Audit Logs</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-14 px-8 rounded-none border-2 border-black font-black uppercase italic tracking-widest hover:bg-black hover:text-white transition-all">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                    <Button className="h-14 px-8 rounded-none bg-accent text-white font-black uppercase italic tracking-widest shadow-[8px_8px_0px_0px_rgba(255,59,48,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        Live Stream
                    </Button>
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-accent transition-colors" />
                    <Input 
                        placeholder="Search logs by action, user, or details..." 
                        className="h-16 pl-12 bg-surface border-2 border-border focus:border-accent rounded-none text-lg font-bold placeholder:font-black placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="md:col-span-4 flex gap-2">
                    {['ALL', 'HIGH', 'CRITICAL'].map((sev) => (
                        <Button
                            key={sev}
                            variant={severityFilter === sev ? 'default' : 'outline'}
                            onClick={() => setSeverityFilter(sev)}
                            className={`flex-1 h-16 rounded-none font-black uppercase italic text-[10px] tracking-widest transition-all ${
                                severityFilter === sev ? 'bg-black text-white' : 'hover:border-accent hover:text-accent'
                            }`}
                        >
                            {sev}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Logs Table */}
            <Card className="rounded-none border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                <CardHeader className="bg-black text-white h-12 flex flex-row items-center justify-between py-0">
                    <div className="flex items-center gap-8">
                        <span className="text-[10px] font-black uppercase tracking-widest w-24">Timestamp</span>
                        <span className="text-[10px] font-black uppercase tracking-widest w-32">Identity</span>
                        <span className="text-[10px] font-black uppercase tracking-widest w-40">Operation</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Detail Trace</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Risk</span>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y-2 divide-black/5">
                        {filteredLogs.map((log, index) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={log.id} 
                                className="group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-accent/5 transition-colors cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-8 flex-1">
                                    <div className="w-24 text-[10px] font-bold text-text-muted">
                                        {log.timestamp.split(' ')[1]}
                                        <br />
                                        <span className="text-[9px] opacity-50 font-normal">{log.timestamp.split(' ')[0]}</span>
                                    </div>
                                    <div className="w-32 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center">
                                            <User className="w-4 h-4 text-text-muted" />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-tight">{log.user.split(' ')[0]}</span>
                                    </div>
                                    <div className="w-40">
                                        <div className="flex items-center gap-2">
                                            <log.icon className={`w-4 h-4 ${log.color}`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{log.action}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-text line-clamp-1 group-hover:text-accent transition-colors">{log.details}</p>
                                        <p className="text-[10px] text-text-muted font-mono uppercase">Target: {log.target}</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    {getSeverityBadge(log.severity)}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredLogs.length === 0 && (
                        <div className="p-20 text-center space-y-4">
                            <Activity className="w-12 h-12 text-border mx-auto animate-pulse" />
                            <p className="font-black uppercase italic tracking-widest text-text-muted">No tactical logs found matching criteria</p>
                            <Button variant="link" onClick={() => {setSearchQuery(''); setSeverityFilter('ALL');}} className="text-accent font-black uppercase text-[10px]">Reset Uplink</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                    Showing {filteredLogs.length} of {MOCK_LOGS.length} system events
                </p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-12 h-12 rounded-none border-2 border-black p-0">
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-1 px-4 h-12 bg-black text-white font-black italic">
                        1
                    </div>
                    <Button variant="outline" className="w-12 h-12 rounded-none border-2 border-black p-0">
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
