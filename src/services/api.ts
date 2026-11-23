import { request, ApiError } from './request';
import type { Status, User } from '../types/user';
import type { Desk } from '../types/desk';
import type { ApiCreateEmployeeRequest, ApiDesk, ApiEmployee, ApiLoginResponse, ApiMessage, ApiBeaconAssignment } from '../types/api';



function toUser(employee: ApiEmployee): User {
    const [firstName, ...rest] = employee.name.trim().split(' ');

    return {
        id: employee.id,
        name: firstName ?? '',
        surname: rest.join(' '),
        email: employee.email,
        dateOfBirth: employee.dateOfBirth,
        height: employee.height ?? 0,
        sitPreset: employee.desk ? employee.desk.preferredHeight : null,
        standPreset: null,
        role: employee.role === 'cleaner' ? 'cleaner' : employee.role === 'admin' ? 'admin' : 'user',
        approval: toApproval(employee.accountStatus),
        assignedDeskID: employee.desk ? employee.desk.id : null,
    };
}

function toApproval(accountStatus: string): Status {
    const status = accountStatus?.toLowerCase();
    if (status === 'active') return 'approved';
    if (status === 'rejected') return 'rejected';
    return 'pending';
}

export function approvalMessage(approval: Status): string {
    return approval === 'rejected'
        ? 'Your registration was rejected. Please contact your admin.'
        : 'Your account is waiting for admin approval. You can log in once it is approved.';
}

function toDesk(desk: ApiDesk): Desk {
    return {
        id: desk.id,
        deskNum: desk.minor,
        currentHeight: desk.preferredHeight,
        isConnected: false,
        assignedUserID: desk.employeeId ?? null,
        picoID: '',
    };
}

function checkHeight(height: number) {
    if (height < 30 || height > 150) {
        throw new Error('Height must be between 30 and 150 cm.');
    }
}


export async function login(email: string, password: string): Promise<string> {
    try {
        const result = await request<ApiLoginResponse>('/api/login', {
            method: 'POST',
            body: JSON.stringify({ userMail: email.trim(), password }),
        });
        return result.token;
    } catch (error) {
        if (error instanceof ApiError && (error.status === 400 || error.status === 401)) {
            throw new Error('Wrong email or password');
        }
        if (error instanceof ApiError && error.status === 403) {
            throw new Error(error.message.startsWith('Request failed')
                ? approvalMessage('pending')
                : error.message);
        }
        throw error;
    }
}


export async function createUser(data: ApiCreateEmployeeRequest): Promise<void> {
    await request<ApiEmployee>('/users/employee', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getUsers(): Promise<User[]> {
    const employees = await request<ApiEmployee[]>('/users');
    return employees.map(toUser);
}

export async function getUserById(id: string): Promise<User> {
    const employee = await request<ApiEmployee>(`/users/${id}`);
    return toUser(employee);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const employees = await request<ApiEmployee[]>('/users');
    const found = employees.find((e) => e.email.toLowerCase() === email.trim().toLowerCase());
    return found ? toUser(found) : undefined;
}

export async function updatePresets(userId: string, presetValue: 'sit' | 'stand', preset: number): Promise<void> {
    checkHeight(preset);
    await request<ApiMessage>(`/users/${userId}/presets`, {
        method: 'PATCH',
        body: JSON.stringify({ presetValue: presetValue === 'sit', presetHeight: preset }),
    });
}



export async function getDeskById(id: string): Promise<Desk> {
    const desk = await request<ApiDesk>(`/api/desks/${id}`);
    return toDesk(desk);
}


export async function setDeskHeight(height: number, id: string): Promise<void> {
    checkHeight(height);
    await request<ApiMessage>(`/api/desks/${id}/height`, {
        method: 'PATCH',
        body: JSON.stringify({ position_mm: Math.round(height * 10) }),
    });
}

export async function setAllDeskHeights(height: number): Promise<void> {
    checkHeight(height);
    await request<ApiMessage>('/api/desks/height', {
        method: 'POST',
        body: JSON.stringify({ position_mm: Math.round(height * 10) }),
    });
}

export async function assignDesk(userId: string, deskId: string): Promise<void> {
    await request<ApiMessage>(`/api/desks/${deskId}/assignment`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
    });
}

export async function unassignDesk(deskId: string, userId: string): Promise<void> {
    await request<ApiMessage>(`/api/desks/${deskId}/assignment`, {
        method: 'DELETE',
        body: JSON.stringify({ userId }),
    });
}

export async function detectDesk(beaconName: string, userId: string): Promise<ApiMessage> {
    return request<ApiMessage>('/api/desks/Detect', {
        method: 'POST',
        body: JSON.stringify({ beaconName, userId }),
    });
}

export async function getUserDeskBeacon(userId: string): Promise<ApiBeaconAssignment | null> {
  return request<ApiBeaconAssignment | null>(
    `/users/${encodeURIComponent(userId)}/desk`,
  );
}
