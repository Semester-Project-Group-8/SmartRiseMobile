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
                Log.d(
                    TAG,
                    "SmartRise detected: ${result.device.address}, RSSI ${result.rssi}",
                )
            }

            override fun onScanFailed(errorCode: Int) {
                Log.e(TAG, "BLE scan failed with error code $errorCode.")
            }
        }

        try {
            scanner.startScan(listOf(filter), settings, callback)
            scanCallback = callback
        } catch (error: SecurityException) {
            Log.e(TAG, "BLE scan permission was rejected.", error)
            stopSelf()
        }
    }

    private fun stopScanning() {
        val callback = scanCallback ?: return
        if (hasBluetoothPermission()) {
            getSystemService(BluetoothManager::class.java)
                ?.adapter
                ?.bluetoothLeScanner
                ?.stopScan(callback)
        }
        scanCallback = null
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

    companion object {
        const val ACTION_START = "expo.modules.beaconscanner.action.START"
        const val ACTION_STOP = "expo.modules.beaconscanner.action.STOP"
        private const val CHANNEL_ID = "beacon_scanning"
        private const val NOTIFICATION_ID = 1001
        private const val TAG = "BeaconScanService"
    }
}
