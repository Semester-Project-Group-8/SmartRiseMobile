import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { NewUsersStyle } from "../styles/AdminNewUsersScreenStyle";
export default function NewUsers() {
    return (
        <View>
            <Text style={NewUsersStyle.Headertext}>You have 1 new requests</Text>
            <Request></Request>
        </View>
    )
}

const roles = ['User', 'Cleaner', 'Admin'];
const desks = ['Desk 1', 'Desk 2', 'Desk 3', 'Desk 4'];

function Request() {
    const [role, setRole] = useState('');

    return (
        <View style={NewUsersStyle.Container}>
            <View style={NewUsersStyle.RequestRow}>
                <Text style={NewUsersStyle.ProfileLogo}>N</Text>
                <Text style={NewUsersStyle.ProfileName}>New User Name</Text>
            </View>
            <View style={NewUsersStyle.Divider} />
            <Text style={NewUsersStyle.ProfileText}>Assign Role</Text>
            <View style={NewUsersStyle.RequestRow}>
                {roles.map((r) => (
                    <Pressable
                        key={r}
                        style={[NewUsersStyle.RolePressable, role === r && NewUsersStyle.RoleSelected]}
                        onPress={() => setRole(r)}
                    >
                        <Text style={[NewUsersStyle.PressableText, role === r && NewUsersStyle.PressableTextSelected]}>{r}</Text>
                    </Pressable>
                ))}
            </View>
            {role === 'User' && (
                <View style={NewUsersStyle.Desks}>
                    <Text style={NewUsersStyle.ProfileText}>Assign Desk and Beacon</Text>
                    {desks.map((desk) => (
                        <Pressable
                            key={desk}
                            style={({ pressed }) => [NewUsersStyle.DeskPressable, pressed && NewUsersStyle.ButtonPressed]}
                        >
                            <Text style={NewUsersStyle.DeskText}>{desk}</Text>
                        </Pressable>
                    ))}
                </View>
            )}

            <View style={NewUsersStyle.ActionRow}>
                <Pressable style={({ pressed }) => [NewUsersStyle.AcceptButton, pressed && NewUsersStyle.ButtonPressed]}>
                    <Text style={NewUsersStyle.AcceptText}>Accept</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [NewUsersStyle.RejectButton, pressed && NewUsersStyle.ButtonPressed]}>
                    <Text style={NewUsersStyle.RejectText}>Reject</Text>
                </Pressable>
            </View>
        </View>
    )
}
