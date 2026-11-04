import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userStyles } from '../styles/UserScreenStyle';
import { getDeskById, getUserById } from "../services/api";
import type { Desk } from "../types/desk";
import type { User } from "../types/user";

import { useAuth } from '../context/AuthContext';
import { usePresets } from '../context/PresetsContext';
function Header() {
    const navigation = useNavigation<any>();
    return (
        <View style={userStyles.header}>
            <Text style={userStyles.title}>Welcome Back {'\n'} User Name</Text>
            <Pressable
                style={userStyles.profileIcon}
                onPress={() => navigation.navigate('UserProfile')}
                accessibilityLabel="Profile">
                <Text style={userStyles.profileLetter}>U</Text>
            </Pressable>
        </View>
    );
}

export default function UserScreen() {
    const { logout } = useAuth();
    const deskId = 'desk-002';
    const userId = 'user-002';

    const desk = getDeskById(deskId);
    const user = getUserById(userId);


    return (
        <View style={userStyles.container}>
            <Header></Header>
            <YourDesk desk={desk}></YourDesk>
            <Text style={userStyles.PressetTextHeader}>Presets</Text>
            {user ? <Presset user={user} /> : <Text>User not found.</Text>}
            <Profile></Profile>
            <Pressable onPress={logout} style={{ padding: 16, alignItems: 'center' }}>
                <Text style={{ color: '#b91c1c', fontWeight: '600' }}>Log out</Text>
            </Pressable>
        </View>

    );

}

function YourDesk({desk}: {desk: Desk | undefined;}) {
    if (!desk) {
        return <Text>Desk not found.</Text>;
    }

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
            <Pressable style={userStyles.Profile } onPress={() => navigation.navigate('Information')}
                accessibilityLabel="Information">
                <Text>Info</Text>
            </Pressable>
        </View>
    )
}