
"use client"

import { PageHeader } from "@/components/shared/page-header"
import { CompanyCard } from "@/components/ecosystem/company-card"
import { getCategoryById } from "@/lib/demo-data/ecosystem-providers"
import { useEcosystemStore } from '@/lib/hooks/use-ecosystem'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function CategoryPage() {
    const params = useParams()
    const categoryId = params.category as string
    const { activeEcosystem } = useEcosystemStore();
    const category = getCategoryById(categoryId, activeEcosystem)
    const [search, setSearch] = useState("")

    if (!category) {
        return (
            <div className="p-6">
                <div className="text-center text-muted-foreground">Category not found</div>
                <Button asChild className="mt-4" variant="outline">
                    <Link href="/ecosystem"> <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory</Link>
                </Button>
            </div>
        )
    }

    const filteredCompanies = category.companies.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.services.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
        c.location.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                 <Button asChild variant="ghost" size="sm" className="-ml-2">
                    <Link href="/ecosystem">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>

            <PageHeader
                title={category.title}
                description={category.description}
                action={
                    <div className="relative w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={`Search ${category.title}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                }
            />

            {filteredCompanies.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCompanies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                        <Search className="h-12 w-12 mb-4 opacity-20" />
                        <p>No companies found matching your search.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
