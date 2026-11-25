import { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import UserScreen from './src/screens/UserScreen';
import CleanerScreen from './src/screens/CleanerScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import UserProfileInformation from './src/screens/UserProfileInformationScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { PresetsProvider } from './src/context/PresetsContext';
import { requestBluetoothPermissions } from './src/services/bluetoothPermissions';
import { BeaconScanner } from './src/services/beaconScanner';
import * as SecureStore from 'expo-secure-store';
import Registration from './src/screens/CreateProfileScreen';


const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    let isActive = true;
    let cleanupSubscriptions: (() => void) | undefined;

    requestBluetoothPermissions()
      .then(async (allowed) => {
        if (!isActive) {
          return;
        }

        if (!allowed) {
          Alert.alert(
            'Bluetooth permission required',
            'Allow Bluetooth access to detect the beacon.',
          );
          return;
        }

        const enteredSubscription = BeaconScanner.addListener(
          'beaconEntered',
          (beacon) => {
            console.log('Beacon entered range:', beacon);
          },
        );

        const exitedSubscription = BeaconScanner.addListener(
          'beaconExited',
          (beacon) => {
            console.log('Beacon left range:', beacon);
          },
        );

        const errorSubscription = BeaconScanner.addListener(
          'scanError',
          (event) => {
            console.error('Beacon scan failed:', event.errorCode);
          },
        );

        const authToken = (await SecureStore.getItemAsync('token')) ?? undefined;
        if (!isActive) {
          enteredSubscription.remove();
          exitedSubscription.remove();
          errorSubscription.remove();
          return;
        }
        BeaconScanner.startBackgroundScanning({
          reportUrl: process.env.EXPO_PUBLIC_BEACON_REPORT_URL,
          authToken,
        });

        cleanupSubscriptions = () => {
          enteredSubscription.remove();
          exitedSubscription.remove();
          errorSubscription.remove();
        };
      })
      .catch(() => {
        if (isActive) {
          Alert.alert(
            'Bluetooth permission error',
            'We could not request Bluetooth access. Please try again.',
          );
        }
      });

    return () => {
      isActive = false;
      cleanupSubscriptions?.();
    };
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      BeaconScanner.stopBackgroundScanning();
    }
  }, [isLoading, user]);

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
  } else if (user.role === 'cleaner') {
    screen = <Stack.Screen name="Cleaner" component={CleanerScreen} />;
  } else {
    screen = (
      <>
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ headerShown: true, title: 'Profile' }}
        />
        <Stack.Screen
          name="Information"
          component={UserProfileInformation}
          options={{ headerShown: true, title: 'Information' }}
        />
      </>
    );
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
      <PresetsProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PresetsProvider>
    </AuthProvider>
  );
}