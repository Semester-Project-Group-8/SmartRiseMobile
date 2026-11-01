import { View, Text, Pressable } from "react-native";
import { userStyles } from '../styles/UserScreenStyle';

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

export default function UserScreen({
    packageDetected,
    scannerError,
}: {
    packageDetected: boolean;
    scannerError?: string;
}) {
    return (
        <View style={userStyles.container}>
            <Header></Header>
            <YourDesk
                packageDetected={packageDetected}
                scannerError={scannerError}
            ></YourDesk>
            <Text style={userStyles.PressetTextHeader}>Presets</Text>
            <Presset></Presset>
            <Profile></Profile>
        </View>

    );

}

function YourDesk({
    packageDetected,
    scannerError,
}: {
    packageDetected: boolean;
    scannerError?: string;
}) {
    return (
        <View style={userStyles.DeskView}>
            <View style={userStyles.deskHeader}>
                <Text style={userStyles.CurrentDesk}>Your current desk</Text>
                <View style={userStyles.ButtonConnect}>
                    <Text style={userStyles.connectText}>
                        {scannerError ? 'Scanner error' : packageDetected ? 'Package detected' : 'Searching'}
                    </Text>
                </View>
            </View>
            <Text style={userStyles.DeskNumberText}>Desk number: 4</Text>
            <Text style={userStyles.CurrentHeightText}>Current Height: 70cm</Text>
            {scannerError && <Text>{scannerError}</Text>}
        </View>
    );
}

function Presset() {
    return (
        <View style={userStyles.PressetView}>
            <Pressable style={userStyles.Presset}>
                <Text style={userStyles.PressetText}>Sit</Text>
                <Text style={userStyles.PressetSubText}>70cm</Text>
            </Pressable>
            <Pressable style={userStyles.Presset}>
                <Text style={userStyles.PressetText}>Stand</Text>
                <Text style={userStyles.PressetSubText}>110cm</Text>
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