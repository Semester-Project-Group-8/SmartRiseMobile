export type Roles = 'Admin' | 'User' | 'Cleaner';

export type User = {
    id: number;
    name: string;
    role: Roles;
}

const Users: (User & { username: string; password: string; })[] =
    [
        { id: 1, name: "User", role: "User", username: "User", password: "1234" },
        { id: 2, name: "Admin", role: "Admin", username: "Admin", password: "5678" },
        { id: 3, name: "Cleaner", role: "Cleaner", username: "Cleaner", password: "1111" },

    ]

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function Login(username: string, password: string) {
    await wait(1000);
    const found = Users.find((f) => f.username === username && f.password === password);

    if (!found) {
        throw new Error("Wrong username or password");
    }

    const user: User = { id: found.id, name: found.name, role: found.role };
    return {
        user, token: "token-" + found.id
    };
}   