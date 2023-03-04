import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import App from './root-cmp'
import { store } from './store/store'
import { ErrorBoundary } from './cmps/error-boundary'
import reportWebVitals from './reportWebVitals'

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
  // TODO: logger to frontend log with the state.stringify that include the userId and actions if have
  const errorToSend = {
    errorAt:Date.now(),
    err,
    machine:{
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency
    },
    DateTimeFormat: {
      ...Intl.DateTimeFormat().resolvedOptions(),
    },
    localStorage: { ...localStorage },
    sessionStorage: { ...sessionStorage }
  }
  console.log(`🚀 ~ errorToSend:`, errorToSend)
}

reportWebVitals(App)