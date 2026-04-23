'use client';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { SECTORS } from '@/lib/constants/sectors';

interface CompanyFiltersProps {
    filters: {
        sector: string | null;
        stage: string | null;
        search: string;
    };
    onFiltersChange: (filters: any) => void;
}

export function CompanyFilters({ filters, onFiltersChange }: CompanyFiltersProps) {
    const updateFilter = (key: string, value: string | null) => {
        onFiltersChange({ ...filters, [key]: value === 'all' ? null : value });
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search companies..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="pl-9"
                />
            </div>
            <div className="flex gap-2">
                <Select
                    value={filters.sector || 'all'}
                    onValueChange={(value) => updateFilter('sector', value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sector" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Sectors</SelectItem>
                        {SECTORS.map((sector) => (
                            <SelectItem key={sector.value} value={sector.value}>
                                {sector.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filters.stage || 'all'}
                    onValueChange={(value) => updateFilter('stage', value)}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="early">Early</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                        <SelectItem value="mature">Mature</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
