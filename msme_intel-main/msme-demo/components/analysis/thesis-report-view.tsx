"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { SECTOR_THESES } from "@/lib/demo-data/sector-thesis"
import { ExternalLink } from "lucide-react"

export function ThesisReportView() {
    const [selectedSector, setSelectedSector] = useState("aerospace_supply_chain")

    // Fallback to aerospace if specific key not found or use first available
    const thesis = SECTOR_THESES[selectedSector] || SECTOR_THESES["aerospace"]

    // Parse text to find citations [^n] and replace with clickable superscripts
    const renderTextWithCitations = (text: string) => {
        if (!text) return null;

        // Split text by citation pattern
        const parts = text.split(/(\[\^\d+\])/g);

        return parts.map((part, index) => {
            const match = part.match(/^\[\^(\d+)\]$/);
            if (match) {
                const citationId = match[1];
                return (
                    <sup key={index} className="ml-0.5 text-xs text-blue-500 font-medium cursor-pointer hover:underline">
                        <a href={`#citation-${citationId}`}>
                            [{citationId}]
                        </a>
                    </sup>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">AI Sector Thesis Reports</h3>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="aerospace">Aerospace</SelectItem>
                        <SelectItem value="aerospace_supply_chain">Aerospace Supply Chain</SelectItem>
                        <SelectItem value="artificial_intelligence">Artificial Intelligence</SelectItem>
                        <SelectItem value="fintech">FinTech</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {thesis ? (
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{thesis.display_name} Thesis</CardTitle>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="outline">{thesis.research_date}</Badge>
                                        <Badge>{thesis.status}</Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary">{thesis.market_stats?.forecast_size_display}</div>
                                    <div className="text-xs text-muted-foreground">Forecast by {thesis.market_stats?.forecast_year}</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="font-semibold mb-2">Executive Summary</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {renderTextWithCitations(thesis.executive_summary)}
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">Investment Thesis</h4>
                                <p className="text-sm border-l-4 border-primary pl-4 italic bg-muted/20 p-2 rounded-r">
                                    {renderTextWithCitations(thesis.investment_thesis)}
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">Key Findings</h4>
                                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                    {thesis.key_findings.map((finding: string, i: number) => (
                                        <li key={i}>{renderTextWithCitations(finding)}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Growth Drivers</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {thesis.growth_drivers.map((driver: any, i: number) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="font-medium text-sm">{driver.name}</span>
                                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500 rounded-full"
                                                style={{ width: `${driver.estimated_impact_percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Citations & Sources</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px] w-full pr-4">
                                    <div className="space-y-3">
                                        {thesis.citations?.map((cit: any, idx: number) => (
                                            <div key={cit.id} id={`citation-${idx + 1}`} className="text-xs border-b pb-2 last:border-0 scroll-mt-4">
                                                <div className="flex gap-2">
                                                    <span className="text-blue-500 font-mono">[{idx + 1}]</span>
                                                    <div className="flex-1 overflow-hidden">
                                                        <div className="font-semibold truncate">{cit.source_name}</div>
                                                        <div className="text-muted-foreground line-clamp-2 my-1">{cit.title}</div>
                                                        <a href={cit.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                                                            Source Link <ExternalLink className="h-2 w-2" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="text-center p-12 text-muted-foreground">
                    Select a sector to view the AI Thesis.
                </div>
            )}
        </div>
    )
}
