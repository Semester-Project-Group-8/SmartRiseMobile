import { EventSubscription, requireNativeModule } from 'expo-modules-core';

export type BeaconDetectedEvent = {
  name: string;
  address: string;
  rssi: number;
};

export type ScanErrorEvent = {
  errorCode: number;
};

export type StartScanningOptions = {
  reportUrl?: string;
  authToken?: string;
};

type BeaconScannerModuleType = {
  startBackgroundScanning(options?: StartScanningOptions): void;
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