import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { utilService } from './services/util.service'
import { store } from './store/store'
import App from './root-cmp'
import { ErrorBoundary } from './cmps/system/error-boundary'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  </Provider>
  // </React.StrictMode>
)
// debug
window.onerror = (err) => {
  const { location, document, navigator } = window
  const { userAgent, platform, hardwareConcurrency, cookieEnabled, deviceMemory, connection, } = navigator
  
  const errorToSend = {
    at: new Date(),
    env: process.env,
    errorMsg: err,
    location,
    document,
    navigator: {
      userAgent,
      platform,
      hardwareConcurrency,
      cookieEnabled,
      deviceMemory,
      connection,
    },
    DateTimeFormat: { ...Intl.DateTimeFormat().resolvedOptions() },
    localStorage: { ...localStorage },
    sessionStorage: { ...sessionStorage }
  }
  console.log(`🚀 ~ errorToSend:`, errorToSend)
}
reportWebVitals(App)