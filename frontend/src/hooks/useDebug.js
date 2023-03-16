import { useEffect, useRef } from "react"
import { showUserMsg } from "../services/event-bus.service"

export const useDebug = (cmpName, props) => {
    console.log(`useDebug ${cmpName} ~ props:`, props)
    const isFirstRender = useRef(true)
    
    const renderCount = useRef(0)

    useEffect(() => {
        console.count(` ${cmpName} MOUNT  ${renderCount.current}`, 'color: green;')
        renderCount.current = renderCount.current + 1
        
        if (isFirstRender.current) {
            console.log(`%c ${cmpName} FIRST MOUNT`, 'color: yellowgreen;')
            isFirstRender.current = false
            return
        }

        return () => {
            console.log(`%c ${cmpName} UNMOUNT`, 'color: yellowgreen;')
            console.count(` ${cmpName} UNMOUNT ${renderCount.current}`, 'color: green;')
        }
    }, [])
}