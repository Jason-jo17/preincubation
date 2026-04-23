import { format } from 'date-fns';

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US', {
        notation: num >= 1000000 ? 'compact' : 'standard',
        maximumFractionDigits: 1,
    }).format(num);
}

export function formatDate(date: string | Date): string {
    return format(new Date(date), 'MMM d, yyyy');
}

export function formatPercent(value: number): string {
    return `${value.toFixed(1)}%`;
}
