import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userStyles } from '../styles/UserScreenStyle';
import { useAuth } from '../context/AuthContext';
import { usePresets } from '../context/PressetsContext';
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
    return (
        <View style={userStyles.container}>
            <Header></Header>
            <YourDesk></YourDesk>
            <Text style={userStyles.PressetTextHeader}>Presets</Text>
            <Presset></Presset>
            <Profile></Profile>
            <Pressable onPress={logout} style={{ padding: 16, alignItems: 'center' }}>
                <Text style={{ color: '#b91c1c', fontWeight: '600' }}>Log out</Text>
            </Pressable>
        </View>

    );

}

function YourDesk() {
    return (
        <View style={userStyles.DeskView}>
            <View style={userStyles.deskHeader}>
                <Text style={userStyles.CurrentDesk}>Your current desk</Text>
                <View style={userStyles.ButtonConnect}>
                    <Text style={userStyles.connectText}>Connected</Text>
                </View>
            </View>
            <Text style={userStyles.DeskNumberText}>Desk number: 4</Text>
            <Text style={userStyles.CurrentHeightText}>Current Height: 70cm</Text>
        </View>
    );
}

function Presset() {
    const { sit: savedSit, stand: savedStand } = usePresets();
    return (
        <View style={userStyles.PressetView}>
            <Pressable style={userStyles.Presset}>
                <Text style={userStyles.PressetText}>Sit</Text>
                <Text style={userStyles.PressetSubText}>{savedSit} cm</Text>
            </Pressable>
            <Pressable style={userStyles.Presset}>
                <Text style={userStyles.PressetText}>Stand</Text>
                <Text style={userStyles.PressetSubText}>{savedStand}cm</Text>
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