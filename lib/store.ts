import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, RegistrationData, Project } from '@/types';

interface UserStore {
  user: User | null;
  registrationData: RegistrationData;
  currentEvent: string;
  projects: Project[];
  setUser: (user: User) => void;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  setCurrentEvent: (event: string) => void;
  addProject: (project: Project) => void;
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
  lookingFor: [],
  availability: {
    hoursPerWeek: 10,
    isPaid: false,
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      registrationData: initialRegistrationData,
      currentEvent: 'BeNextOne 2024',
      projects: [],
      setUser: (user) => set({ user }),
      updateRegistrationData: (data) =>
        set((state) => ({
          registrationData: { ...state.registrationData, ...data },
        })),
      setCurrentEvent: (event) => set({ currentEvent: event }),
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      clearUser: () => set({ user: null, registrationData: initialRegistrationData, projects: [] }),
    }),
    {
      name: 'konekt-user-storage',
    }
  )
);
