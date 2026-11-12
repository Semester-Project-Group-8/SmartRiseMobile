package expo.modules.beaconscanner

import android.content.Context
import android.util.Log
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.Executors

/**
 * Sends beacon enter/exit events to the backend from native code, so reporting
 * keeps working after the app is swiped away and JavaScript is no longer running.
 *
 * The URL and token are saved in SharedPreferences (set from JS when scanning
 * starts) so they survive the service being restarted by Android.
 */
class BeaconReporter(context: Context) {
    private val prefs = context.applicationContext
        .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    // One background thread: network calls must not run on the main thread,
    // and a single thread keeps entered/exited events in order.
    private val executor = Executors.newSingleThreadExecutor()

    fun report(event: String, name: String, address: String, rssi: Int) {
        val reportUrl = prefs.getString(KEY_REPORT_URL, null)
        val authToken = prefs.getString(KEY_AUTH_TOKEN, null)

        val body = JSONObject()
            .put("event", event)
            .put("beaconName", name)
            .put("beaconAddress", address)
            .put("rssi", rssi)
            .put("timestamp", System.currentTimeMillis())
            .toString()

        if (reportUrl.isNullOrBlank()) {
            Log.d(TAG, "No report URL configured, not sending: $body")
            return
        }

        executor.execute {
            var connection: HttpURLConnection? = null
            try {
                connection = (URL(reportUrl).openConnection() as HttpURLConnection).apply {
                    requestMethod = "POST"
                    connectTimeout = TIMEOUT_MS
                    readTimeout = TIMEOUT_MS
                    doOutput = true
                    setRequestProperty("Content-Type", "application/json")
                    if (!authToken.isNullOrBlank()) {
                        setRequestProperty("Authorization", "Bearer $authToken")
                    }
                }
                connection.outputStream.use { it.write(body.toByteArray(Charsets.UTF_8)) }

                val status = connection.responseCode
                if (status in 200..299) {
                    Log.d(TAG, "Reported $event for $address (HTTP $status)")
                } else {
                    Log.w(TAG, "Backend rejected $event for $address (HTTP $status)")
                }
            } catch (error: Exception) {
                Log.e(TAG, "Failed to report $event for $address", error)
            } finally {
                connection?.disconnect()
            }
        }
    }

    fun shutdown() {
        executor.shutdown()
    }

    companion object {
        private const val TAG = "BeaconReporter"
        private const val PREFS_NAME = "beacon_scanner"
        private const val KEY_REPORT_URL = "reportUrl"
        private const val KEY_AUTH_TOKEN = "authToken"
        private const val TIMEOUT_MS = 10_000

        fun saveConfig(context: Context, reportUrl: String?, authToken: String?) {
            context.applicationContext
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
                .edit()
                .putString(KEY_REPORT_URL, reportUrl)
                .putString(KEY_AUTH_TOKEN, authToken)
                .apply()
        }

        fun clearConfig(context: Context) {
            context.applicationContext
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
                .edit()
                .clear()
                .apply()
        }
    }
}
