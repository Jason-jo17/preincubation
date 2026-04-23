import { create } from 'zustand';

interface EcosystemState {
    activeEcosystem: 'national' | 'maharashtra';
    setActiveEcosystem: (eco: 'national' | 'maharashtra') => void;
}

export const useEcosystemStore = create<EcosystemState>((set) => ({
    activeEcosystem: 'maharashtra',
    setActiveEcosystem: (eco) => set({ activeEcosystem: eco }),
}));
