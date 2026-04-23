'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface Step {
    id: string;
    label: string;
    description?: string;
}

interface StepLoaderProps {
    steps: Step[];
    onComplete?: () => void;
    minDuration?: number; // Minimum time per step in ms
}

export function StepLoader({ steps, onComplete, minDuration = 600 }: StepLoaderProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (currentStepIndex >= steps.length) {
            onComplete?.();
            return;
        }

        const timer = setTimeout(() => {
            setCompletedSteps(prev => new Set(prev).add(steps[currentStepIndex].id));
            setCurrentStepIndex(prev => prev + 1);
        }, minDuration);

        return () => clearTimeout(timer);
    }, [currentStepIndex, steps, minDuration, onComplete]);

    return (
        <div className="w-full max-w-md mx-auto py-10">
            <h3 className="text-lg font-semibold mb-6 text-center">Analysing & Generating...</h3>
            <div className="space-y-4">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.has(step.id);
                    const isCurrent = index === currentStepIndex;
                    const isPending = !isCompleted && !isCurrent;

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "flex items-start gap-4 p-3 rounded-lg transition-all duration-300 border",
                                isCurrent ? "bg-primary/5 border-primary/20 scale-105 shadow-sm" : "border-transparent",
                                isCompleted ? "opacity-70" : "opacity-100"
                            )}
                        >
                            <div className="mt-1">
                                {isCompleted ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500 animate-in zoom-in duration-300" />
                                ) : isCurrent ? (
                                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                                ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground/30" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={cn(
                                    "font-medium transition-colors",
                                    isCurrent ? "text-primary" : "text-foreground",
                                    isCompleted && "text-muted-foreground"
                                )}>
                                    {step.label}
                                </p>
                                {step.description && isCurrent && (
                                    <p className="text-xs text-muted-foreground mt-1 animate-in fade-in slide-in-from-top-1">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Helper to convert simple string messages to Steps
export function messagesToSteps(messages: string[]): Step[] {
    return messages.map((msg, idx) => ({
        id: `step-${idx}`,
        label: msg
    }));
}
