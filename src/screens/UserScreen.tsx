import { View, Text, TextInput, Pressable } from "react-native";
import { userStyles } from '../styles/UserScreenStyle';
import { getDeskById, getUserById } from "../services/api";
import type { Desk } from "../types/desk";
import type { User } from "../types/user";

function Header() {
    return (
        <View style={userStyles.header}>
            <Text style={userStyles.title}>Welcome Back {'\n'} User Name</Text>
            <Pressable
                style={userStyles.profileIcon}
                onPress={() => console.log('Profile')}
                accessibilityLabel="Profile">
                <Text style={userStyles.profileLetter}>U</Text>
            </Pressable>
        </View>
    );
}

export default function UserScreen() {

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

function Presset({user}: { user: User }) {
    return (
        <View style={userStyles.PressetView}>
            <Pressable style={userStyles.Presset}>
                <Text style={userStyles.PressetText}>Sit</Text>
                <Text style={userStyles.PressetSubText}>{user.sitPreset}cm</Text>
            </Pressable>
            <Pressable style={userStyles.Presset}>
                <Text style={userStyles.PressetText}>Stand</Text>
                <Text style={userStyles.PressetSubText}>{user.standPreset}cm</Text>
            </Pressable>
        </View>
    );
}

function Profile() {
    return (
        <View style={userStyles.ProfileView}>
            <Pressable style={userStyles.Profile}>
                <Text>Edit Profile</Text>
            </Pressable>
            <Pressable style={userStyles.Profile}>
                <Text>Info</Text>
            </Pressable>
        </View>
    )
}