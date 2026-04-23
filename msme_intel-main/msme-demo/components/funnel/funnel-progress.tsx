'use client';

import { CheckCircle2, Circle, XCircle } from 'lucide-react';

interface FunnelProgressProps {
    currentStage: number;
    stageStatuses: {
        stage_1_status: string;
        stage_2_status: string;
        stage_3_status: string;
        stage_4_status: string;
        stage_5_status: string;
        stage_6_status: string;
    };
    passedFilters: {
        passed_stage_2_filter?: boolean;
        passed_stage_4_filter?: boolean;
    };
}

const STAGES = [
    { num: 1, name: 'Upload', icon: '📤' },
    { num: 2, name: 'Thesis Score', icon: '🎯', hasFilter: true },
    { num: 3, name: 'Financials', icon: '💰' },
    { num: 4, name: 'RAG Class', icon: '🚦', hasFilter: true },
    { num: 5, name: 'Gap Analysis', icon: '🔍' },
    { num: 6, name: 'Roadmap', icon: '🗺️' },
];

export function FunnelProgress({ currentStage, stageStatuses, passedFilters }: FunnelProgressProps) {
    return (
        <div className="flex items-center justify-between max-w-4xl mx-auto py-6 overflow-x-auto">
            {STAGES.map((stage, idx) => {
                const status = stageStatuses[`stage_${stage.num}_status` as keyof typeof stageStatuses];
                const isComplete = status === 'complete';
                const isCurrent = stage.num === currentStage;
                const isPending = stage.num > currentStage;

                // Check if filtered out
                const filterKey = `passed_stage_${stage.num}_filter` as keyof typeof passedFilters;
                const failedFilter = stage.hasFilter && passedFilters[filterKey] === false;

                return (
                    <div key={stage.num} className="flex items-center min-w-[100px]">
                        {/* Stage Circle */}
                        <div className="flex flex-col items-center relative z-10 bg-background px-2">
                            <div
                                className={`
                  relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300
                  ${isComplete ? 'bg-green-500 border-green-500' : ''}
                  ${failedFilter ? 'bg-red-500 border-red-500' : ''}
                  ${isCurrent ? 'bg-blue-500 border-blue-500 animate-pulse text-white' : ''}
                  ${isPending ? 'bg-muted border-muted-foreground/30' : ''}
                `}
                            >
                                {isComplete && <CheckCircle2 className="h-6 w-6 text-white" />}
                                {failedFilter && <XCircle className="h-6 w-6 text-white" />}
                                {isCurrent && <Circle className="h-6 w-6 fill-current" />}
                                {isPending && <span className="text-muted-foreground font-medium">{stage.num}</span>}
                            </div>

                            <div className="mt-2 text-center w-24">
                                <div className="text-xs font-medium truncate sm:text-sm">{stage.icon} {stage.name}</div>
                                {stage.hasFilter && (
                                    <div className="text-[10px] text-muted-foreground mt-0.5">
                                        {failedFilter ? '❌ Filtered' : (isComplete ? '✅ Passed' : '')}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Connector Line */}
                        {idx < STAGES.length - 1 && (
                            <div
                                className={`
                  h-0.5 flex-1 mx-[-10px] relative z-0
                  ${stage.num < currentStage ? 'bg-green-500' : 'bg-muted-foreground/20'}
                `}
                                style={{ width: '40px' }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
