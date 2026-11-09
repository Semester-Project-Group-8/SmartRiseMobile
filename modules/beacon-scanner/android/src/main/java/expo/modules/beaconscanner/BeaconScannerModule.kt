package expo.modules.beaconscanner

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.bluetooth.BluetoothLeScanner
import android.bluetooth.BluetoothManager
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanFilter
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat

class BeaconScannerModule : Module() {

    private var scanner: BluetoothLeScanner? = null
    private var scanCallback: ScanCallback? = null
    private var isScanning = false

    override fun definition() = ModuleDefinition {
        Name("BeaconScanner")

        Events("beaconDetected", "scanError")

        Function("startScanning") {
            if (isScanning) {
                return@Function
            }

            val context = appContext.reactContext
                ?: throw IllegalStateException("Android context is unavailable.")

            val bluetoothManager =
                context.getSystemService(Context.BLUETOOTH_SERVICE) as? BluetoothManager
                    ?: throw IllegalStateException("Bluetooth is unavailable.")

            val bluetoothAdapter = bluetoothManager.adapter
                ?: throw IllegalStateException("Bluetooth is unavailable.")

            if (!bluetoothAdapter.isEnabled) {
                throw IllegalStateException("Bluetooth is disabled.")
            }

            val bluetoothScanner = bluetoothAdapter.bluetoothLeScanner
                ?: throw IllegalStateException("BLE scanning is unavailable.")

            val filter = ScanFilter.Builder()
                .setDeviceName("SmartRise")
                .build()

            val settings = ScanSettings.Builder()
                .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
                .build()

            val callback = object : ScanCallback() {
                override fun onScanResult(callbackType: Int, result: ScanResult) {
                    sendEvent(
                        "beaconDetected",
                        mapOf(
                            "name" to (result.device.name ?: "SmartRise"),
                            "address" to result.device.address,
                            "rssi" to result.rssi,
                        ),
                    )
                }

                override fun onScanFailed(errorCode: Int) {
                    sendEvent(
                        "scanError",
                        mapOf("errorCode" to errorCode),
                    )
                }
            }

            scanner = bluetoothScanner
            scanCallback = callback

            try {
                bluetoothScanner.startScan(
                    listOf(filter),
                    settings,
                    callback,
                )

                isScanning = true
            } catch (error: SecurityException) {
                scanner = null
                scanCallback = null
                isScanning = false
                throw error
            } catch (error: RuntimeException) {
                scanner = null
                scanCallback = null
                isScanning = false
                throw error
            }
        }

        Function("stopScanning") {
            val activeScanner = scanner
            val activeCallback = scanCallback

            if (activeScanner != null && activeCallback != null) {
                activeScanner.stopScan(activeCallback)
            }

            scanner = null
            scanCallback = null
            isScanning = false
        }

        Function("startBackgroundScanning") {
            val context = appContext.reactContext
                ?: throw IllegalStateException("Android context is unavailable.")
            val intent = Intent(context, BeaconScanService::class.java).apply {
                action = BeaconScanService.ACTION_START
            }

            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                ContextCompat.startForegroundService(context, intent)
            } else {
                context.startService(intent)
            }
        }

        Function("stopBackgroundScanning") {
            val context = appContext.reactContext
                ?: throw IllegalStateException("Android context is unavailable.")
            val intent = Intent(context, BeaconScanService::class.java).apply {
                action = BeaconScanService.ACTION_STOP
            }
            context.startService(intent)
        }
    }
}