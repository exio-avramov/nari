import { supabase } from "@/dataprovider/supabase";
import { AuthResponse } from "@supabase/supabase-js";
import { makeRedirectUri } from "expo-auth-session";

export const signUpWithEmail = async (
  email: string,
  password: string,
  phone: string
): Promise<AuthResponse> => {
  const redirectTo = makeRedirectUri();
  console.log("Redirect URI:", redirectTo);

  const response = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: { emailRedirectTo: redirectTo },
  });
  return response;
};
