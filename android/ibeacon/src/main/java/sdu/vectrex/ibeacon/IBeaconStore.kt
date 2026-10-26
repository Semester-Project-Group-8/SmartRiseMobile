package sdu.vectrex.ibeacon

import android.content.Context
import androidx.core.content.edit
import org.json.JSONArray
import org.json.JSONObject

internal object IBeaconStore {

    private const val PREFERENCES_NAME = "test"
    private const val KEY_SCAN_ENABLED = "scan_enabled"
    private const val KEY_UUID_FILTER = "uuid_filter"
    private const val KEY_DETECTIONS = "detections"
    private const val MAX_DETECTIONS = 100

    fun setScanConfiguration(
        context: Context,
        enabled: Boolean,
        uuid: String?
    ) {
        context.getSharedPreferences(
            PREFERENCES_NAME,
            Context.MODE_PRIVATE
        ).edit {
            putBoolean(KEY_SCAN_ENABLED, enabled)
                .apply {
                    if (uuid.isNullOrBlank()) {
                        remove(KEY_UUID_FILTER)
                    } else {
                        putString(
                            KEY_UUID_FILTER,
                            normalizeUuid(uuid)
                        )
                    }
                }
        }
    }

    fun isScanEnabled(context: Context): Boolean {
        return context.getSharedPreferences(
            PREFERENCES_NAME,
            Context.MODE_PRIVATE
        ).getBoolean(KEY_SCAN_ENABLED, false)
    }

    fun getUuidFilter(context: Context): String? {
        return context.getSharedPreferences(
            PREFERENCES_NAME,
            Context.MODE_PRIVATE
        ).getString(KEY_UUID_FILTER, null)
    }

    fun matchesFilter(
        context: Context,
        beacon: IBeacon
    ): Boolean {
        val requiredUuid = getUuidFilter(context) ?: return true

        return normalizeUuid(beacon.uuid) == requiredUuid
    }

    fun saveDetection(
        context: Context,
        beacon: IBeacon
    ) {
        val preferences = context.getSharedPreferences(
            PREFERENCES_NAME,
            Context.MODE_PRIVATE
        )

        val existing = try {
            JSONArray(
                preferences.getString(
                    KEY_DETECTIONS,
                    "[]"
                )
            )
        } catch (_: Exception) {
            JSONArray()
        }

        val detection = JSONObject().apply {
            put("uuid", beacon.uuid)
            put("major", beacon.major)
            put("minor", beacon.minor)
            put("txPower", beacon.txPower)
            put("rssi", beacon.rssi)
            put("detectedAt", beacon.detectedAt)
        }

        val updated = JSONArray()
        updated.put(detection)

        val oldItemsToKeep = minOf(
            existing.length(),
            MAX_DETECTIONS - 1
        )

        for (index in 0 until oldItemsToKeep) {
            updated.put(existing.get(index))
        }

        preferences.edit {
            putString(KEY_DETECTIONS, updated.toString())
        }


    }

    fun getDetections(context: Context): String {
        return context.getSharedPreferences(
            PREFERENCES_NAME,
            Context.MODE_PRIVATE
        ).getString(KEY_DETECTIONS, "[]") ?: "[]"
    }

    fun clearDetections(context: Context) {
        context.getSharedPreferences(
            PREFERENCES_NAME,
            Context.MODE_PRIVATE
        ).edit {
            putString(KEY_DETECTIONS, "[]")
        }
    }

    private fun normalizeUuid(uuid: String): String {
        return uuid
            .trim()
            .removePrefix("{")
            .removeSuffix("}")
            .lowercase()
    }
}