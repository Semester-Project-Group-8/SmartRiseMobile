package expo.modules.beaconscanner

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.bluetooth.BluetoothManager
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanFilter
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat

class BeaconScanService : Service() {
    private var scanCallback: ScanCallback? = null
    private val trackedBeacons = mutableMapOf<String, TrackedBeacon>()
    private val handler = android.os.Handler(android.os.Looper.getMainLooper())
    private val expireBeaconsRunnable = object : Runnable {
        override fun run() {
            expireBeacons()
            handler.postDelayed(this, BEACON_LOST_TIMEOUT_MS)
        }
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        startForeground(NOTIFICATION_ID, buildNotification())
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == ACTION_STOP) {
            stopScanning()
            stopSelf()
            return START_NOT_STICKY
        }

        startScanning()
        return START_STICKY
    }

    override fun onDestroy() {
        stopScanning()
        handler.removeCallbacks(expireBeaconsRunnable)
        trackedBeacons.clear()
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun startScanning() {
        if (scanCallback != null) {
            return
        }

        if (!hasBluetoothPermission()) {
            Log.e(TAG, "Bluetooth scan permission is not granted.")
            stopSelf()
            return
        }

        val scanner = getSystemService(BluetoothManager::class.java)
            ?.adapter
            ?.bluetoothLeScanner

        if (scanner == null) {
            Log.e(TAG, "BLE scanner is unavailable.")
            stopSelf()
            return
        }

        val filter = ScanFilter.Builder()
            .setDeviceName("SmartRise")
            .build()
        val settings = ScanSettings.Builder()
            .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
            .build()
        val callback = object : ScanCallback() {
            override fun onScanResult(callbackType: Int, result: ScanResult) {
                handleBeaconDetected(result)
            }

            override fun onScanFailed(errorCode: Int) {
                Log.e(TAG, "BLE scan failed with error code $errorCode.")
                BeaconEventBus.emit(
                    "scanError",
                    mapOf("errorCode" to errorCode),
                )
            }
        }

        try {
            scanner.startScan(listOf(filter), settings, callback)
            scanCallback = callback
            handler.post(expireBeaconsRunnable)
        } catch (error: SecurityException) {
            Log.e(TAG, "BLE scan permission was rejected.", error)
            stopSelf()
        }
    }

    private fun stopScanning() {
        handler.removeCallbacks(expireBeaconsRunnable)
        val callback = scanCallback
        if (callback != null && hasBluetoothPermission()) {
            getSystemService(BluetoothManager::class.java)
                ?.adapter
                ?.bluetoothLeScanner
                ?.stopScan(callback)
        }
        scanCallback = null
        trackedBeacons.clear()
    }

    private fun handleBeaconDetected(result: ScanResult) {
        val address = result.device.address
        val now = System.currentTimeMillis()
        val trackedBeacon = trackedBeacons[address]

        if (trackedBeacon == null) {
            Log.d(TAG, "SmartRise entered range: $address, RSSI ${result.rssi}")
            val beacon = TrackedBeacon(
                name = result.device.name ?: "SmartRise",
                address = address,
                rssi = result.rssi,
                lastSeenAt = now,
            )
            trackedBeacons[address] = beacon
            BeaconEventBus.emit(
                "beaconEntered",
                beacon.toEvent(),
            )
        } else {
            trackedBeacon.lastSeenAt = now
            trackedBeacon.rssi = result.rssi
        }
    }

    private fun expireBeacons() {
        val cutoff = System.currentTimeMillis() - BEACON_LOST_TIMEOUT_MS
        val iterator = trackedBeacons.iterator()

        while (iterator.hasNext()) {
            val (_, beacon) = iterator.next()
            if (beacon.lastSeenAt < cutoff) {
                Log.d(TAG, "SmartRise left range: ${beacon.address}")
                iterator.remove()
                BeaconEventBus.emit("beaconExited", beacon.toEvent())
            }
        }
    }

    private fun hasBluetoothPermission(): Boolean {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.S ||
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.BLUETOOTH_SCAN,
            ) == PackageManager.PERMISSION_GRANTED
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Beacon scanning",
                NotificationManager.IMPORTANCE_LOW,
            )
            getSystemService(NotificationManager::class.java)
                ?.createNotificationChannel(channel)
        }
    }

    private fun buildNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Beacon scanning active")
            .setContentText("SmartRise is looking for nearby beacons.")
            .setSmallIcon(android.R.drawable.stat_sys_data_bluetooth)
            .setOngoing(true)
            .build()
    }

    private data class TrackedBeacon(
        val name: String,
        val address: String,
        var rssi: Int,
        var lastSeenAt: Long,
    ) {
        fun toEvent(): Map<String, Any> = mapOf(
            "name" to name,
            "address" to address,
            "rssi" to rssi,
        )
    }

    companion object {
        const val ACTION_START = "expo.modules.beaconscanner.action.START"
        const val ACTION_STOP = "expo.modules.beaconscanner.action.STOP"
        private const val CHANNEL_ID = "beacon_scanning"
        private const val NOTIFICATION_ID = 1001
        private const val TAG = "BeaconScanService"
        private const val BEACON_LOST_TIMEOUT_MS = 5000L
    }
}
