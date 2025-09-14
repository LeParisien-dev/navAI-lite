import { FormEvent, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(username, password);

            nav("/dashboard");
        } catch (err: any) {
            setError(err?.message || "Erreur d’authentification");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 420, margin: "4rem auto" }}>
            <h1>Connexion</h1>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
                />
                <input
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
                />
                <button type="submit" disabled={loading}>
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
