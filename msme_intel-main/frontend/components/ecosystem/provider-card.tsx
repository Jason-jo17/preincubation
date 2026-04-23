'use client';

import { EcosystemProvider } from '@/lib/api/ecosystem';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, ExternalLink, Star } from 'lucide-react';

interface ProviderCardProps {
    provider: EcosystemProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <Badge variant="secondary">{provider.service_type}</Badge>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded text-xs font-semibold text-primary">
                        <Star className="h-3 w-3 fill-primary" />
                        {provider.match_score}% Match
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 text-sm text-muted-foreground">
                <p className="line-clamp-3">{provider.description}</p>
            </CardContent>
            <CardFooter className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={`mailto:${provider.contact_email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contact
                    </a>
                </Button>
                <Button variant="ghost" size="sm" className="flex-1" asChild>
                    <a href={provider.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Website
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
