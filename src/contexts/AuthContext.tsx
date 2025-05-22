
import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Session timeout in milliseconds (15 minutes)
const SESSION_TIMEOUT = 15 * 60 * 1000; 

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  resetSessionTimer: () => void;
  isLoading: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "vendor" | "user";
  avatar?: string;
  preferences?: {
    notifications: boolean;
    twoFactorAuth: boolean;
  };
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes
const MOCK_USER: UserProfile = {
  id: "user-001",
  name: "Demo Vendor",
  email: "vendor@example.com",
  role: "vendor",
  preferences: {
    notifications: true,
    twoFactorAuth: false
  }
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check local storage on initial load
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Load user from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Define logout function as a useCallback to avoid recreation on every render
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    if (sessionTimer) clearTimeout(sessionTimer);
    navigate("/login");
  }, [navigate, sessionTimer]);

  // Define resetSessionTimer function as a useCallback to avoid recreation on every render
  const resetSessionTimer = useCallback(() => {
    if (sessionTimer) clearTimeout(sessionTimer);
    
    const newTimer = setTimeout(() => {
      toast({
        title: "Session Expired",
        description: "Your session has expired due to inactivity. Please sign in again.",
        variant: "destructive",
      });
      logout();
    }, SESSION_TIMEOUT);
    
    setSessionTimer(newTimer);
  }, [toast, logout]);

  // Simulate initial authentication check
  useEffect(() => {
    // Simulate a delay for authentication check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle session timeout - FIX: Adding proper dependencies
  useEffect(() => {
    if (isAuthenticated) {
      resetSessionTimer();
    }
    
    return () => {
      if (sessionTimer) clearTimeout(sessionTimer);
    };
  }, [isAuthenticated, resetSessionTimer]);

  // Add event listeners for user activity - FIX: Adding proper dependencies
  useEffect(() => {
    if (isAuthenticated) {
      const activityEvents = ["mousedown", "keydown", "touchstart", "scroll"];
      const handleUserActivity = resetSessionTimer;
      
      activityEvents.forEach(event => {
        window.addEventListener(event, handleUserActivity);
      });
      
      return () => {
        activityEvents.forEach(event => {
          window.removeEventListener(event, handleUserActivity);
        });
      };
    }
  }, [isAuthenticated, resetSessionTimer]);

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email === "vendor@example.com" && password === "password") {
        setIsAuthenticated(true);
        setUser(MOCK_USER);
        
        // Store authentication state if rememberMe is true
        if (rememberMe) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(MOCK_USER));
        }
        
        toast({
          title: "Sign in successful",
          description: "Welcome back to BaseCampMart Seller Central!",
        });
        
        resetSessionTimer();
        setIsLoading(false);
        return true;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Password reset link sent",
        description: `Instructions to reset your password have been sent to ${email}`,
      });
      setIsLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Failed to send reset link",
        description: "Please check your email address and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    resetPassword,
    resetSessionTimer,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
