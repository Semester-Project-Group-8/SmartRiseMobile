import { View, Text, Pressable } from 'react-native';
import { useState } from "react";
import { UserProfileScreenStyle } from '../styles/UserProfileScreenStyle';
import { usePresets } from '../context/PresetsContext';
export default function UserProfileScreen() {
    return (
        <View>
            <Header />
            <Account />
            <Presets></Presets>
        </View>
    );
}

function Header() {
    return (
        <View style={UserProfileScreenStyle.Header}>
            <Text style={UserProfileScreenStyle.ProfileLogo}>U</Text>
            <Text style={UserProfileScreenStyle.ProfileName}>User Name</Text>
            <Text style={UserProfileScreenStyle.ProfileType}>User</Text>
        </View>
    );
}

function Account() {
    return (
        <View>
            <Text style={UserProfileScreenStyle.Text}>Account</Text>
            <View style={UserProfileScreenStyle.Table}>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Name</Text>
                    <Text>User&apos;s Name</Text>
                </View>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Preffered Desk</Text>
                    <Text>User&apos;s PD</Text>
                </View>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Height</Text>
                    <Text>User&apos;s Height</Text>
                </View>
                <View style={UserProfileScreenStyle.RowBottom}>
                    <Text>Date Of Birth</Text>
                    <Text>User&apos;s DOB</Text>
                </View>
            </View>
        </View>
    );
}

function Presets() {
    const { sit: savedSit, stand: savedStand, savePresets } = usePresets();
    const [sit, setSit] = useState(savedSit);
    const [stand, setStand] = useState(savedStand);
    return (
        <View>
            <Text style={UserProfileScreenStyle.Text}>My Presets</Text>
            <View style={UserProfileScreenStyle.Table}>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Sit</Text>
                    <View style={UserProfileScreenStyle.SizeChange}>
                        <Pressable style={UserProfileScreenStyle.ChangeButton} onPress={() => setSit(sit + 1)} >
                            <Text style={UserProfileScreenStyle.ButtonText}>+</Text>
                        </Pressable>
                        <Text style={UserProfileScreenStyle.HeightText}>{sit} cm</Text>
                        <Pressable style={UserProfileScreenStyle.ChangeButton} onPress={() => setSit(sit - 1)}>
                            <Text style={UserProfileScreenStyle.ButtonText}>-</Text>
                        </Pressable>
                    </View>

                </View>
                <View style={UserProfileScreenStyle.RowBottom}>
                    <Text>Stand</Text>
                    <View style={UserProfileScreenStyle.SizeChange}>
                        <Pressable style={UserProfileScreenStyle.ChangeButton} onPress={() => setStand(stand + 1)}>
                            <Text style={UserProfileScreenStyle.ButtonText}>+</Text>
                        </Pressable>
                        <Text style={UserProfileScreenStyle.HeightText}>{stand} cm</Text>
                        <Pressable style={UserProfileScreenStyle.ChangeButton} onPress={() => setStand(stand - 1)}>
                            <Text style={UserProfileScreenStyle.ButtonText}>-</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Pressable
                style={({ pressed }) => [UserProfileScreenStyle.SaveButton, pressed && UserProfileScreenStyle.SaveButtonPressed]}
                onPress={() => savePresets(sit, stand)}>
                <Text style={UserProfileScreenStyle.SaveButtonText}>Save Changes</Text>
            </Pressable>
        </View>
    );
}