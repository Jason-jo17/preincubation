
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, Bot, FileText, Loader2, Trash2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { SectorThesis } from '@/lib/types/sector-thesis';
import { SectorThesisDetail } from '@/components/sectors/sector-thesis-detail';

import { SECTOR_THESES } from '@/lib/demo-data/sector-thesis';

// Use the rich Artificial Intelligence thesis from the shared mock data
const MOCK_GENERATED_THESIS: SectorThesis = {
    ...SECTOR_THESES['artificial_intelligence'],
    status: 'draft', // Set to draft as it's being "generated"
    id: 'generated_ai_thesis'
};


export default function NewSectorThesisPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('generate');
    const [files, setFiles] = useState<File[]>([]);
    const [processingStep, setProcessingStep] = useState<string>('');
    const [generatedThesis, setGeneratedThesis] = useState<SectorThesis | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleGenerate = async () => {
        if (files.length === 0) {
            toast({
                title: "No sources provided",
                description: "Please upload at least one document (PDF, DOCX) to generate the thesis.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        // Simulation Steps
        setProcessingStep(`Reading ${files.length} documents...`);
        await new Promise(r => setTimeout(r, 1500));

        setProcessingStep('Extracting market structure & competitors...');
        await new Promise(r => setTimeout(r, 2000));

        setProcessingStep('Synthesizing growth drivers and risks...');
        await new Promise(r => setTimeout(r, 1500));

        setProcessingStep('Structuring executive summary...');
        await new Promise(r => setTimeout(r, 1000));

        // Set the full rich mock object
        // Set the full rich mock object
        setGeneratedThesis(MOCK_GENERATED_THESIS);

        setIsLoading(false);
        setProcessingStep('');
        setActiveTab('preview');
        toast({
            title: "Thesis Generated",
            description: "AI has successfully synthesized your documents into a Sector Thesis.",
        });
    };

    const handleSave = () => {
        toast({
            title: "Sector Thesis Saved",
            description: "The new sector thesis has been added to your portfolio.",
        });
        setTimeout(() => router.push('/sectors'), 1000);
    };

    return (
        <div className="space-y-6 page-transition">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <PageHeader
                    title="Add Sector Thesis"
                    description="Create a new investment thesis using AI or manual entry."
                />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="generate">
                        <Bot className="w-4 h-4 mr-2" />
                        AI Generator
                    </TabsTrigger>
                    <TabsTrigger value="preview" disabled={!generatedThesis}>
                        <FileText className="w-4 h-4 mr-2" />
                        Preview Result
                    </TabsTrigger>
                </TabsList>

                {/* AI Generator Tab */}
                <TabsContent value="generate" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Source Material</CardTitle>
                            <CardDescription>
                                Upload research reports, whitepapers, or market data files. Our AI will synthesize them into a structured thesis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="border-2 border-dashed rounded-lg p-10 text-center hover:bg-slate-50 transition-colors">
                                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                                <div className="space-y-2">
                                    <h3 className="font-medium">Drop files here or click to upload</h3>
                                    <p className="text-sm text-muted-foreground">Support for PDF, DOCX, TXT (Max 10MB)</p>
                                </div>
                                <Input
                                    type="file"
                                    className="hidden"
                                    id="file-upload"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <Button className="mt-4" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                                    Select Files
                                </Button>
                            </div>

                            {files.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Attached Sources ({files.length})</Label>
                                    <div className="space-y-2">
                                        {files.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-secondary rounded-md text-sm">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-primary" />
                                                    <span className="truncate max-w-[300px]">{file.name}</span>
                                                    <span className="text-muted-foreground text-xs">({(file.size / 1024).toFixed(0)} KB)</span>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(idx)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isLoading && (
                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-2 text-primary font-medium">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        {processingStep}
                                    </div>
                                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full animate-progress origin-left"></div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg" onClick={handleGenerate} disabled={isLoading || files.length === 0}>
                                {isLoading ? 'Generating Thesis...' : 'Generate Sector Thesis'}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Preview Tab (Read-Only Rich View) */}
                <TabsContent value="preview" className="space-y-6 mt-6">
                    {generatedThesis ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2 text-green-800">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span className="font-medium">Thesis successfully generated from {files.length} documents.</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => setActiveTab('generate')}>Back to Upload</Button>
                                    <Button onClick={handleSave}>Save to Portfolio</Button>
                                </div>
                            </div>

                            {/* Reusing the exact same rich view component */}
                            <SectorThesisDetail thesis={generatedThesis} />
                        </div>
                    ) : (
                        <div className="text-center py-20 text-muted-foreground">
                            Upload documents and generate the thesis to view the preview.
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
