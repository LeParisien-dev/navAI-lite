import { api } from "./lib/http";

export async function fetchUsers() {
    return api("/users");
}

export async function createUser(email: string, password: string) {
    return api("/users", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function updateUser(id: number, email?: string, password?: string) {
    return api(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ email, password }),
    });
}

export async function deleteUser(id: number) {
    return api(`/users/${id}`, {
        method: "DELETE",
    });
}
