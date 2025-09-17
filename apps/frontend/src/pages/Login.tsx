import { FormEvent, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();

    // [MODIF] username -> email pour coller à AuthContext.login(email, password)
    const [email, setEmail] = useState(""); // [MODIF]
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // [MODIF] validation simple côté client
            if (!email.trim() || !password.trim()) {
                throw new Error("Email et mot de passe requis");
            }
            // [MODIF] appel conforme à la signature
            await login(email.trim(), password);

            nav("/dashboard");
        } catch (err: unknown) { // [MODIF]
            const message =
                err instanceof Error ? err.message : "Erreur d’authentification";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 420, margin: "4rem auto" }}>
            <h1>Connexion</h1>
            <form onSubmit={onSubmit} aria-busy={loading}> {/* [MODIF] */}
                <input
                    placeholder="Email" // [MODIF]
                    type="email"        // [MODIF]
                    value={email}       // [MODIF]
                    onChange={(e) => setEmail(e.target.value)} // [MODIF]
                    autoComplete="email" // [MODIF]
                    style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
                />
                <input
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password" // [MODIF]
                    style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
                />
                <button type="submit" disabled={loading || !email || !password}> {/* [MODIF] */}
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
                {error && <p style={{ color: "crimson" }}>{error}</p>}
            </form>
            <p style={{ marginTop: 12 }}>
                Pas de compte ? <Link to="/register">Créer un compte</Link>
            </p>
        </div>
    );
}
