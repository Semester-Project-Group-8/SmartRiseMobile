import { DeviceEventEmitter, EventSubscription } from 'react-native';
import Beacons, {
  BeaconRegion,
} from '@hkpuits/react-native-beacons-manager';

export const PICO_W_BEACON: BeaconRegion = {
  identifier: 'pico-w',
  uuid: '12345678-1234-5678-1234-56789ABCDEF0',
  major: 1,
  minor: 1,
};

export type IBeaconMonitorOptions = {
  onDetected: () => void;
  onLost: () => void;
  onError: (error: Error) => void;
};

export async function startIBeaconMonitoring({
  onDetected,
  onLost,
  onError,
}: IBeaconMonitorOptions): Promise<() => Promise<void>> {
  let isDetected = false;
  let enteredSubscription: EventSubscription | undefined;
  let exitedSubscription: EventSubscription | undefined;

  const handleEnter = () => {
    if (!isDetected) {
      isDetected = true;
      onDetected();
    }
  };

  const handleExit = () => {
    if (isDetected) {
      isDetected = false;
      onLost();
    }
  };

  try {
    Beacons.requestAlwaysAuthorization();

    enteredSubscription = DeviceEventEmitter.addListener(
      'regionDidEnter',
      handleEnter,
    );
    exitedSubscription = DeviceEventEmitter.addListener(
      'regionDidExit',
      handleExit,
    );

    await Beacons.startMonitoringForRegion(PICO_W_BEACON);
  } catch (error) {
    enteredSubscription?.remove();
    exitedSubscription?.remove();

    const monitorError =
      error instanceof Error
        ? error
        : new Error('Unable to start iBeacon monitoring.');
    onError(monitorError);
    throw monitorError;
  }

  return async () => {
    enteredSubscription?.remove();
    exitedSubscription?.remove();
    await Beacons.stopMonitoringForRegion(PICO_W_BEACON);
  };
}
