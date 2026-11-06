import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";

/**
 * Route guard component that protects private routes.
 * If the user is unauthenticated, redirects to /login while preserving
 * the current location in state so the user can be returned after login.
 */
export function ProtectedRoute({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
