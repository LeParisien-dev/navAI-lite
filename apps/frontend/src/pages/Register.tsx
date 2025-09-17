import { FormEvent, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const { register } = useAuth();
    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // [MODIF] validation simple côté client
            if (!username.trim() || !email.trim() || !password.trim()) {
                throw new Error("Tous les champs sont requis");
            }
            await register(username.trim(), email.trim(), password); // [MODIF]
            nav("/users");
        } catch (err: unknown) { // [MODIF]
            const message =
                err instanceof Error ? err.message : "Inscription impossible";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 420, margin: "4rem auto" }}>
            <h1>Créer un compte</h1>
            <form onSubmit={onSubmit} aria-busy={loading}> {/* [MODIF] */}
                <input
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username" // [MODIF]
                    style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
                />
                <input
                    placeholder="Email"
                    type="email" // [MODIF]
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email" // [MODIF]
                    style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
                />
                <input
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password" // [MODIF]
                    style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
                />
                <button
                    type="submit"
                    disabled={loading || !username || !email || !password} // [MODIF]
                >
                    {loading ? "Création..." : "Créer"}
                </button>
                {error && <p style={{ color: "crimson" }}>{error}</p>}
            </form>
            <p style={{ marginTop: 12 }}>
                Déjà inscrit ? <Link to="/login">Se connecter</Link>
            </p>
        </div>
    );
}
