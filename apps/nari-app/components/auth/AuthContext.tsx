import {
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
} from "@supabase/supabase-js";
import { createContext } from "react";

export const AuthContext = createContext<{
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<AuthTokenResponsePassword>;
  signOut: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  session?: Session | null;
}>({
  signInWithEmail: (email: string, password: string) =>
    Promise.resolve({} as AuthTokenResponsePassword),
  signUpWithEmail: (email: string, password: string) =>
    Promise.resolve({} as AuthResponse),
  signOut: () => Promise.resolve(),
  session: null,
});
