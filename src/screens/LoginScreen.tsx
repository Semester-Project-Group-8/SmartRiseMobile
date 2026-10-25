import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { loginStyles } from '../styles/LoginScreenStyle';

function Header() {
  return (
    <View style={loginStyles.header}>
      <Text style={loginStyles.title}>Welcome to SmartRise</Text>
      <Text style={loginStyles.subtitle}>
        Please sign in below using your username and password
      </Text>
    </View>
  );
}

export default function LoginScreen() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={loginStyles.container}>
      <Header></Header>
      <TextInput
        style={loginStyles.input}
        placeholder="Enter your Username"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Enter your Password"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}>
      </TextInput>

      <Pressable style={loginStyles.button} onPress={() => console.log('Login pressed')}>
        <Text style={loginStyles.buttonText}>Login</Text>
      </Pressable>
      <Footer></Footer>
    </View>

  );

}

function Footer() {
  return (
    <View style={loginStyles.footer}>
      <Text style={loginStyles.footerText}>
        If you didn't receive your login information, please contact your admin.
      </Text>
    </View>
  );
}