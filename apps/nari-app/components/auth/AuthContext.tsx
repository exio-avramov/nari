import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export const AuthContext = createContext<{
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session?: Session | null;
}>({
  signInWithEmail: (email: string, password: string) => Promise.resolve(),
  signOut: () => Promise.resolve(),
  session: null,
});
