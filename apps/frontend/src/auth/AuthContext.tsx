import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/http";

type AuthContextValue = {
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>; // [MODIF]
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const navigate = useNavigate();

    // Déconnexion globale si 401
    useEffect(() => {
        const onUnauthorized = () => logout();
        window.addEventListener("auth:unauthorized", onUnauthorized);
        return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const resp = await api("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const access = resp?.access_token as string;
        if (!access) throw new Error("Token manquant dans la réponse.");
        localStorage.setItem("token", access);
        setToken(access);
    }, []);

    const register = useCallback(
        async (username: string, email: string, password: string) => {
            await api("/auth/register", {
                method: "POST",
                body: JSON.stringify({ username, email, password }),
            });
            await login(email, password);
        },
        [login]
    );

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    }, [navigate]);

    const value = useMemo(
        () => ({
            token,
            isAuthenticated: !!token,
            login,
            register,
            logout,
        }),
        [token, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
