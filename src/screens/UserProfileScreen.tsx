import { View, Text, Pressable, Alert } from 'react-native';
import { useEffect, useState } from "react";
import { UserProfileScreenStyle } from '../styles/UserProfileScreenStyle';
import { usePresets } from '../context/PresetsContext';
import { useAuth } from '../context/AuthContext';
import { getDeskById, updatePresets } from '../services/api';
import type { User } from '../types/user';
import type { Desk } from '../types/desk';

const ROLE_LABELS = { user: 'User', cleaner: 'Cleaner', admin: 'Admin' };

export default function UserProfileScreen() {
    const { user } = useAuth();
    const [desk, setDesk] = useState<Desk | null>(null);

    useEffect(() => {
        const loadDesk = async () => {
            if (!user?.assignedDeskID) return;
            try {
                setDesk(await getDeskById(user.assignedDeskID));
            } catch {
            }
        };
        loadDesk();
    }, [user]);

    if (!user) {
        return <Text>Not logged in.</Text>;
    }

    return (
        <View>
            <Header user={user} />
            <Account user={user} desk={desk} />
            <Presets user={user} />
        </View>
    );
}

function fullName(user: User) {
    return `${user.name} ${user.surname}`.trim();
}

function Header({ user }: { user: User }) {
    return (
        <View style={UserProfileScreenStyle.Header}>
            <Text style={UserProfileScreenStyle.ProfileLogo}>{user.name.charAt(0).toUpperCase() || 'U'}</Text>
            <Text style={UserProfileScreenStyle.ProfileName}>{fullName(user)}</Text>
            <Text style={UserProfileScreenStyle.ProfileType}>{ROLE_LABELS[user.role]}</Text>
        </View>
    );
}

function Account({ user, desk }: { user: User; desk: Desk | null }) {
    let deskText = 'None';
    if (desk) {
        deskText = `Desk ${desk.deskNum}`;
    } else if (user.assignedDeskID) {
        deskText = 'Unknown';
    }

    return (
        <View>
            <Text style={UserProfileScreenStyle.Text}>Account</Text>
            <View style={UserProfileScreenStyle.Table}>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Name</Text>
                    <Text>{fullName(user)}</Text>
                </View>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Email</Text>
                    <Text>{user.email ?? '—'}</Text>
                </View>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Preferred Desk</Text>
                    <Text>{deskText}</Text>
                </View>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Height</Text>
                    <Text>{user.height ? `${user.height} cm` : '—'}</Text>
                </View>
                <View style={UserProfileScreenStyle.RowBottom}>
                    <Text>Date Of Birth</Text>
                    <Text>{user.dateOfBirth ?? '—'}</Text>
                </View>
            </View>
        </View>
    );
}

function clamp(height: number) {
    return Math.min(150, Math.max(30, height));
}

function Presets({ user }: { user: User }) {
    const { sit: savedSit, stand: savedStand, savePresets } = usePresets();
    const [sit, setSit] = useState(savedSit);
    const [stand, setStand] = useState(savedStand);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await savePresets(sit, stand);

            if (!user.assignedDeskID) {
                Alert.alert('Saved on this phone', 'You need a desk before presets can be saved to the server.');
                return;
            }

            await updatePresets(user.id, 'sit', sit);
            Alert.alert('Saved', 'Your presets were saved.');
        } catch (e) {
            Alert.alert('Saved on this phone only', `Couldn't save to the server: ${(e as Error).message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <View>
            <Text style={UserProfileScreenStyle.Text}>My Presets</Text>
            <View style={UserProfileScreenStyle.Table}>
                <View style={UserProfileScreenStyle.Row}>
                    <Text>Sit</Text>
                    <View style={UserProfileScreenStyle.SizeChange}>
                        <Pressable style={UserProfileScreenStyle.ChangeButton} onPress={() => setSit(clamp(sit + 1))} >
                            <Text style={UserProfileScreenStyle.ButtonText}>+</Text>
                        </Pressable>
                        <Text style={UserProfileScreenStyle.HeightText}>{sit} cm</Text>
                        <Pressable style={UserProfileScreenStyle.ChangeButton} onPress={() => setSit(clamp(sit - 1))}>
                            <Text style={UserProfileScreenStyle.ButtonText}>-</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={UserProfileScreenStyle.RowBottom}>
                    <Text>Stand</Text>
                    <View style={UserProfileScreenStyle.SizeChange}>
                        <Pressable style={UserProfileScreenStyle.ChangeButton} onPress={() => setStand(clamp(stand + 1))}>
                            <Text style={UserProfileScreenStyle.ButtonText}>+</Text>
                        </Pressable>
                        <Text style={UserProfileScreenStyle.HeightText}>{stand} cm</Text>
                        <Pressable style={UserProfileScreenStyle.ChangeButton} onPress={() => setStand(clamp(stand - 1))}>
                            <Text style={UserProfileScreenStyle.ButtonText}>-</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Pressable
                style={({ pressed }) => [UserProfileScreenStyle.SaveButton, (pressed || saving) && UserProfileScreenStyle.SaveButtonPressed]}
                onPress={handleSave}
                disabled={saving}>
                <Text style={UserProfileScreenStyle.SaveButtonText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
            </Pressable>
        </View>
    );
}
