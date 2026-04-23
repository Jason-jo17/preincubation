'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ECOSYSTEM_DATA } from '@/lib/demo-data/ecosystem-providers';

// Mock Data for Visuals
const FUNDING_DATA = [
    { name: 'Government Grants', value: 4500, color: '#22c55e' }, // Green
    { name: 'Venture Capital', value: 8200, color: '#3b82f6' },   // Blue
    { name: 'Debt Financing', value: 6100, color: '#f59e0b' },    // Amber
    { name: 'Angel Investment', value: 2300, color: '#8b5cf6' },  // Purple
];

const CATEGORY_DATA = ECOSYSTEM_DATA.map(cat => ({
    name: cat.title,
    count: cat.companies.length,
    color: '#0f172a' // Slate-900
}));

export function FundingAccessChart() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Ecosystem Funding Access Details</CardTitle>
                <CardDescription>Total Funding Pool Distribution (₹ Cr)</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={FUNDING_DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {FUNDING_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `₹${value} Cr`}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export function EnrolledEcosystemsChart() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Enrolled Ecosystems</CardTitle>
                <CardDescription>Total Number of Partners by Category</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={CATEGORY_DATA} layout="vertical" margin={{ left: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={100}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export function EcosystemStats() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <FundingAccessChart />
            <EnrolledEcosystemsChart />
        </div>
    );
}
