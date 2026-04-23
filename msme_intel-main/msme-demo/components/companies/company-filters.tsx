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
import { ALL_COMPANIES_FOR_FILTERS } from '@/lib/demo-data/companies';
import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface CompanyFiltersProps {
    filters: {
        sector: string | null;
        stage: string | null;
        region: string | null;
        search: string;
    };
    onFiltersChange: (filters: any) => void;
}

export function CompanyFilters({ filters, onFiltersChange }: CompanyFiltersProps) {
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Extract unique regions/states from all companies
    const regions = useMemo(() => {
        const uniqueStates = Array.from(new Set(
            ALL_COMPANIES_FOR_FILTERS
                .map(c => c.headquarters_state)
                .filter(Boolean) as string[]
        )).sort();
        return uniqueStates;
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const updateFilter = (key: string, value: string | null) => {
        onFiltersChange({ ...filters, [key]: value === 'all' ? null : value });
    };

    const handleSearchChange = (value: string) => {
        updateFilter('search', value);
        if (value.trim().length > 0) {
            const lower = value.toLowerCase();
            const matches = ALL_COMPANIES_FOR_FILTERS
                .filter(c => c.name.toLowerCase().includes(lower))
                .slice(0, 5)
                .map(c => c.name);
            setSuggestions(matches);
            setOpen(true);
        } else {
            setSuggestions([]);
            setOpen(false);
        }
    };

    const handleSuggestionClick = (name: string) => {
        updateFilter('search', name);
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1" ref={wrapperRef}>
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search companies..."
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => { if (filters.search) setOpen(true) }}
                    className="pl-9"
                />
                {open && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 z-10 w-full mt-1 bg-popover border rounded-md shadow-md overflow-hidden">
                        {suggestions.map((name, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm"
                                onClick={() => handleSuggestionClick(name)}
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                <Select
                    value={filters.sector || 'all'}
                    onValueChange={(value) => updateFilter('sector', value)}
                >
                    <SelectTrigger className="w-[160px]">
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
                    value={filters.region || 'all'}
                    onValueChange={(value) => updateFilter('region', value)}
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                                {region}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filters.stage || 'all'}
                    onValueChange={(value) => updateFilter('stage', value)}
                >
                    <SelectTrigger className="w-[140px]">
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
