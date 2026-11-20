import { useRef, useState } from "react";
import { View, Text, TextInput, Pressable, Keyboard, type TextInputInstance } from "react-native";
import { loginStyles } from '../styles/LoginScreenStyle';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@react-native-vector-icons/ionicons';

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
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const passwordRef = useRef<TextInputInstance>(null);

  const handleLogin = async () => {
    if (loading) return;
    Keyboard.dismiss();
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
    <Pressable style={loginStyles.container} onPress={Keyboard.dismiss} accessible={false}>
      <Header></Header>
      <TextInput
        style={loginStyles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      
      <View style={loginStyles.passwordContainer}>
        <TextInput
          ref={passwordRef}
          style={loginStyles.passwordInput}
          placeholder="Enter your Password"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />
        <Pressable
          onPress={() => setShowPassword(prev => !prev)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
        >
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={22}
            color="#6b7280"
          />
        </Pressable>
      </View>

      {errormessage !== '' && <Text style={loginStyles.errorText}>{errormessage}</Text>}
      <Pressable style={loginStyles.button} onPress={handleLogin} disabled={loading}>
        <Text style={loginStyles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </Pressable>
      <Footer></Footer>
    </Pressable>

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