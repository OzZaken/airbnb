import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import App from './root-cmp'
import { store } from './store/store'
import { ErrorBoundary } from './cmps/error-boundary'
import reportWebVitals from './reportWebVitals'
import { utilService } from './services/util.service'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // <React.StrictMode>
  <ErrorBoundary>

    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>

  </ErrorBoundary>
  // </React.StrictMode>
)

window.onerror = (err) => {
  const { formatDate } = utilService
  const { location, document } = window
  const { userAgent, platform, hardwareConcurrency, cookieEnabled, deviceMemory, connection, } = navigator

  const errorToSend = {
    at: [formatDate(new Date()), Date.now()],
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