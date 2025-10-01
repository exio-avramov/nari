import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AppState } from "react-native";
import { supabase } from "@/dataprovider/supabase";
import { getQueryParams } from "expo-auth-session/build/QueryParams";
import { Session } from "@supabase/supabase-js";
import { getLinkingURL } from "expo-linking";
import { signInWithEmail } from "./functions/sign-in";
import { signUpWithEmail } from "./functions/sign-up";
import { signOut } from "./functions/sign-out";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  console.log({ session });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = getQueryParams(url);
    if (errorCode) throw new Error(errorCode);

    const { accessToken, refreshToken } = params;
    if (!accessToken) return;

    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) throw error;

    return data.session;
  };

  const url = getLinkingURL();
  console.log({ url });
  if (url) {
    createSessionFromUrl(url).catch((error) => {
      console.error("Error creating session from URL:", error);
    });
  }

  return (
    <AuthContext
      value={{
        signInWithEmail: signInWithEmail,
        signUpWithEmail: signUpWithEmail,
        signOut: signOut,
        session,
      }}
    >
      {children}
    </AuthContext>
  );
}
