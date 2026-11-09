import { useState } from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { CreateProfileStyle } from "../styles/CreateProfileScreenStyle";

export default function Registration(){
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [height, setHeight] = useState('');

    const handleContinue = () => {
        console.log('Profile:', { fullName, email, phone, birthDate, height });
    };

    return(
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
                    <TextInput
                        style={CreateProfileStyle.Input}
                        placeholder="DD / MM / YYYY"
                        placeholderTextColor="#64748b"
                        keyboardType="numbers-and-punctuation"
                        value={birthDate}
                        onChangeText={setBirthDate}
                    />
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

            <Pressable style={CreateProfileStyle.Button} onPress={handleContinue}>
                <Text style={CreateProfileStyle.ButtonText}>Continue</Text>
            </Pressable>
            <Footer></Footer>
        </ScrollView>
    )
}

function Header(){
    return(
        <View style={CreateProfileStyle.Header}>
            <Text style={CreateProfileStyle.HeaderWelcomeText}>Welcome aboard!</Text>
            <Text style={CreateProfileStyle.HeaderText}>Great to have you with us. Let&apos;s set up your profile.</Text>
        </View>
    )
}

function Footer(){
    return(
        <View style={CreateProfileStyle.Footer}>
            <Text style={CreateProfileStyle.FooterText}>Your personal details stay private.</Text>
        </View>
    )
}
