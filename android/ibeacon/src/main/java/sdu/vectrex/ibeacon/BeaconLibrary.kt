package sdu.vectrex.ibeacon

import android.content.Context

object BackgroundIBeacon {

    /**
     * Registers the Android BLE scan.
     *
     * @return 0 when Android accepted the scan registration.
     */
    fun start(
        context: Context,
        uuidFilter: String? = null
    ): Int {
        return IBeaconScanManager.start(
            context = context.applicationContext,
            uuidFilter = uuidFilter
        )
    }

    /**
     * Cancels the registered background scan.
     */
    fun stop(context: Context) {
        IBeaconScanManager.stop(
            context.applicationContext
        )
    }

    /**
     * Indicates whether the user previously enabled scanning.
     *
     * This describes the saved configuration, not a guarantee that
     * Bluetooth is currently enabled or that Android is actively scanning.
     */
    fun isEnabled(context: Context): Boolean {
        return IBeaconStore.isScanEnabled(
            context.applicationContext
        )
    }

    /**
     * Returns stored detection objects as a JSON array.
     */
    fun getDetections(context: Context): String {
        return IBeaconStore.getDetections(
            context.applicationContext
        )
    }

    /**
     * Deletes stored detection records.
     */
    fun clearDetections(context: Context) {
        IBeaconStore.clearDetections(
            context.applicationContext
        )
    }
}