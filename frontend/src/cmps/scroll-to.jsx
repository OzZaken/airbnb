import { useEffect } from "react"
import { useLocation } from "react-router"

/** A component that scrolls to the top of the page or to a specific anchor element
 * based on the current URL hash when the location changes.
 */

export default function ScrollTo(props) {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash

    // Check for anchor in URL
    if (hash) {
      const anchor = document.querySelector(hash)
      anchor?.scrollIntoView({ behavior: "smooth" })
    }
    
    // Otherwise, scroll to top
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }, [location])

  return <>{props.children}</>
}