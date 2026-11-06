import { createContext } from "react";
import type { AuthUser } from "@/types";

export interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
