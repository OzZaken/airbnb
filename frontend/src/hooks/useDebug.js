import { useEffect, useRef } from "react"
import { showUserMsg } from "../services/event-bus.service"

export const useDebug = (cmpName,cmp) => {
    const isFirst = useRef(true)

    useEffect(() => {
        console.log(`%c ${JSON.stringify(cmpName)} MOUNT`,'color: yellow;')
        if (isFirst.current) {
            showUserMsg(`${JSON.stringify(cmpName)} FIRST MOUNT`)
            console.log(`%c ${JSON.stringify(cmpName)} FIRST MOUNT`,'color: green;')
            isFirst.current = false
            return
        }

        return () => {
            console.log(`${JSON.stringify(cmpName)} UNMOUNT`,'color: red;')
        }
    }, [])
}