"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "@/utils/api";

const AuthContext = createContext(null);

// JWT token decode karo — expire hua ya nahi check karo
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // exp seconds mein hota hai, Date.now() milliseconds mein
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData && isTokenValid(token)) {
      // Token valid hai
      setUser(JSON.parse(userData));
    } else {
      // Token expire ho gaya — clean karo
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authAPI.login({ email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({
      name: data.name,
      email: data.email,
      role: data.role,
    }));
    setUser({ name: data.name, email: data.email, role: data.role });
    return data;
  };

  const register = async (name, email, password, phone) => {
    const data = await authAPI.register({ name, email, password, phone });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({
      name: data.name,
      email: data.email,
      role: data.role,
    }));
    setUser({ name: data.name, email: data.email, role: data.role });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);