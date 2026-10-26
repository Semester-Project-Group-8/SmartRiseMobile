package sdu.vectrex.ibeacon

import android.Manifest
import android.app.PendingIntent
import android.bluetooth.BluetoothManager
import android.bluetooth.le.ScanFilter
import android.bluetooth.le.ScanSettings
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build

internal object IBeaconScanManager {
    private const val REQUEST_CODE = 1

    fun start(context: Context, uuidFilter: String? = null
    ): Int {
        checkScanPermission(context)

        val manager = context.getSystemService(
            Context.BLUETOOTH_SERVICE
        ) as BluetoothManager

        val adapter = manager.adapter ?: error("Bluetooth is unsupported")

        check(adapter.isEnabled){
            "Bluetooth is disabled"
        }

        val scanner = adapter.bluetoothLeScanner ?: error("BLE scanner is unavailable")

        val filter = ScanFilter.Builder()
            .setManufacturerData(
                IBeaconParser.APPLE_MANUFACTURER_ID,
                byteArrayOf(0x02, 0x15),
                byteArrayOf(0xFF.toByte(), 0xFF.toByte()
                )
            ).build()
        val settings = ScanSettings.Builder()
            .setScanMode(ScanSettings.SCAN_MODE_LOW_POWER)
            .setCallbackType(
                ScanSettings.CALLBACK_TYPE_ALL_MATCHES
            )
            .setReportDelay(0L)
            .build()

        val result = scanner.startScan(
            listOf(filter),
            settings,
            getScanPendingIntent(context)
        )

        if (result == 0){
            IBeaconStore.setScanConfiguration(
                context = context,
                enabled = true,
                uuid = uuidFilter
            )
        }

        return result
    }

    fun stop(context: Context) {
        checkScanPermission(context)

        val manager = context.getSystemService(
            Context.BLUETOOTH_SERVICE
        ) as BluetoothManager

        manager.adapter
            ?.bluetoothLeScanner
            ?.stopScan(getScanPendingIntent(context))

        IBeaconStore.setScanConfiguration(
            context = context,
            enabled = false,
            uuid = null
        )
    }

    fun restoreIfEnabled(context: Context){
        if (!IBeaconStore.isScanEnabled(context)){
            return
        }

        try {
            start(
                context = context,
                uuidFilter = IBeaconStore.getUuidFilter(context)
            )
        } catch (_: Exception) {

        }
    }

    private fun getScanPendingIntent(context: Context): PendingIntent{
        val intent = Intent(
            context,
            IBeaconScanReceiver::class.java
        ).apply {
            action = IBeaconScanReceiver.ACTION_SCAN_RESULT
        }

        val flags = PendingIntent.FLAG_UPDATE_CURRENT or
                if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.S){
                    PendingIntent.FLAG_MUTABLE
                } else {
                    0
                }

        return PendingIntent.getBroadcast(
            context,
            REQUEST_CODE,
            intent,
            flags
        )
    }

    private fun checkScanPermission(context: Context) {
        val permission =
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S){
                Manifest.permission.BLUETOOTH_SCAN
            } else {
                Manifest.permission.ACCESS_FINE_LOCATION
            }
        if (context.checkSelfPermission(permission) !=
            PackageManager.PERMISSION_GRANTED){
            throw SecurityException(
                "BLE scan permission has not been granted"
            )
        }
    }
}