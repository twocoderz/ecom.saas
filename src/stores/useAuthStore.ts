import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Auth mock : session locale, role client/admin pour le back-office.
 */
export type MockUser = {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
};

type AuthState = {
  user: MockUser | null;
  signIn: (email: string) => void;
  signOut: () => void;
  isAdmin: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      signIn: (email) =>
        set({
          user: {
            id: "user-mock-1",
            email,
            name: email.split("@")[0] ?? "Client",
            // Convention mock : *@admin.* => admin pour tester /admin
            role: email.toLowerCase().includes("admin") ? "admin" : "customer",
          },
        }),
      signOut: () => set({ user: null }),
      isAdmin: () => get().user?.role === "admin",
    }),
    { name: "ecom-auth" },
  ),
);
