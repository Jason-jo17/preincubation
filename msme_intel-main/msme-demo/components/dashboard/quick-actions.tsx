"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FilePlus, RefreshCw, Upload } from "lucide-react"

export function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Data
                </Button>
                <Button variant="outline">
                    <FilePlus className="mr-2 h-4 w-4" />
                    New Report
                </Button>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
                <Button variant="ghost" size="icon">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    )
}
