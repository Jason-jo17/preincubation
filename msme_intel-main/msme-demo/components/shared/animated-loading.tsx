
'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { loadingMessages } from '@/lib/utils/simulate-loading';

interface AnimatedLoadingProps {
    type: 'analysis' | 'roadmap' | 'search';
}

export function AnimatedLoading({ type }: AnimatedLoadingProps) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const messages = Array.from(loadingMessages(type));
        const interval = 3000 / messages.length; // Distribute over 3 seconds

        let index = 0;
        const timer = setInterval(() => {
            if (index < messages.length) {
                setCurrentMessage(messages[index]);
                setProgress(((index + 1) / messages.length) * 100);
                index++;
            } else {
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [type]);

    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium mb-2">{currentMessage}</p>
                <div className="w-full max-w-md bg-secondary rounded-full h-2 mt-4">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
