"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
  role: "user" | "admin" | "creator";
  status?: string;
  createdAt: string;
  magazines: string[];
  articles: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Default loading true rakhein

  useEffect(() => {
    const initAuth = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);

          // ✅ Role Normalization Fix: Creator aur Admin ko preserve karein
          const role = parsedUser.role?.toLowerCase();
          if (role === "admin" || role === "creator") {
            parsedUser.role = role;
          } else {
            parsedUser.role = "user";
          }

          setUser(parsedUser);
        } catch (error) {
          console.error("Auth hydration failed:", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://theglobalmagazine-backend-laka.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();

      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      const newUser: UserProfile = {
        id: data._id || data.id,
        email: data.emailId || data.email || email,
        name: data.name || email.split("@")[0],
        avatar:
          data.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name || email}`,
        bio: data.bio || "Welcome to The Global Media",
        role: (data.role?.toLowerCase() === "admin"
          ? "admin"
          : data.role?.toLowerCase() === "creator"
            ? "creator"
            : "user") as "user" | "admin" | "creator",
        status: data.status,
        createdAt: data.createdAt,
        magazines: data.magazines || [],
        articles: data.articles || [],
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://theglobalmagazine-backend-laka.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed.");
      }

      const data = await response.json();
      const newUser: UserProfile = {
        id: data._id || data.id,
        email: data.emailId || data.email || email,
        name: data.name || name,
        avatar:
          data.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        bio: data.bio || "Welcome to The Global Media",
        role: (data.role?.toLowerCase() === "admin" ? "admin" : "user") as
          | "user"
          | "admin",
        status: data.status,
        createdAt: data.createdAt,
        magazines: data.magazines || [],
        articles: data.articles || [],
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const uploadAvatar = async (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        updateProfile,
        uploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
