import { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userStyles } from '../styles/UserScreenStyle';
import { getDeskById } from "../services/api";
import type { Desk } from "../types/desk";

import { useAuth } from '../context/AuthContext';
import { usePresets } from '../context/PresetsContext';

function Header({ name }: { name: string }) {
    const navigation = useNavigation<any>();
    return (
        <View style={userStyles.header}>
            <Text style={userStyles.title}>Welcome Back {'\n'} {name}</Text>
            <Pressable
                style={userStyles.profileIcon}
                onPress={() => navigation.navigate('UserProfile')}
                accessibilityLabel="Profile">
                <Text style={userStyles.profileLetter}>{name.charAt(0).toUpperCase() || 'U'}</Text>
            </Pressable>
        </View>
    );
}

export default function UserScreen() {
    const { user, logout } = useAuth();
    const [desk, setDesk] = useState<Desk | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDesk = async () => {
            if (!user?.assignedDeskID) {
                setLoading(false);
                return;
            }
            try {
                setDesk(await getDeskById(user.assignedDeskID));
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadDesk();
    }, [user]);

    return (
        <View style={userStyles.container}>
            <Header name={user?.name ?? 'User'} />

            {loading && <ActivityIndicator />}
            {!loading && error !== '' && <Text>{error}</Text>}
            {!loading && error === '' && !desk && <Text>No desk assigned yet.</Text>}
            {!loading && desk && <YourDesk desk={desk} />}

            <Text style={userStyles.PresetTextHeader}>Presets</Text>
            <Preset />
            <Profile />
            <Pressable onPress={logout} style={{ padding: 16, alignItems: 'center' }}>
                <Text style={{ color: '#b91c1c', fontWeight: '600' }}>Log out</Text>
            </Pressable>
        </View>
    );
}

function YourDesk({ desk }: { desk: Desk }) {
    return (
        <View style={userStyles.DeskView}>
            <View style={userStyles.deskHeader}>
                <Text style={userStyles.CurrentDesk}>Your current desk</Text>
                <View style={userStyles.ButtonConnect}>
                    <Text style={userStyles.connectText}>
                        {desk.isConnected ? 'Connected' : 'Disconnected'}
                    </Text>
                </View>
            </View>
            <Text style={userStyles.DeskNumberText}>
                Desk number: {desk.deskNum}
            </Text>
            <Text style={userStyles.CurrentHeightText}>
                Current Height: {desk.currentHeight}cm
            </Text>
        </View>
    );
}

function Preset() {
    const { sit: savedSit, stand: savedStand } = usePresets();
    return (
        <View style={userStyles.PresetView}>
            <Pressable style={userStyles.Preset}>
                <Text style={userStyles.PresetText}>Sit</Text>
                <Text style={userStyles.PresetSubText}>{savedSit} cm</Text>
            </Pressable>
            <Pressable style={userStyles.Preset}>
                <Text style={userStyles.PresetText}>Stand</Text>
                <Text style={userStyles.PresetSubText}>{savedStand}cm</Text>
            </Pressable>
        </View>
    );
}

function Profile() {
    const navigation = useNavigation<any>();
    return (
        <View style={userStyles.ProfileView}>
            <Pressable style={userStyles.Profile} onPress={() => navigation.navigate('Information')}
                accessibilityLabel="Information">
                <Text>Info</Text>
            </Pressable>
        </View>
    )
}
