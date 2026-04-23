'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AnimatedLoadingProps {
    title: string;
    messages: string[];
    duration?: number; // milliseconds
}

export function AnimatedLoading({ title, messages, duration = 4000 }: AnimatedLoadingProps) {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 2, 100));
        }, duration / 50);

        // Message rotation
        const messageInterval = setInterval(() => {
            setCurrentMessage(prev => (prev + 1) % messages.length);
        }, duration / messages.length);

        return () => {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
        };
    }, [duration, messages.length]);

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
                {messages[currentMessage]}
            </p>
            <div className="w-full max-w-md">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground mt-2">
                    {progress}% complete
                </p>
            </div>
        </div>
    );
}

// Pre-defined loading messages for different stages
export const LOADING_MESSAGES = {
    thesis_scoring: [
        '🎯 Fetching sector thesis data...',
        '📊 Analyzing company against market data...',
        '💡 Matching with sector opportunities...',
        '🏛️ Identifying applicable policies...',
        '✨ Generating evidence points...',
        '📈 Calculating alignment scores...',
        '✅ Finalizing thesis analysis...',
    ],
    rag_classification: [
        '🚦 Loading thesis scores and financials...',
        '⚖️ Evaluating market opportunity vs readiness...',
        '🎲 Assessing execution risk factors...',
        '🔍 Analyzing competitive positioning...',
        '🎯 Determining fit classification...',
        '✅ Generating recommendations...',
    ],
    gap_analysis: [
        '📊 Analyzing market saturation...',
        '👤 Assessing founder quality...',
        '🏢 Evaluating business maturity...',
        '💰 Sizing market opportunity (TAM/SAM/SOM)...',
        '👥 Analyzing leadership strength...',
        '💡 Evaluating innovation differentiators...',
        '🎯 Assessing talent pool quality...',
        '🏷️ Analyzing brand identity...',
        '✅ Compiling comprehensive report...',
    ],
    roadmap_generation: [
        '📋 Loading gap analysis insights...',
        '🎯 Defining strategic objectives...',
        '📅 Creating 6-month milestone timeline...',
        '💰 Calculating investment requirements...',
        '📈 Projecting expected benefits...',
        '💵 Computing ROI and payback period...',
        '🤝 Recommending engagement model...',
        '✅ Finalizing strategic roadmap...',
    ],
};
