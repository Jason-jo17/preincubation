
export async function simulateLoading(durationMs: number = 3000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, durationMs));
}

export function* loadingMessages(type: 'analysis' | 'roadmap' | 'search') {
    const messages = {
        analysis: [
            'Fetching company data...',
            'Analyzing 6 operational verticals...',
            'Scoring 9 strategic dimensions...',
            'Identifying gaps and opportunities...',
            'Generating recommendations...',
            'Finalizing analysis...',
        ],
        roadmap: [
            'Loading gap analysis results...',
            'Selecting optimal framework...',
            'Defining strategic objectives...',
            'Creating milestone timeline...',
            'Estimating resource requirements...',
            'Finalizing roadmap...',
        ],
        search: [
            'Searching knowledge base...',
            'Processing query...',
            'Retrieving relevant insights...',
        ],
    };

    const messageList = messages[type];
    for (const message of messageList) {
        yield message;
    }
}
