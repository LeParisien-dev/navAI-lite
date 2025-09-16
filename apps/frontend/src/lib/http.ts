// apps/frontend/src/lib/http.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getToken(): string | null {
    return localStorage.getItem("token");
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T | null> {
    const token = getToken();

    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    // Gestion centralisée des erreurs
    if (res.status === 401) {
        // Token invalide/expiré -> on notifie l’app
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
    }

    // Si pas de body (204), on retourne null
    if (res.status === 204) return null;

    return res.json() as Promise<T>;
}
