import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { login as apiLogin, getUserByEmail, approvalMessage } from '../services/api';
import type { User } from '../types/user';

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: async () => { },
    isLoading: true,
});

const ROLES = ['user', 'cleaner'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email: string, password: string) => {
        const token = await apiLogin(email, password);
        await SecureStore.setItemAsync("token", token);

        try {
            const found = await getUserByEmail(email);
            if (!found) {
                throw new Error("Logged in, but your profile wasn't found.");
            }
            // Safety net in case the backend still issues a token to unapproved accounts.
            if (found.approval !== 'approved') {
                throw new Error(approvalMessage(found.approval));
            if (found.role === 'admin') {
                throw new Error('Admins should use the web app.');
            }
            await SecureStore.setItemAsync("user", JSON.stringify(found));
            setUser(found);
        } catch (error) {
            await SecureStore.deleteItemAsync("token");
            throw error;
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("user");
        setUser(null);
    };

    useEffect(() => {
        const loadSavedLogin = async () => {
            try {
                const savedToken = await SecureStore.getItemAsync("token");
                const savedUser = await SecureStore.getItemAsync("user");
                if (savedToken && savedUser) {
                    const parsed = JSON.parse(savedUser);
                    if (ROLES.includes(parsed.role)) {
                        setUser(parsed);
                    } else {
                        await SecureStore.deleteItemAsync("token");
                        await SecureStore.deleteItemAsync("user");
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadSavedLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
