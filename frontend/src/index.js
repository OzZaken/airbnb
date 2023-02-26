import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import App from './root-cmp'
import { store } from './store/store'
// import reportWebVitals from './reportWebVitals'
// import { ErrorBoundary } from './cmps/error-boundary'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // <React.StrictMode>
  // <ErrorBoundary>

  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>

  //  </ErrorBoundary>
  // </React.StrictMode>
)

// Debug 
window.onerror = (e) => {
  // TODO: logger to frontend log with the state.stringify
  console.log(e)
  console.dir(e)
  console.error(e)
}

// reportWebVitals(App)