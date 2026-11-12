import { PermissionsAndroid, Platform } from 'react-native';

export async function requestBluetoothPermissions(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  const permissions =
    Platform.Version >= 31
      ? [
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          // BLUETOOTH_SCAN is declared without `neverForLocation`, so Android
          // silently drops BLE scan results unless location is also granted.
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ...(Platform.Version >= 33
            ? [PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS]
            : []),
        ]
      : [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];

  const result = await PermissionsAndroid.requestMultiple(permissions);

  return Object.values(result).every(
    status => status === PermissionsAndroid.RESULTS.GRANTED,
  );
}