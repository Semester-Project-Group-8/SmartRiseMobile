import { useState } from "react";
import { View, Text, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useHeaderHeight } from '@react-navigation/elements';
import { CreateProfileStyle } from "../styles/CreateProfileScreenStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { createUser } from '../services/api';

export default function Registration() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [showIosPicker, setShowIosPicker] = useState(false);
    const [height, setHeight] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigation = useNavigation<any>();
    const headerHeight = useHeaderHeight();

    const onDateChange = (event: DateTimePickerEvent, selected?: Date) => {
        if (event.type === 'set' && selected) setBirthDate(selected);
    };

    const openDatePicker = () => {
        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value: birthDate ?? DEFAULT_BIRTH_DATE,
                mode: 'date',
                maximumDate: new Date(),
                onChange: onDateChange,
            });
        } else {
            if (!birthDate) setBirthDate(DEFAULT_BIRTH_DATE);
            setShowIosPicker(prev => !prev);
        }
    };

    const handleContinue = async () => {
        setErrorMessage('');

        if (!fullName.trim() || !email.trim() || !password || !phone.trim() || !birthDate || !height.trim()) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        const isoDate = toIsoDate(birthDate);

        const heightCm = Number(height);
        if (Number.isNaN(heightCm) || heightCm < 100 || heightCm > 250) {
            setErrorMessage('Height must be a number between 100 and 250 cm.');
            return;
        }

        setLoading(true);
        try {
            await createUser({
                name: fullName.trim(),
                email: email.trim(),
                passwordHash: password,
                dateOfBirth: isoDate,
                phone: phone.trim(),
                height: heightCm,
            });
            setSubmitted(true);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <ScrollView contentContainerStyle={CreateProfileStyle.Container}>
                <View style={CreateProfileStyle.Header}>
                    <Text style={CreateProfileStyle.HeaderWelcomeText}>Request sent!</Text>
                    <Text style={CreateProfileStyle.HeaderText}>
                        An admin will review your registration. You can log in once your account is approved.
                    </Text>
                </View>
                <Pressable style={CreateProfileStyle.Button} onPress={() => navigation.navigate('Login')}>
                    <Text style={CreateProfileStyle.ButtonText}>Back to login</Text>
                </Pressable>
            </ScrollView>
        );
    }

    return (
        <KeyboardAvoidingView
            style={CreateProfileStyle.KeyboardAvoider}
            behavior="padding"
            keyboardVerticalOffset={headerHeight}
        >
        <ScrollView contentContainerStyle={CreateProfileStyle.Container} keyboardShouldPersistTaps="handled">
            <Header></Header>

            <Text style={CreateProfileStyle.Label}>Full name</Text>
            <TextInput
                style={CreateProfileStyle.Input}
                placeholder="Enter your full name"
                placeholderTextColor="#64748b"
                value={fullName}
                onChangeText={setFullName}
            />

            <Text style={CreateProfileStyle.Label}>Email address</Text>
            <TextInput
                style={CreateProfileStyle.Input}
                placeholder="you@example.com"
                placeholderTextColor="#64748b"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <Text style={CreateProfileStyle.Label}>Password</Text>
            <View style={CreateProfileStyle.PasswordInputBox}>
                <TextInput
                    style={CreateProfileStyle.PasswordInput}
                    placeholder="Create a password"
                    placeholderTextColor="#64748b"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={!showPassword}
                    textContentType="newPassword"
                    value={password}
                    onChangeText={setPassword}
                />
                <Pressable
                    onPress={() => setShowPassword(prev => !prev)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                    <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={22}
                        color="#64748b"
                    />
                </Pressable>
            </View>

            <Text style={CreateProfileStyle.Label}>Phone number</Text>
            <TextInput
                style={CreateProfileStyle.Input}
                placeholder="+1  (555) 000-0000"
                placeholderTextColor="#64748b"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            <View style={CreateProfileStyle.Row}>
                <View style={CreateProfileStyle.BirthDateColumn}>
                    <Text style={CreateProfileStyle.Label}>Date of birth</Text>
                    <Pressable
                        style={CreateProfileStyle.DateInputBox}
                        onPress={openDatePicker}
                        accessibilityRole="button"
                        accessibilityLabel="Select date of birth"
                    >
                        <Text style={birthDate ? CreateProfileStyle.DateText : CreateProfileStyle.DatePlaceholder}>
                            {birthDate ? formatDate(birthDate) : 'DD / MM / YYYY'}
                        </Text>
                        <Ionicons name="calendar-outline" size={20} color="#64748b" />
                    </Pressable>
                </View>
                <View style={CreateProfileStyle.HeightColumn}>
                    <Text style={CreateProfileStyle.Label}>Height</Text>
                    <View style={CreateProfileStyle.HeightInputBox}>
                        <TextInput
                            style={CreateProfileStyle.HeightInput}
                            placeholder="e.g. 170"
                            placeholderTextColor="#64748b"
                            keyboardType="number-pad"
                            value={height}
                            onChangeText={setHeight}
                        />
                        <Text style={CreateProfileStyle.HeightUnit}>cm</Text>
                    </View>
                </View>
            </View>

            {Platform.OS === 'ios' && showIosPicker && (
                <View style={CreateProfileStyle.IosPickerBox}>
                    <DateTimePicker
                        value={birthDate ?? DEFAULT_BIRTH_DATE}
                        mode="date"
                        display="inline"
                        maximumDate={new Date()}
                        onChange={onDateChange}
                    />
                    <Pressable onPress={() => setShowIosPicker(false)} style={CreateProfileStyle.IosPickerDone}>
                        <Text style={CreateProfileStyle.IosPickerDoneText}>Done</Text>
                    </Pressable>
                </View>
            )}

            {errorMessage !== '' && <Text style={CreateProfileStyle.ErrorText}>{errorMessage}</Text>}

            <Pressable style={CreateProfileStyle.Button} onPress={handleContinue} disabled={loading}>
                <Text style={CreateProfileStyle.ButtonText}>{loading ? 'Creating profile...' : 'Continue'}</Text>
            </Pressable>
            <Footer></Footer>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const DEFAULT_BIRTH_DATE = new Date(2000, 0, 1);

const pad = (n: number) => String(n).padStart(2, '0');

// Shown in the field, e.g. "21 / 11 / 2000"
function formatDate(date: Date): string {
    return `${pad(date.getDate())} / ${pad(date.getMonth() + 1)} / ${date.getFullYear()}`;
}

// "2000-11-21" (the format C# DateOnly expects). Uses local date parts to avoid timezone shifts.
function toIsoDate(date: Date): string {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function Header() {
    return (
        <View style={CreateProfileStyle.Header}>
            <Text style={CreateProfileStyle.HeaderWelcomeText}>Welcome aboard!</Text>
            <Text style={CreateProfileStyle.HeaderText}>Great to have you with us. Let&apos;s set up your profile.</Text>
        </View>
    )
}

function Footer() {
    return (
        <View style={CreateProfileStyle.Footer}>
            <Text style={CreateProfileStyle.FooterText}>Your personal details stay private.</Text>
        </View>
    )
}
