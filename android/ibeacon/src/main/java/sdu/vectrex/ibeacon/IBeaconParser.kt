package sdu.vectrex.ibeacon

import android.bluetooth.le.ScanResult
import java.util.Locale

internal object IBeaconParser { // object = singleton
    const val APPLE_MANUFACTURER_ID = 0x004c

    fun parse(result: ScanResult): IBeacon? {
        val manufacturerData = result.scanRecord
            ?.getManufacturerSpecificData(APPLE_MANUFACTURER_ID)
            ?: return null
        if (manufacturerData.size < 23) {
            return null
        }

        val beaconType =
            manufacturerData[0].toInt() and 0xFF // 0xFF converts usigned to signed byte
        val beaconLength = manufacturerData[1].toInt() and 0xFF

        if (beaconType != 0x02 || beaconLength != 0x15) {
            return null
        }

        val uuidBytes = manufacturerData.copyOfRange(2, 18)

        val uuid = formatUuid(uuidBytes)

        // converting 2x8 bit into 16 bit
        val major = ((manufacturerData[18].toInt() and 0xFF) shl 8) or
                (manufacturerData[19].toInt() and 0xFF)

        val minor = ((manufacturerData[20].toInt() and 0xFF) shl 8) or
                (manufacturerData[21].toInt() and 0xFF)

        val txPower = manufacturerData[22].toInt()

        return IBeacon(
            uuid = uuid,
            major = major,
            minor = minor,
            txPower = txPower,
            rssi = result.rssi,
            detectedAt = System.currentTimeMillis()
        )
    }

    private fun formatUuid(bytes: ByteArray): String {
        val hex = bytes.joinToString("") {
            String.format(
                Locale.getDefault(),
                "%02x", // fill with zeros, min 2 character, lowercase hex
                it.toInt() and 0xFF // it = automatically generated current item
            )
        }

        return buildString {
            append(hex.substring(0, 8))
            append("-")
            append(hex.substring(8, 12))
            append("-")
            append(hex.substring(12, 16))
            append("-")
            append(hex.substring(16, 20))
            append("-")
            append(hex.substring(20, 32))
        }
    }
}