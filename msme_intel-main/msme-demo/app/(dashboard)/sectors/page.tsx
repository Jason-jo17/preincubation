'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SECTORS } from '@/lib/constants/sectors';
import { TrendingUp, Users, DollarSign, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for sector performance
const mockData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 550 },
    { name: 'Apr', value: 450 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 700 },
];

export default function SectorsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Sector Overview"
                description="Analyze performance and trends across key operational sectors."
                action={
                    <Link href="/sectors/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Sector Thesis
                        </Button>
                    </Link>
                }
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {SECTORS.map((sector) => (
                    <Card key={sector.value} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">{sector.label}</CardTitle>
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: sector.color }} />
                            </div>
                            <CardDescription>Market Analysis & Trends</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="h-[100px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mockData}>
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '12px' }} />
                                        <Bar dataKey="value" fill={sector.color} radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Growth</span>
                                    <span className="font-semibold text-green-600 flex items-center">
                                        <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Companies</span>
                                    <span className="font-semibold flex items-center">
                                        <Users className="h-3 w-3 mr-1" /> 45 Active
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 mt-auto">
                                <Link href={`/sectors/${sector.value}`}>
                                    <Button variant="outline" className="w-full justify-between">
                                        View Sector Thesis
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
