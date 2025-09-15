import { useStorageState } from "@/hooks/useStorageState";
import { PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = () => {
    // Perform sign-in logic here
    setSession("xxx");
  };

  const signOut = () => {
    // Perform sign-out logic here
    setSession(null);
  };

  return (
    <AuthContext
      value={{
        signIn: signIn,
        signOut: signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
