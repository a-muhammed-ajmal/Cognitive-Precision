import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Session {
  time: number;
  date: string;
}

interface SchulteState {
  isActive: boolean;
  grid: number[];
  nextNumber: number;
  timer: number;
  startTime: number | null;
  sessions: Session[];
  
  startGame: () => void;
  tapCell: (num: number) => void;
  endGame: (time: number) => void;
  resetGame: () => void;
}

export const useSchulteStore = create<SchulteState>()(
  persist(
    (set, get) => ({
      isActive: false,
      grid: [],
      nextNumber: 1,
      timer: 0,
      startTime: null,
      sessions: [],

      startGame: () => {
        const nums = Array.from({ length: 25 }, (_, i) => i + 1);
        for (let i = nums.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        set({
          isActive: true,
          grid: nums,
          nextNumber: 1,
          timer: 0,
          startTime: Date.now(),
        });
      },

      tapCell: (num) => {
        const { nextNumber, startTime, isActive } = get();
        if (!isActive) return;

        // Timer starts on first tap
        if (startTime === null) {
            set({ startTime: Date.now() });
        }

        if (num === nextNumber) {
          if (num === 25) {
            const timeTaken = (Date.now() - (startTime || Date.now())) / 1000;
            get().endGame(timeTaken);
          } else {
            set({ nextNumber: nextNumber + 1 });
          }
        }
      },

      endGame: (time) => {
        set((state) => ({
          isActive: false,
          sessions: [...state.sessions, { time, date: new Date().toISOString() }].slice(-20),
        }));
      },

      resetGame: () => set({ isActive: false, timer: 0 }),
    }),
    {
      name: 'schulte-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
