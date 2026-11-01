# SmartRiseMobile

## Pico W iBeacon

The app is configured to scan for the Pico W iBeacon on iOS:

- UUID: `12345678-1234-5678-1234-56789ABCDEF0`
- Major: `1`
- Minor: `1`

The scanner implementation is in
`src/services/ibeaconScanner.ts`. It requires an iOS development build; it
does not run in Expo Go. Build and test it on a physical iPhone from macOS
with:

```bash
npx expo run:ios --device
npx expo start --dev-client
```