import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import type { User, LoginResponse } from "../types/user";
import api from "../services/api";
import IdleTimeoutModal from "../components/common/IdleTimeoutModal";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  stayLoggedIn: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// 15 minutos de inactividad por defecto, aviso a los 14 minutos (60s restantes)
const IDLE_LIMIT_MS = 15 * 60 * 1000;
const WARNING_BEFORE_MS = 60 * 1000;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showIdleWarning, setShowIdleWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const lastActivityRef = useRef<number>(Date.now());

  const updateActivity = useCallback(() => {
    const now = Date.now();
    if (now - lastActivityRef.current > 3000) {
      lastActivityRef.current = now;
      localStorage.setItem("last_activity_time", now.toString());
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const activeToken = token || localStorage.getItem("token");
      if (activeToken) {
        await api.post("/auth/logout").catch(() => {});
      }
    } catch {
      // Ignorar error de red al salir
    } finally {
      setToken(null);
      setUser(null);
      setShowIdleWarning(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("last_activity_time");

      try {
        const bc = new BroadcastChannel("smartauditoria_auth");
        bc.postMessage({ type: "LOGOUT" });
        bc.close();
      } catch {
        // BroadcastChannel fallback
      }
    }
  }, [token]);

  const stayLoggedIn = useCallback(async () => {
    setShowIdleWarning(false);
    const now = Date.now();
    lastActivityRef.current = now;
    localStorage.setItem("last_activity_time", now.toString());
    try {
      await api.post("/auth/refresh-session").catch(() => {});
    } catch {
      // Ignorar fallo no crítico
    }
  }, []);

  // Carga inicial y listeners de sincronización multi-pestaña
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
      localStorage.setItem("last_activity_time", Date.now().toString());
    }
    setIsLoading(false);

    // Escuchar eventos de logout entre pestañas
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        setToken(null);
        setUser(null);
        setShowIdleWarning(false);
      }
    };
    window.addEventListener("storage", handleStorage);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("smartauditoria_auth");
      bc.onmessage = (event) => {
        if (event.data?.type === "LOGOUT") {
          setToken(null);
          setUser(null);
          setShowIdleWarning(false);
        }
      };
    } catch {
      // Ignorar si el navegador no soporta BroadcastChannel
    }

    return () => {
      window.removeEventListener("storage", handleStorage);
      if (bc) bc.close();
    };
  }, []);

  // Monitor de eventos de usuario para registrar actividad
  useEffect(() => {
    if (!token) {
      return () => {};
    }

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const handleUserActivity = () => updateActivity();

    events.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));

    // Timer de inspección de inactividad cada 1 segundo
    const interval = setInterval(() => {
      const storedTime = localStorage.getItem("last_activity_time");
      const lastAct = storedTime ? parseInt(storedTime, 10) : lastActivityRef.current;
      const elapsed = Date.now() - lastAct;

      if (elapsed >= IDLE_LIMIT_MS) {
        logout();
      } else if (elapsed >= IDLE_LIMIT_MS - WARNING_BEFORE_MS) {
        setShowIdleWarning(true);
        const remaining = Math.max(1, Math.ceil((IDLE_LIMIT_MS - elapsed) / 1000));
        setSecondsRemaining(remaining);
      } else {
        setShowIdleWarning(false);
      }
    }, 1000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
      clearInterval(interval);
    };
  }, [token, updateActivity, logout]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      const { token: newToken, user: newUser } = response.data;

      setToken(newToken);
      setUser(newUser);
      lastActivityRef.current = Date.now();
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("last_activity_time", Date.now().toString());

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    stayLoggedIn,
    isLoading,
    isAuthenticated: !!token && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {!!token && (
        <IdleTimeoutModal
          open={showIdleWarning}
          secondsRemaining={secondsRemaining}
          onStayLoggedIn={stayLoggedIn}
          onLogoutNow={logout}
        />
      )}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
