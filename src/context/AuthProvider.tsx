import { useCallback, useMemo, type PropsWithChildren } from "react";
import { useLocalStorage } from "@/hooks";
import type { AuthUser } from "@/types";
import { STORAGE_KEYS } from "@/utils";
import { AuthContext, type AuthContextType } from "./AuthContext";

/**
 * Authentication Provider component.
 * Manages user authentication state, synchronizes with localStorage via useLocalStorage,
 * and provides login / logout methods throughout the application tree.
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useLocalStorage<AuthUser | null>(
    STORAGE_KEYS.USER,
    null,
  );

  const login = useCallback(
    (username: string) => {
      setUser({
        username: username.trim(),
        isLoggedIn: true,
      });
    },
    [setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoggedIn: Boolean(user && user.isLoggedIn),
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
