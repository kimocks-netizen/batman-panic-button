// src/store/panicStore.ts
import { create } from 'zustand';
import { getPanicHistory } from '../api/panic';

interface PanicState {
  activePanics: any[];
  fetchActivePanics: () => Promise<void>;
}

const usePanicStore = create<PanicState>((set) => ({
  activePanics: [],
  fetchActivePanics: async () => {
    try {
      const response = await getPanicHistory(1); // Status 1 = In Progress
      set({ activePanics: response.data.panics || [] });
    } catch (error) {
      console.error('Failed to fetch active panics:', error);
    }
  }
}));

// Initialize and auto-refresh
const initialize = () => {
  const store = usePanicStore.getState();
  store.fetchActivePanics();
  const interval = setInterval(store.fetchActivePanics, 30000);
  return () => clearInterval(interval);
};

initialize();

export default usePanicStore;