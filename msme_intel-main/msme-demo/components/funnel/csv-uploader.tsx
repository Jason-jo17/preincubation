'use client';

import { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust if environment var available

export function CSVUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleUpload() {
        if (!file) return;

        setUploading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_BASE_URL}/company-funnel/upload/csv`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setUploading(false);
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Upload Companies (CSV)</CardTitle>
            </CardHeader>
            <CardContent>
                {!result ? (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:bg-muted/50">
                            <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="csv-upload"
                            />
                            <label htmlFor="csv-upload" className="cursor-pointer">
                                <Button variant="outline" asChild className="pointer-events-none">
                                    <span>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Select CSV File
                                    </span>
                                </Button>
                            </label>
                            {file ? (
                                <p className="mt-2 text-sm font-medium text-emerald-600">{file.name}</p>
                            ) : (
                                <p className="mt-2 text-sm text-muted-foreground">Drag & drop or click to select</p>
                            )}
                        </div>

                        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                            <p className="font-semibold mb-1 text-xs uppercase tracking-wider">Required CSV Columns:</p>
                            <code className="text-xs break-all">
                                name,sector,sub_sector,cin,website,employee_count,founded_year,city,state
                            </code>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="w-full"
                        >
                            {uploading ? 'Uploading...' : 'Upload Companies'}
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-6 space-y-4">
                        <div className="flex justify-center">
                            <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in duration-300" />
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight">Upload Successful!</h3>
                        <p className="text-muted-foreground">
                            <span className="font-bold text-foreground">{result.companies_created}</span> companies have been added to Stage 1.
                        </p>
                        <Button className="w-full mt-4" onClick={() => window.location.href = '/funnel'}>
                            View Funnel Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => { setResult(null); setFile(null); }}>
                            Upload Another
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
