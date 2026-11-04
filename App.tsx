import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import UserScreen from './src/screens/UserScreen';
import AdminScreen from './src/screens/AdminScreen';
import CleanerScreen from './src/screens/CleanerScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, isLoading } = useAuth();


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  let screen;
  if (!user) {
    screen = <Stack.Screen name="Login" component={LoginScreen} />;
  } else if (user.role === 'Admin') {
    screen = <Stack.Screen name="Admin" component={AdminScreen} />;
  } else if (user.role === 'Cleaner') {
    screen = <Stack.Screen name="Cleaner" component={CleanerScreen} />;
  } else {
    screen = <Stack.Screen name="User" component={UserScreen} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screen}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}