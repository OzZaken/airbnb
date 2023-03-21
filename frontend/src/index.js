import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './root-cmp'
import { ErrorBoundary } from './cmps/error-boundary'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <Router>
      <ErrorBoundary>
      <App />
      </ErrorBoundary>
    </Router>
  </Provider>
)

window.onerror = (message, source, line, column, error) => {
  console.log({
    message,
    source,
    line,
    column,
    stack: error.stack
  })
}

// Create a new logger instance
// const logger = new Logger({
//   logDirectory: './logs',
//   logFilename: 'frontend.log',
//   logToConsole: true,
//   logLevel: 'debug'
// })

// Add a transport to log to file
// logger.transports.push(async (lvl, msg) => {
//   const logFilePath = path.join(logger.logDirectory, logger.logFilename)
//   const logLine = `${new Date().toISOString()} [${lvl.toUpperCase()}] ${msg}\n`

//   try {
//     await fs.promises.appendFile(logFilePath, logLine)
//   } catch (error) {
//     console.log(`Failed to write to log file: ${error.message}`)
//     logger._logToFile('error', error.message)
//   }
// })

// Catch unhandled errors and log them to file
// window.onerror = (message, source, line, column, error)=> {
//   logger.error({
//     message,
//     source,
//     line,
//     column,
//     stack: error.stack
//   })
// }

reportWebVitals(App)