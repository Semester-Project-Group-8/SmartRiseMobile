import * as SecureStore from 'expo-secure-store';
import { API_URL } from './config';

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

function parse(text: string) {
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = await SecureStore.getItemAsync('token');

    let response: Response;
    try {
        response = await fetch(API_URL + path, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
    } catch (error) {
        console.warn(`[api] ${options.method ?? 'GET'} ${API_URL + path} -> network error`, error);
        throw new ApiError(0, `Can't reach the server at ${API_URL}. Check your Wi-Fi and that the backend is running.`);
    }

    const text = await response.text();
    const data = text ? parse(text) : undefined;

    if (!response.ok) {
        
        const message = data && typeof data === 'object' && 'message' in data
            ? String(data.message)
            : `Request failed: ${response.status}`;
        console.warn(`[api] ${options.method ?? 'GET'} ${path} -> ${response.status}`, data);
        throw new ApiError(response.status, message);
    }

    return data as T;
}
