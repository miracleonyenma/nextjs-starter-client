// ./store/useUserStore.ts
import { User, UserData } from "@/types/gql/graphql";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  userIsLoading: boolean;
  setUserIsLoading: (userIsLoading: boolean) => void;
  usersData: UserData | null;
  setUsersData: (usersData: UserData | null) => void;
  usersDataIsLoading: boolean;
  setUsersDataIsLoading: (usersDataIsLoading: boolean) => void;
  // Add hydration tracking
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      userIsLoading: false,
      setUserIsLoading: (userIsLoading) => set({ userIsLoading }),
      usersData: null,
      setUsersData: (usersData) => set({ usersData }),
      usersDataIsLoading: false,
      setUsersDataIsLoading: (usersDataIsLoading) =>
        set({ usersDataIsLoading }),
      // Initialize hydration state as false
      isHydrated: false,
      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "userData", // This will be the key in localStorage
      storage: createJSONStorage(() => localStorage),
      // Add onRehydrateStorage to detect when hydration is complete
      onRehydrateStorage: () => (state) => {
        // When hydration is complete, update the state
        state?.setHydrated(true);
      },
    },
  ),
);
