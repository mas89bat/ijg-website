"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  plan: "professional" | "basic" | "trial";
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AUTH_STORAGE_KEY = "ijg_auth_user";

const DEMO_USER: User = {
  name: "Andri Sobczak",
  email: "demo@ijg.net",
  plan: "professional",
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      // ignore corrupted storage
    }
    setIsLoading(false);
  }, []);

  function login(email: string, password: string): boolean {
    if (email === "demo@ijg.net" && password === "demo") {
      setUser(DEMO_USER);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_USER));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
