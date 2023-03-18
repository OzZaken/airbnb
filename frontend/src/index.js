import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { utilService } from './services/util.service'
import { store } from './store/store'
import App from './root-cmp'
// import { ErrorBoundary } from './cmps/system/error-boundary'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <Router>
      {/* <ErrorBoundary> */}
        <App />
      {/* </ErrorBoundary> */}
    </Router>
  </Provider>
)

// Create a new logger instance
// const logger = new Logger({
//   logDirectory: './logs',
//   logFilename: 'frontend.log',
//   logToConsole: true,
//   logLevel: 'debug'
// })

// // Add a transport to log to file
// logger.transports.push(async (lvl, msg) => {
//   const logFilePath = path.join(logger.logDirectory, logger.logFilename)
//   const logLine = `${new Date().toISOString()} [${lvl.toUpperCase()}] ${msg}\n`

//   try {
//     await fs.promises.appendFile(logFilePath, logLine)
//   } catch (error) {
//     console.error(`Failed to write to log file: ${error.message}`)
//     logger._logToFile('error', error.message)
//   }
// })

// // Catch unhandled errors and log them to file
// window.onerror = (message, source, line, column, error)=> {
//   logger.error({
//     message,
//     source,
//     line,
//     column,
//     stack: error.stack
//   })
// }
window.onerror = (message, source, line, column, error)=> {
  console.log({
    message,
    source,
    line,
    column,
    stack: error.stack
  })
}

// window.onerror = (err) => {
//   const { location, navigator } = window
//   const { userAgent, platform, hardwareConcurrency, cookieEnabled, deviceMemory, connection, } = navigator
  
//   const errorToSend = {
//     at: new Date(),
//     env: process.env,
//     errorMsg: err,
//     location,
//     navigator: {
//       userAgent,
//       platform,
//       hardwareConcurrency,
//       cookieEnabled,
//       deviceMemory,
//       connection,
//     },
//     DateTimeFormat: { ...Intl.DateTimeFormat().resolvedOptions() },
//     localStorage: { ...localStorage },
//     sessionStorage: { ...sessionStorage }
//   }
//   console.log(`🚀 ~ errorToSend:`, errorToSend)
// }

reportWebVitals(App)