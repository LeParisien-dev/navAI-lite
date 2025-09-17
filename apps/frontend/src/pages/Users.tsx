import { useEffect, useState } from "react";
import { api } from "../lib/http";

interface User {
    id: number;
    email: string;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function loadUsers() {
        try {
            const data = await api<User[]>("/users");
            setUsers(data ?? []);
            setError(null);
        } catch (err: any) {
            console.error("Erreur API users:", err);
            setError("Impossible de charger les utilisateurs");
            setUsers([]);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api(`/users/${editingId}`, {
                    method: "PUT",
                    body: JSON.stringify({ email, password }),
                });
                setEditingId(null);
            } else {
                await api("/users", {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                });
            }
            setEmail("");
            setPassword("");
            loadUsers();
        } catch (err: any) {
            console.error("Erreur API submit user:", err);
            setError("Échec sauvegarde utilisateur");
        }
    };

    const handleEdit = (user: User) => {
        setEditingId(user.id);
        setEmail(user.email);
        setPassword(""); // pas de pré-remplissage du password
    };

    const handleDelete = async (id: number) => {
        try {
            await api(`/users/${id}`, { method: "DELETE" });
            loadUsers();
        } catch (err: any) {
            console.error("Erreur API delete user:", err);
            setError("Échec suppression utilisateur");
        }
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Users</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">
                    {editingId ? "Update User" : "Add User"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setEmail("");
                            setPassword("");
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {error && <p style={{ color: "crimson" }}>{error}</p>}

            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.email}
                        <button
                            onClick={() => handleEdit(u)}
                            style={{ marginLeft: "0.5rem" }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(u.id)}
                            style={{ marginLeft: "0.5rem" }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
