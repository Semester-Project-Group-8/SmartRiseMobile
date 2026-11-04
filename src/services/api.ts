import { mockUsers, mockDesks, mockPicos } from "./mockData";
import type { User } from "../types/user";

export const getUsers = () => {
    return mockUsers;
};

export const getDesks = () => {
    return mockDesks;
};

export const getUserById = (id: string) => {
    return mockUsers.find(user => user.id === id);
};

export const getDeskById = (id: string) => {
    return mockDesks.find(desk => desk.id === id);
};

export const setDeskHeight = (height: number, id: string) => {
    const desk = mockDesks.find(desk => desk.id === id);
    if (!desk) {
    throw new Error(`Desk not found: ${id}`);
    }

    if (height < 30 || height > 150) {
        throw new Error(`Desk height must be between 30 and 150 cm.`);
    }

  desk.currentHeight = height;
};

export const setAllDeskHeights = (height: number) => {
    for (const desk of mockDesks) {
        setDeskHeight(height, desk.id);
    }
};

export const updatePresets = (userId: string, presetValue: "sit" | "stand", preset: number) => {
    const user = mockUsers.find(user => user.id === userId);
    
    if (!user) {
        throw new Error(`User not found: ${userId}`);
    }

    if (preset < 30 || preset > 150) {
        throw new Error("Preset height must be between 30 and 150 cm.");
    }

    if (presetValue === "sit") {
        user.sitPreset = preset;
    } else {
        user.standPreset = preset;
    }
};

export const approveUser = (id: string) => {

    const user = mockUsers.find(user => user.id === id);

    if (!user) {
        throw new Error(`User not found: ${id}`);
    }
    
    user.approval = "approved";
}; 

export const rejectUser = (id: string) => {
    
    const user = mockUsers.find(user => user.id === id);

    if (!user) {
        throw new Error(`User not found: ${id}`);
    }

    user.approval = "rejected";
}; 

export const getPendingUsers = () => {

    const users: User[] = getUsers();

    return users.filter(user => user.approval === "pending");
};

export const assignDesk = (userId: string, deskId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    const desk = mockDesks.find(desk => desk.id === deskId);

    if (!user) {
        throw new Error(`User not found: ${userId}`);
    }

    if (!desk) {
        throw new Error(`Desk not found: ${deskId}`);
    }

    if (desk.assignedUserID !== null) {
        throw new Error("Desk is already assigned.");
    }

    if (user.assignedDeskID !== null) {
        throw new Error("User already has a desk.");
    }

    user.assignedDeskID = deskId;
    desk.assignedUserID = userId;
    
};

export const unassignDesk = (deskId: string, userId: string) => {
    const desk = mockDesks.find(desk => desk.id === deskId);
    const user = mockUsers.find(user => user.id === userId);

    if (!user) {
        throw new Error(`User not found: ${userId}`);
    }

    if (!desk) {
        throw new Error(`Desk not found: ${deskId}`);
    }

    if (desk.assignedUserID !== userId) {
        throw new Error("This desk is not assigned to this user.");
    }

    if (user.assignedDeskID !== deskId) {
        throw new Error("This user is not assigned to this desk.");
    }


    desk.assignedUserID = null;
    user.assignedDeskID = null;
    
};

export const getPicos = () => {
    return mockPicos;
};

export const getPicoById = (id: string) => {
    return mockPicos.find((pico) => pico.id === id);
};

