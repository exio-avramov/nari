import { supabase } from "@/dataprovider/supabase";

export const signOut = async () => {
  await supabase.auth.signOut();
};
