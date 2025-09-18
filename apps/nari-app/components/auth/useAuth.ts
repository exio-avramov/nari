import { AuthContext } from "@/components/auth/AuthContext";
import { use } from "react";

// Use this hook to access the user info.
export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped in a <AuthProvider />");
  }
  return value;
}
