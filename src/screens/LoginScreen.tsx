import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { loginStyles } from '../styles/LoginScreenStyle';
import { useAuth } from '../context/AuthContext';

function Header() {
  return (
    <View style={loginStyles.header}>
      <Text style={loginStyles.title}>Welcome to SmartRise</Text>
      <Text style={loginStyles.subtitle}>
        Please sign in below using your email and password
      </Text>
    </View>
  );
}


export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  
  const handleLogin = async () => {
    setErrormessage("");
    setLoading(true);
    try {
      await login(email, password);
      console.log('Logged in');
    } catch (error) {
      setErrormessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={loginStyles.container}>
      <Header></Header>
      <TextInput
        style={loginStyles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Enter your Password"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errormessage !== '' && <Text style={loginStyles.errorText}>{errormessage}</Text>}
      <Pressable style={loginStyles.button} onPress={handleLogin} disabled={loading}>
        <Text style={loginStyles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </Pressable>
      <Footer></Footer>
    </View>

  );

}

function Footer() {
  return (
    <View style={loginStyles.footer}>
      <Text style={loginStyles.footerText}>
        If you didn&apos;t receive your login information, please contact your admin.
      </Text>
    </View>
  );
}