import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(
    persist(
      (set, get) => ({
        user: {
          username: "TestingMan"
        },
        setUser: (user) => set({ ...user }),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
