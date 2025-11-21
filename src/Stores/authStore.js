import { create } from "zustand";
import supabase from "../../SupabaseClient";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
export const useAuthStore = create(
  persist(
    immer((set) => ({
      user: null,
      session: null,
      login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });
        if (error) throw error;

        set({
          user: data.user,
          session: data.session,
        });
        return data;
      },
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
