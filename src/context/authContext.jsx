import React, { createContext, useContext, useState, useEffect } from "react";
import { verificarToken } from "../components/api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await verificarToken();
        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error verificando token:", err);
        setUser(null);
        setError("Error al verificar la sesión");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
