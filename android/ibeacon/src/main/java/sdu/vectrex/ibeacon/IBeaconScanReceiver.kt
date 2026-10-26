package sdu.vectrex.ibeacon

import android.bluetooth.le.BluetoothLeScanner
import android.bluetooth.le.ScanResult
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log

class IBeaconScanReceiver: BroadcastReceiver() {
    companion object {
        const val ACTION_SCAN_RESULT = "sdu.vectrex.ibeacon.ACTION_SCAN_RESULT"

        private const val TAG = "IBeaconScanReceiver"
    }

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != ACTION_SCAN_RESULT){
            return
        }

        val errorCode = intent.getIntExtra(
            BluetoothLeScanner.EXTRA_ERROR_CODE,
            0
        )

        if (errorCode != 0){
            Log.e(
                TAG,
                "BLE scan failed with error code $errorCode"
            )
            return
        }

        val results = getScanResults(intent)

        results.forEach { result ->
            val beacon = IBeaconParser.parse(result)
                ?: return@forEach

            if (!IBeaconStore.matchesFilter(context, beacon)) {
                return@forEach
            }

            IBeaconStore.saveDetection(context, beacon)

            Log.d(
                TAG,
                "Detected ${beacon.uuid}," +
                "major = ${beacon.major}," +
                "minor = ${beacon.minor}," +
                "rssi = ${beacon.rssi}"
            )
        }
    }

    @Suppress("DEPRECATION")
    private fun getScanResults(
        intent: Intent
    ): List<ScanResult> {
        return if (Build.VERSION.SDK_INT >= 33) {
            intent.getParcelableArrayListExtra(
                BluetoothLeScanner.EXTRA_LIST_SCAN_RESULT,
                ScanResult::class.java
            ) ?: emptyList()
        } else {
            intent.getParcelableArrayListExtra(
                BluetoothLeScanner.EXTRA_LIST_SCAN_RESULT
            ) ?: emptyList()
        }
    }
}