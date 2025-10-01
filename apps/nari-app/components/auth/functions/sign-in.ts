import { supabase } from "@/dataprovider/supabase";
import { AuthTokenResponsePassword } from "@supabase/supabase-js";

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthTokenResponsePassword> => {
  var response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
};
