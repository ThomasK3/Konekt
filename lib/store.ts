import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, RegistrationData } from '@/types';

interface UserStore {
  user: User | null;
  registrationData: RegistrationData;
  currentEvent: string;
  setUser: (user: User) => void;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  setCurrentEvent: (event: string) => void;
  clearUser: () => void;
}

const initialRegistrationData: RegistrationData = {
  step: 1,
  name: '',
  email: '',
  school: '',
  skills: [],
  bio: '',
  videoUrl: undefined,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      registrationData: initialRegistrationData,
      currentEvent: 'BeNextOne 2024',
      setUser: (user) => set({ user }),
      updateRegistrationData: (data) =>
        set((state) => ({
          registrationData: { ...state.registrationData, ...data },
        })),
      setCurrentEvent: (event) => set({ currentEvent: event }),
      clearUser: () => set({ user: null, registrationData: initialRegistrationData }),
    }),
    {
      name: 'konekt-user-storage',
    }
  )
);
