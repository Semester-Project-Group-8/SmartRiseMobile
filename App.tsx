import { useEffect } from 'react';
import { AppState, View, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import UserScreen from './src/screens/UserScreen';
import AdminScreen from './src/screens/AdminScreen';
import CleanerScreen from './src/screens/CleanerScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import UserProfileInformation from './src/screens/UserProfileInformationScreen';
import AllDesks from './src/screens/AdminAllDesksScreen';
import Reported from './src/screens/AdminReportedScreen';
import NewUsers from './src/screens/AdminNewUsersScreen';
import AdminProfile from './src/screens/AdminProfileScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { PresetsProvider } from './src/context/PresetsContext';
import { requestBluetoothPermissions } from './src/services/bluetoothPermissions';
import { BeaconScanner } from './src/services/beaconScanner';

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
      .then((allowed) => {
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

        const detectedSubscription = BeaconScanner.addListener(
          'beaconDetected',
          (event) => {
            console.log('Beacon detected:', event);
          },
        );

        const errorSubscription = BeaconScanner.addListener(
          'scanError',
          (event) => {
            console.error('Beacon scan failed:', event.errorCode);
          },
        );

        BeaconScanner.startScanning();
        const appStateSubscription = AppState.addEventListener(
          'change',
          (nextState) => {
            if (nextState === 'background') {
              BeaconScanner.stopScanning();
              BeaconScanner.startBackgroundScanning();
            } else if (nextState === 'active') {
              BeaconScanner.stopBackgroundScanning();
              BeaconScanner.startScanning();
            }
          },
        );

        cleanupSubscriptions = () => {
          detectedSubscription.remove();
          errorSubscription.remove();
          appStateSubscription.remove();
          BeaconScanner.stopScanning();
          BeaconScanner.stopBackgroundScanning();
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
    screen = (
      <>
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen
          name="AdminProfile"
          component={AdminProfile}
          options={{ headerShown: true, title: 'Profile' }}
        />
        <Stack.Screen
          name="Reported"
          component={Reported}
          options={{ headerShown: true, title: 'Reported Issues' }}
        />
        <Stack.Screen
          name="New Users"
          component={NewUsers}
          options={{ headerShown: true, title: 'New Users Requests' }}
        />
        <Stack.Screen
          name="All Desks"
          component={AllDesks}
          options={{ headerShown: true, title: 'All Desks' }}
        />
      </>
    );
  } else if (user.role === 'Cleaner') {
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