import { createContext, useContext, useState, useEffect } from "react";
import { User } from '../services/LoginAuth';
import { Login } from '../services/LoginAuth';
import * as SecureStore from 'expo-secure-store';
type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: async () => { }
});


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const login = async (username: string, password: string) => {
        const result = await Login(username, password);
        await SecureStore.setItemAsync("token", result.token);
        await SecureStore.setItemAsync("user", JSON.stringify(result.user));
        setUser(result.user);
    }
    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("user");
        setUser(null);
    }
    useEffect(() => {
        const loadSavedLogin = async () => {
            const savedToken = await SecureStore.getItemAsync("token");
            const savedUser = await SecureStore.getItemAsync("user");
            if (savedToken && savedUser) {
                setUser(JSON.parse(savedUser));
                console.log('Loaded saved user:', savedUser);
            }
        };
        loadSavedLogin();
    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>

    );
}
export function useAuth() {
    return (useContext(AuthContext));
}

