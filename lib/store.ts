import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, RegistrationData, Project } from '@/types';
import { mockUsers } from '@/lib/mock-data';

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

// Initialize with dev user in development mode
const getInitialUser = (): User | null => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    return mockUsers[0];
  }
  return null;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: getInitialUser(),
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
      onRehydrateStorage: () => (state) => {
        // After rehydration, if no user and in dev mode, set dev user
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !state?.user) {
          state?.setUser(mockUsers[0]);
        }
      },
    }
  )
);
