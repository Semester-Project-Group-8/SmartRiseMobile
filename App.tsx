import { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import UserScreen from './src/screens/UserScreen';
import AdminScreen from './src/screens/AdminScreen';
import CleanerScreen from './src/screens/CleanerScreen';
import { startIBeaconMonitoring } from './src/services/ibeaconScanner';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [packageDetected, setPackageDetected] = useState(false);
  const [scannerError, setScannerError] = useState<string>();

  useEffect(() => {
    let stopMonitoring: (() => Promise<void>) | undefined;
    let isMounted = true;

    startIBeaconMonitoring({
      onDetected: () => {
        if (isMounted) {
          setPackageDetected(true);
          setScannerError(undefined);
        }
      },
      onLost: () => {
        if (isMounted) {
          setPackageDetected(false);
        }
      },
      onError: (error) => {
        if (isMounted) {
          setScannerError(error.message);
        }
      },
    })
      .then((stop) => {
        if (isMounted) {
          stopMonitoring = stop;
        } else {
          return stop();
        }
      })
      .catch(() => {
        // The scanner reports the message through onError.
      });

    return () => {
      isMounted = false;
      void stopMonitoring?.();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {screen === 'login' && <LoginScreen />}
        {screen === 'user' && (
          <UserScreen
            packageDetected={packageDetected}
            scannerError={scannerError}
          />
        )}
        {screen === 'admin' && <AdminScreen />}
        {screen === 'cleaner' && <CleanerScreen />}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 30,marginBottom:50, }}>
        <Button title="Login" onPress={() => setScreen('login')} />
        <Button title="User" onPress={() => setScreen('user')} />
        <Button title="Admin" onPress={() => setScreen('admin')} />
        <Button title="Cleaner" onPress={() => setScreen('cleaner')} />
      </View>
    </View>
  );
}