import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

type PresetsContextType = {
    sit: number;
    stand: number;
    savePresets: (sit: number, stand: number) => Promise<void>;
};
const PresetsContext = createContext<PresetsContextType>({
    sit: 70,
    stand: 100,
    savePresets: async () => { },
});

export function PresetsProvider({ children }: { children: React.ReactNode }) {
    const [sit, setSit] = useState(70);
    const [stand, setStand] = useState(100);
    const savePresets = async (newSit: number, newStand: number) => {
        await SecureStore.setItemAsync("presets", JSON.stringify({ sit: newSit, stand: newStand }));
        setSit(newSit);
        setStand(newStand);
    }
    useEffect(() => {
        const loadPresets = async () => {
            const saved = await SecureStore.getItemAsync("presets");
            if (saved) {
                const parsed = JSON.parse(saved);
                setSit(parsed.sit);
                setStand(parsed.stand);
            }
        };
        loadPresets();
    }, []);
    return (
        <PresetsContext.Provider value={{ sit, stand, savePresets }}>
            {children}
        </PresetsContext.Provider>
    );
}
export function usePresets() {
    return useContext(PresetsContext);
}
