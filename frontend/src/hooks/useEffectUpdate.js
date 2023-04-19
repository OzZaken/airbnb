import { useEffect, useRef } from "react"

const useEffectUpdate = (callBack, dependencies) => {

    const isFirst = useRef(true)

    useEffect(() => {
        // on the first render return
        if (isFirst.current) {
            isFirst.current = false
            return
        }

        callBack() // trigger a callback function when certain dependencies are updated.

    }, dependencies)// dependencies (an array of values) that the useEffect hook will monitor for changes.
}

export default useEffectUpdate