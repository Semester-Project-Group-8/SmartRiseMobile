package sdu.vectrex.ibeacon

data class IBeacon (
    val uuid: String,
    val major: Int,
    val minor: Int,
    val txPower: Int,
    val rssi: Int,
    val detectedAt: Long
)