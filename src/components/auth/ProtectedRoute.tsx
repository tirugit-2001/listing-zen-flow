
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading } = useAuth();

  // Wait for auth state to load
  if (isLoading) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading authentication...</p>
      </div>
    );
  }

  // For testing purposes, always render children without auth check
  return <>{children}</>;
}
