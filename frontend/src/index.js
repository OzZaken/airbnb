import React, { memo, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'// import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ErrorBoundary from './cmps/error-boundary'

// Lazy load the App component
const App = lazy(() => import('./root-cmp')) // import App from './root-cmp'

// Memoize the ErrorBoundary component
const MemoizedErrorBoundary = memo(ErrorBoundary)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MemoizedErrorBoundary>
          <Suspense fallback={<div className='app-loading'>first Loading app</div>}>
            <App />
          </Suspense>
        </MemoizedErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>
)