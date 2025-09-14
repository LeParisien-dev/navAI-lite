import { useEffect, useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "../api";

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (editingId) {
            await updateUser(editingId, email, password);
            setEditingId(null);
        } else {
            await createUser(email, password);
        }
        setEmail("");
        setPassword("");
        setUsers(await fetchUsers());
    };

    const handleEdit = (user: any) => {
        setEditingId(user.id);
        setEmail(user.email);
        setPassword(""); // on ne pré-remplit pas le password
    };

    const handleDelete = async (id: number) => {
        await deleteUser(id);
        setUsers(await fetchUsers());
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
                    <button type="button" onClick={() => { setEditingId(null); setEmail(""); setPassword(""); }}>
                        Cancel
                    </button>
                )}
            </form>

            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.email}
                        <button onClick={() => handleEdit(u)} style={{ marginLeft: "0.5rem" }}>Edit</button>
                        <button onClick={() => handleDelete(u.id)} style={{ marginLeft: "0.5rem" }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
