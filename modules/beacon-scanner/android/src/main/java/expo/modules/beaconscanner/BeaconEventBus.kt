package expo.modules.beaconscanner

object BeaconEventBus {
    private var listener: ((String, Map<String, Any>) -> Unit)? = null

    fun addListener(listener: (String, Map<String, Any>) -> Unit) {
        this.listener = listener
    }

    fun removeListener() {
        listener = null
    }

    fun emit(eventName: String, event: Map<String, Any>) {
        listener?.invoke(eventName, event)
    }
}
