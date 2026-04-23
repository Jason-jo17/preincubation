
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EcosystemCompany } from "@/lib/demo-data/ecosystem-providers"
import { Globe, Mail, MapPin, Star, Phone } from "lucide-react"

interface CompanyCardProps {
    company: EcosystemCompany;
}

export function CompanyCard({ company }: CompanyCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-all">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-bold">{company.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {company.location}
                        </div>
                    </div>
                    <div className="flex items-center bg-secondary px-2 py-1 rounded text-xs font-medium">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {company.rating}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="mb-4 text-sm">
                    {company.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                    {company.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                            {service}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex gap-2">
                    {company.contact.website && (
                        <Button variant="outline" size="sm" asChild>
                            <a href={company.contact.website} target="_blank" rel="noopener noreferrer">
                                <Globe className="h-4 w-4 mr-2" />
                                Website
                            </a>
                        </Button>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" title={company.contact.email}>
                        <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title={company.contact.phone}>
                        <Phone className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
