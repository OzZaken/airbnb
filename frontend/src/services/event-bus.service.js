export const eventBusService = { on, emit }

export function showUserMsg(txt, type = 'info') {
    eventBusService.emit('show-user-msg', { txt, type })
}

export function showSuccessMsg(txt) {
    showUserMsg(txt, 'success')
}

export function showErrorMsg(txt) {
    showUserMsg(txt, 'danger')
}

export function showWarnMsg(txt) {
    showUserMsg(txt, 'warn')
}

function on(eventName, listener) {
    const callListener = ({ detail }) => { listener(detail) }

    window.addEventListener(eventName, callListener)

    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}
window.gDebugEvBus = eventBusService
window.gDebugUserMsg = {
    showSuccessMsg,
    showUserMsg,
    showErrorMsg,
    showWarnMsg
}