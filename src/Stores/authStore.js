import { create } from "zustand";
import supabase from "../../SupabaseClient";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
export const useAuthStore = create(
  persist(
    immer((set) => ({
      user: null,
      session: null,
      initialize : async()=>{
        try{
          const {data : {session} , error} = await supabase.auth.getSession();

          if(error) throw error;

          set((state)=>{
            state.user = session?.user;
            state.session = session;
          });

          supabase.auth.onAuthStateChange(session=>{
            set((state)=>{
              state.user = session?.user;
              state.session = session;
            })
          })
        }catch(error){
          set((state)=>{
            state.user = null;
            state.session = null;
          })
        }
      },
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
      logout: async () => {
        const { data, error } = await supabase.auth.signOut();
        if (error) throw error;

        set({
          user: null,
          session: null,
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
