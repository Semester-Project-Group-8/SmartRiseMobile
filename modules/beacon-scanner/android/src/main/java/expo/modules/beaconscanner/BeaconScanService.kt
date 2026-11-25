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
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
import androidx.core.content.ContextCompat

class BeaconScanService : Service() {
    private var scanCallback: ScanCallback? = null
    private lateinit var reporter: BeaconReporter
    private val trackedBeacons = mutableMapOf<String, TrackedBeacon>()
    private val pendingFinalExits = mutableMapOf<String, PendingFinalExit>()
    private val handler = android.os.Handler(android.os.Looper.getMainLooper())
    private val expireBeaconsRunnable = object : Runnable {
        override fun run() {
            expireBeacons()
            handler.postDelayed(this, BEACON_LOST_TIMEOUT_MS)
        }
    }

    override fun onCreate() {
        super.onCreate()
        reporter = BeaconReporter(this)
        createNotificationChannel()
        try {
            ServiceCompat.startForeground(
                this,
                NOTIFICATION_ID,
                buildNotification(),
                foregroundServiceTypes(),
            )
        } catch (error: SecurityException) {
            Log.w(TAG, "Location FGS type not allowed, falling back.", error)
            ServiceCompat.startForeground(
                this,
                NOTIFICATION_ID,
                buildNotification(),
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ServiceInfo.FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE
                } else {
                    0
                },
            )
        }
    }

    private fun foregroundServiceTypes(): Int {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            return 0
        }
        var types = ServiceInfo.FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE
        val hasLocation = ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_FINE_LOCATION,
        ) == PackageManager.PERMISSION_GRANTED
        if (hasLocation) {
            types = types or ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION
        }
        return types
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
        reporter.shutdown()
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
        pendingFinalExits.clear()
    }

    private fun handleBeaconDetected(result: ScanResult) {
        val address = result.device.address
        val now = System.currentTimeMillis()
        val trackedBeacon = trackedBeacons[address]
        val pendingExit = pendingFinalExits.remove(address)
        
        if (trackedBeacon != null) {
            trackedBeacon.lastSeenAt = now
            trackedBeacon.rssi = result.rssi
            return
        }
        
        val beacon = if (pendingExit != null) {
            Log.d(TAG, "SmartRise returned before final exit: $address")
            TrackedBeacon(
                name = pendingExit.name,
                address = address,
                rssi = result.rssi,
                lastSeenAt = now,
            )
        } else {
            Log.d(TAG, "SmartRise entered range: $address, RSSI ${result.rssi}")
            TrackedBeacon(
                name = result.device.name ?: "SmartRise",
                address = address,
                rssi = result.rssi,
                lastSeenAt = now,
            )
        }
            trackedBeacons[address] = beacon
            
            if (pendingExit == null) {
                BeaconEventBus.emit(
                    "beaconEntered",
                    beacon.toEvent(),
                )
                reporter.report("entered", beacon.name, beacon.address, beacon.rssi)
            }
            updateNotification()
    }

    private fun expireBeacons() {
        val iterator = trackedBeacons.iterator()
        var changed = false
        val now = System.currentTimeMillis()
        val cutoff = now - BEACON_LOST_TIMEOUT_MS

        while (iterator.hasNext()) {
            val (address, beacon) = iterator.next()
            if (beacon.lastSeenAt < cutoff) {
                Log.d(TAG, "SmartRise left range: ${beacon.address}")
                iterator.remove()
                pendingFinalExits[address] = PendingFinalExit(
                    name = beacon.name,
                    address = beacon.address,
                    rssi = beacon.rssi,
                    leftAt = now,
                )
                changed = true
            }
        }
        val pendingIterator = pendingFinalExits.iterator()
        while (pendingIterator.hasNext()) {
            val (address, pendingExit) = pendingIterator.next()
            if (pendingExit.leftAt < now - BEACON_FINAL_EXIT_TIMEOUT_MS) {
                pendingIterator.remove()
                BeaconEventBus.emit("beaconExited", pendingExit.toEvent())
                reporter.report("exited", pendingExit.name, pendingExit.address, pendingExit.rssi)
                changed = true
            }
        }

        if (changed) {
            updateNotification()
        }
    }

    private fun updateNotification() {
        getSystemService(NotificationManager::class.java)
            ?.notify(NOTIFICATION_ID, buildNotification())
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
        val nearest = trackedBeacons.values.maxByOrNull { it.rssi }
        val text = if (nearest == null) {
            "SmartRise is looking for nearby beacons."
        } else {
            "Near ${nearest.name} (${nearest.address})"
        }
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Beacon scanning active")
            .setContentText(text)
            .setSmallIcon(android.R.drawable.stat_sys_data_bluetooth)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
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
    
    private data class PendingFinalExit(
        val name: String,
        val address: String,
        var rssi: Int,
        var leftAt: Long,
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
        private const val BEACON_FINAL_EXIT_TIMEOUT_MS = 60 * 60 * 1000L
    }
}
