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
  /**
   * Backend endpoint the native service POSTs enter/exit events to. Reporting
   * happens in Kotlin so it keeps working after the app is swiped away.
   * When omitted, events are only logged (logcat tag: BeaconReporter).
   */
  reportUrl?: string;
  /** Sent as `Authorization: Bearer <token>`. */
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