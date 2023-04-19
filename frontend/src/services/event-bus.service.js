// 1. defines an object `eventBusService` and exports it | import eventBusService from './event-bus-service'
// const eventBusService = { on, emit }
// export default eventBusService

// export default { on, emit } // 2. exports an anonymous object with on and emit functions | import eventBus from './event-bus-service'

export const eventBusService = { on, emit } // 3. exports an object named eventBusService | import { eventBusService } from './event-bus-service'.

function on(eventName, listener) {
    // Defines a callListener (arrow function) that takes an event object and calls the listener function with the event detail.
    const callListener = ({ detail }) => { listener(detail) }

    // Adds an event listener to the window object for the specified event name and executes the callListener function when the event occurs.
    window.addEventListener(eventName, callListener)

    //  returns a function that removes the event listener when called.
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}