import { useState } from 'react';
import { View, Button } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import UserScreen from './src/screens/UserScreen';
import AdminScreen from './src/screens/AdminScreen';
import CleanerScreen from './src/screens/CleanerScreen';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  const [screen, setScreen] = useState('login');

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {screen === 'login' && <LoginScreen />}
          {screen === 'user' && <UserScreen />}
          {screen === 'admin' && <AdminScreen />}
          {screen === 'cleaner' && <CleanerScreen />}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 30, marginBottom: 50, }}>
          <Button title="Login" onPress={() => setScreen('login')} />
          <Button title="User" onPress={() => setScreen('user')} />
          <Button title="Admin" onPress={() => setScreen('admin')} />
          <Button title="Cleaner" onPress={() => setScreen('cleaner')} />
        </View>
      </View>
    </AuthProvider>
  );
}