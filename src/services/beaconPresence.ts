import type { BeaconDetectedEvent } from './beaconScanner';

export const BEACON_LOST_TIMEOUT_MS = 5000;

type PresenceCallbacks = {
  onEnter: (beacon: BeaconDetectedEvent) => void;
  onExit: (beacon: BeaconDetectedEvent) => void;
};

type TrackedBeacon = {
  beacon: BeaconDetectedEvent;
  timeout: ReturnType<typeof setTimeout>;
};

export class BeaconPresenceTracker {
  private readonly beacons = new Map<string, TrackedBeacon>();

  constructor(
    private readonly callbacks: PresenceCallbacks,
    private readonly lostTimeoutMs = BEACON_LOST_TIMEOUT_MS,
  ) {}

  handleDetected(beacon: BeaconDetectedEvent): void {
    const key = beacon.address || beacon.name;
    const tracked = this.beacons.get(key);

    if (tracked) {
      clearTimeout(tracked.timeout);
      tracked.beacon = beacon;
      tracked.timeout = this.scheduleExit(key);
      return;
    }

    this.beacons.set(key, {
      beacon,
      timeout: this.scheduleExit(key),
    });
    this.callbacks.onEnter(beacon);
  }

  dispose(): void {
    for (const tracked of this.beacons.values()) {
      clearTimeout(tracked.timeout);
    }
    this.beacons.clear();
  }

  private scheduleExit(key: string): ReturnType<typeof setTimeout> {
    return setTimeout(() => {
      const tracked = this.beacons.get(key);
      if (!tracked) {
        return;
      }

      this.beacons.delete(key);
      this.callbacks.onExit(tracked.beacon);
    }, this.lostTimeoutMs);
  }
}
