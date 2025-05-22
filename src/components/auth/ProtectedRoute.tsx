
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Wait for auth state to load
  if (isLoading) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading authentication...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return <>{children}</>;
}
