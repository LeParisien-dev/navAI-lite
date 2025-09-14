import { FormEvent, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const { register } = useAuth();
    const nav = useNavigate();

    const [username, setUsername] = useState(""); // [MODIF] nouveau champ
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // [MODIF] on envoie username aussi
            await register(username, email, password);
            nav("/users");
        } catch (err: any) {
            setError(err?.message || "Inscription impossible");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 420, margin: "4rem auto" }}>
            <h1>Créer un compte</h1>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
