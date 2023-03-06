import {  useState } from "react"
import { useEffectUpdate } from "../../hooks/useEffectUpdate";

export const Counter = () => {
    const [count, setCount] = useState(0)
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffectUpdate(() => {
        document.title = count
    }, [count])

    const increment = () => {
        setCount(prevCount => prevCount + 1)
    }

    return (
        <div style={{ backgroundColor: isDarkMode ? '#999' : '#fff' }} className="counter">
            <p>You clicked {count} times</p>
            <button onClick={increment}>
                Click me
            </button>
            <button onClick={() => setIsDarkMode(prevIsDarkMode => !prevIsDarkMode)}>
                {isDarkMode ? '☀️' : '🌓'}
            </button>
        </div>
    );
}
