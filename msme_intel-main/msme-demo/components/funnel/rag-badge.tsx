
import { Badge } from '@/components/ui/badge';

interface RAGBadgeProps {
    status: 'red' | 'amber' | 'green';
    category: 'stretched_fit' | 'best_fit' | 'best_bet';
    size?: 'sm' | 'md' | 'lg';
}

const RAG_CONFIG = {
    red: {
        label: 'Stretched Fit',
        color: 'bg-red-500 hover:bg-red-600 text-white border-transparent',
        icon: '🔴',
    },
    amber: {
        label: 'Best Fit',
        color: 'bg-amber-500 hover:bg-amber-600 text-white border-transparent',
        icon: '🟡',
    },
    green: {
        label: 'Best Bet',
        color: 'bg-green-500 hover:bg-green-600 text-white border-transparent',
        icon: '🟢',
    },
};

export function RAGBadge({ status, category, size = 'md' }: RAGBadgeProps) {
    // Graceful fallback for unknown statuses
    const config = RAG_CONFIG[status] || { label: 'Unknown', color: 'bg-gray-500 text-white', icon: '❓' };

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-4 py-1.5'
    };

    return (
        <Badge
            className={`${config.color} ${sizeClasses[size]} gap-1.5 font-medium`}
        >
            <span className="text-[10px]">{config.icon}</span> {config.label}
        </Badge>
    );
}
