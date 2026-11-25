import { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import UserScreen from './src/screens/UserScreen';
import CleanerScreen from './src/screens/CleanerScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import UserProfileInformation from './src/screens/UserProfileInformationScreen';
import Report from './src/screens/ReportProblemScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { PresetsProvider } from './src/context/PresetsContext';
import { requestBluetoothPermissions } from './src/services/bluetoothPermissions';
import { BeaconScanner } from './src/services/beaconScanner';
import Registration from './src/screens/CreateProfileScreen';
import { getUserDeskBeacon, detectDesk } from './src/services/api';

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

        const beacon = await getUserDeskBeacon(user.id);
        
        if (!isActive) {
          return;
        }

        if (!beacon) {
          BeaconScanner.stopBackgroundScanning();
          Alert.alert(
            'No assigned desk',
            'This user does not have a beacon to scan.',
          );
          return;
        }

        const beaconName = `SmartRise_${beacon.major}_${beacon.minor}`;

        const enteredSubscription = BeaconScanner.addListener(
          'beaconEntered',
          (beacon) => {
            console.log('Beacon entered range:', beacon);
            void detectDesk('entered').catch((error: unknown) => {
              console.error('Failed to report beacon entry:', error);
              if (isActive) {
                Alert.alert('Beacon update failed', 'Could not report the entry to the server.');
              }
            });
          },
        );

        const exitedSubscription = BeaconScanner.addListener(
          'beaconExited',
          (beacon) => {
            console.log('Beacon left range:', beacon);
            void detectDesk('exited').catch((error: unknown) => {
              console.error('Failed to report beacon exit:', error);
              if (isActive) {
                Alert.alert('Beacon update failed', 'Could not report the exit to the server.');
              }
            });
          },
        );

        const errorSubscription = BeaconScanner.addListener(
          'scanError',
          (event) => {
            console.error('Beacon scan failed:', event.errorCode);
          },
        );

        if (!isActive) {
          enteredSubscription.remove();
          exitedSubscription.remove();
          errorSubscription.remove();
          return;
        }
        BeaconScanner.startBackgroundScanning({
          beaconName,
        });

        cleanupSubscriptions = () => {
          enteredSubscription.remove();
          exitedSubscription.remove();
          errorSubscription.remove();
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
    screen = (
      <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="CreateProfile"
          component={Registration}
          options={{ headerShown: true, title: 'Create Profile' }}
        />
      </>
    );
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
        <Stack.Screen
          name="Report"
          component={Report}
          options={{ headerShown: true, title: 'Report Problem' }}
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