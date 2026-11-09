import { EventSubscription, requireNativeModule } from 'expo-modules-core';

type BeaconDetectedEvent = {
  name: string;
  address: string;
  rssi: number;
};

type ScanErrorEvent = {
  errorCode: number;
};

type BeaconScannerModuleType = {
  startScanning(): void;
  stopScanning(): void;
  startBackgroundScanning(): void;
  stopBackgroundScanning(): void;
  addListener(
    eventName: 'beaconDetected',
    listener: (event: BeaconDetectedEvent) => void,
  ): EventSubscription;
  addListener(
    eventName: 'scanError',
    listener: (event: ScanErrorEvent) => void,
  ): EventSubscription;
};

export const BeaconScanner =
  requireNativeModule<BeaconScannerModuleType>('BeaconScanner');