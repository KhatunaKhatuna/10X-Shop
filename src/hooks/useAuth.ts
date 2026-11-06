import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/context";

/**
 * Custom hook to safely consume the AuthContext.
 * Throws an explicit error if used outside of an AuthProvider.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default useAuth;
