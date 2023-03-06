import { useEffect } from "react"
import { useLocation } from "react-router"

export default function ScrollToTop(props) {
  const location = useLocation()

  useEffect(() => {
    // Check for anchor in URL
    if (location.hash) {
      const anchor = document.querySelector(location.hash)
      if (anchor) {
        // Scroll to anchor if it exists
        anchor.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Otherwise, scroll to top
      window.scrollTo(0, 0)
    }
  }, [location])

  return <>{props.children}</>
}