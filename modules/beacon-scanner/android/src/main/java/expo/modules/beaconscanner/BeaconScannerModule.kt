package expo.modules.beaconscanner

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Intent
import androidx.core.content.ContextCompat

class BeaconScannerModule : Module() {

    override fun definition() = ModuleDefinition {
        Name("BeaconScanner")

        Events("beaconEntered", "beaconExited", "scanError")

        Function("startBackgroundScanning") {
            val context = appContext.reactContext
                ?: throw IllegalStateException("Android context is unavailable.")
            val intent = Intent(context, BeaconScanService::class.java).apply {
                action = BeaconScanService.ACTION_START
            }

            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                ContextCompat.startForegroundService(context, intent)
            } else {
                context.startService(intent)
            }
        }

        Function("stopBackgroundScanning") {
            val context = appContext.reactContext
                ?: throw IllegalStateException("Android context is unavailable.")
            val intent = Intent(context, BeaconScanService::class.java).apply {
                action = BeaconScanService.ACTION_STOP
            }
            context.startService(intent)
        }

        OnCreate {
            BeaconEventBus.addListener { eventName, event ->
                sendEvent(eventName, event)
            }
        }

        OnDestroy {
            BeaconEventBus.removeListener()
        }
    }
}