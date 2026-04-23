'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SECTORS } from '@/lib/constants/sectors';

const data = [
    { name: 'Advanced Manufacturing', value: 400 },
    { name: 'Fintech', value: 300 },
    { name: 'Agritech', value: 300 },
    { name: 'Edtech', value: 200 },
];

export function SectorDistributionChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sector Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => {
                                const sector = SECTORS.find(s => s.label === entry.name);
                                return (
                                    <Cell key={`cell-${index}`} fill={sector?.color || '#8884d8'} />
                                )
                            })}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                    {data.map((entry, index) => {
                        const sector = SECTORS.find(s => s.label === entry.name);
                        return (
                            <div key={index} className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: sector?.color || '#8884d8' }} />
                                <span>{entry.name}</span>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
