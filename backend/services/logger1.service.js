const fs = require('fs')
const path = require('path')

// Default log directory and filename, can be overridden in options object.
const DEFAULT_LOG_DIRECTORY = './logs'
const DEFAULT_LOG_FILENAME = 'backend.log'

// Constructor function with configurable options for log directory, log filename, logging to console, and log level.
class Logger {
    constructor(options = {}) {
        // Destructure the options object, and set default values if they're not provided.
        const {
            logDirectory = DEFAULT_LOG_DIRECTORY,
            logFilename = DEFAULT_LOG_FILENAME,
            logToConsole = false,
            logLevel = 'debug', // Set default log level to 'debug'.
            errorServerUrl = null // option for error server URL (frontend)
        } = options

        // initialize error server URL
        this.errorServerUrl = errorServerUrl

        // Set instance variables for the log directory, file name, logging to console, and log level.
        this.logDirectory = logDirectory
        this.logFilename = logFilename
        this.logToConsole = logToConsole
        this.logLevel = logLevel

        // Create an array to hold the transports (e.g. file and console).
        this.transports = []

        // Create the log directory if it doesn't exist yet.
        if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory)

        // Set up the transports (e.g. file and console).
        this._setupTransports()
    }

    // Set up the transports based on the options passed to the constructor.
    _setupTransports() {
        if (this.logToConsole) {
            // If logging to console is enabled, add the _logToConsole function to the transports array.
            this.transports.push(this._logToConsole.bind(this))
        }

        // Add the _logToFile function to the transports array.
        this.transports.push(this._logToFile.bind(this))
    }

    // Log a message to the console.
    _logToConsole(level, message) {
        console.log(`[${level.toUpperCase()}] ${message}`)
    }
    // Log a message to the Server.
    async _logToErrorServer(level, message) {
        if (!this.errorServerUrl) {
            console.error('Error server URL not configured')
            return
        }

        const errorData = {
            level,
            message,
            timestamp: new Date().toISOString()
        }

        try {
            await axios.post(this.errorServerUrl, errorData)
        } catch (error) {
            console.error(`Failed to send error to server: ${error.message}`)
            this._logToFile('error', error.message)
        }
    }
    // Log a message to a file.
    async _logToFile(level, message) {
        const logFilePath = path.join(this.logDirectory, this.logFilename)
        const logLine = `${new Date().toISOString()} [${level.toUpperCase()}] ${message}\n`

        try {
            // Write the log line to the log file using the fs.promises.appendFile function.
            await fs.promises.appendFile(logFilePath, logLine)
        } catch (error) {
            // If there was an error writing to the log file, log the error to the console and the file.
            console.error(`Failed to write to log file: ${error.message}`)
            this._logToFile('error', error.message)
        }
    }

    // Log type message.
    debug(...args) {
        this._log('debug', ...args)
    }

    info(...args) {
        this._log('info', ...args)
    }

    warn(...args) {
        this._log('warn', ...args)
    }

    error(...args) {
        this._log('error', ...args)
    }

    // Log a message using all the transports (e.g. file and console). 
    async _log(level, ...args) {
        if (!this._shouldLog(level)) return

        // Convert all the arguments to strings and concatenate them with a separator (' | ').
        const message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' | ')

        // ensures that any logging errors are also recorded in the log file for future analysis.
        for (const transport of this.transports) {
            try {
                await transport(level, message)
            } catch (error) {
                console.error(`Failed to log to transport: ${error.message}`)
                this._logToFile('error', error.message)
            }
        }
    }

    _shouldLog(level) {
        const levels = ['debug', 'info', 'warn', 'error']
        return levels.indexOf(level) >= levels.indexOf(this.logLevel)
    }
}

module.exports = Logger
// debug
const logger = new Logger({
    logDirectory: './logs',
    logToConsole: true,
    logLevel: 'debug'
})

logger.debug('This is a debug message.')
logger.info('This is an info message.')
logger.warn('This is a warning message.')
logger.error('This is an error message.')
