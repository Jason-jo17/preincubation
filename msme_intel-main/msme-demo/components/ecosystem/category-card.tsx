
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Landmark, Users, Megaphone, Scale, Globe, ArrowRight, Code } from "lucide-react"
import Link from "next/link"
import { EcosystemCategory } from "@/lib/demo-data/ecosystem-providers"

const iconMap = {
    Cpu,
    Landmark,
    Users,
    Megaphone,
    Scale,
    Globe,
    Code
}

interface CategoryCardProps {
    category: EcosystemCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
    const Icon = iconMap[category.icon_name] || Globe;

    return (
        <Link href={`/ecosystem/${category.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-l-4 hover:border-l-primary group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">
                        {category.title}
                    </CardTitle>
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                    <CardDescription className="mb-4">
                        {category.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <Badge variant="secondary">
                            {category.companies.length} Providers
                        </Badge>
                        <span className="flex items-center group-hover:text-primary group-hover:underline transition-all">
                            View Directory <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
