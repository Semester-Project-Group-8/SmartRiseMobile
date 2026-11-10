import { EventSubscription, requireNativeModule } from 'expo-modules-core';

export type BeaconDetectedEvent = {
  name: string;
  address: string;
  rssi: number;
};

export type ScanErrorEvent = {
  errorCode: number;
};

type BeaconScannerModuleType = {
  startBackgroundScanning(): void;
  stopBackgroundScanning(): void;
  addListener(
    eventName: 'beaconEntered' | 'beaconExited',
    listener: (event: BeaconDetectedEvent) => void,
  ): EventSubscription;
  addListener(
    eventName: 'scanError',
    listener: (event: ScanErrorEvent) => void,
  ): EventSubscription;
};

export const BeaconScanner =
  requireNativeModule<BeaconScannerModuleType>('BeaconScanner');