import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Users, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { MH_SECTORS_DATA } from '@/lib/data/msme-sectors-data';

const mockDataTemplate = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 550 },
    { name: 'Apr', value: 450 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 700 },
];

const COLORS = ['#06B6D4', '#475569', '#6366F1', '#F59E0B', '#BE185D', '#10B981', '#3B82F6', '#8B5CF6'];

export default function SectorThesisPage() {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-7xl mx-auto py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sector Thesis Matrix</h1>
                        <p className="text-muted-foreground mt-1">Analyze performance and high-growth trends across key industrial vectors in Maharashtra.</p>
                    </div>
                    <Button onClick={() => navigate('#')} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-sm font-bold">
                        <Plus className="mr-2 h-4 w-4" />
                        Compile New Thesis
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {MH_SECTORS_DATA.map((sector, index) => {
                        const color = COLORS[index % COLORS.length];
                        return (
                            <Card key={sector.sector_code} className="flex flex-col border-border shadow-sm hover:border-primary/40 transition-colors">
                                <CardHeader className="bg-muted/10 border-b border-border pb-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-black">{sector.sector_name}</CardTitle>
                                        <div className="h-4 w-4 rounded-full shadow-inner border border-black/10 flex-shrink-0 ml-2" style={{ backgroundColor: color }} />
                                    </div>
                                    <CardDescription className="text-xs uppercase tracking-widest font-bold">Market Analysis & Trends</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-5 pt-6">
                                    <div className="h-[120px] w-full bg-muted/20 rounded-xl p-2 border border-border">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={mockDataTemplate.map(d => ({...d, value: d.value + (index * 50)}))}>
                                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                                                <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm bg-muted/10 p-3 rounded-xl border border-border/50">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Market Size</span>
                                            <span className="font-black text-foreground flex items-center text-sm md:text-md truncate">
                                                ₹{sector.overview?.market_size_maharashtra_inr_cr || 'N/A'} Cr
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">MSMEs</span>
                                            <span className="font-black text-foreground flex items-center text-sm md:text-md truncate">
                                                <Users className="h-3 w-3 inline-block mr-1 text-muted-foreground" /> {sector.overview?.number_of_msmes_approx || 'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-2 mt-auto">
                                        <Button variant="outline" className="w-full justify-between rounded-xl font-bold hover:bg-primary/5 hover:text-primary transition-colors" onClick={() => navigate(`/ceo/thesis/${sector.sector_code}`)}>
                                            Access Full Thesis
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}
