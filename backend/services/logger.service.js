const fs = require('fs')

const logsDir = './logs'
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

module.exports = {
    debug(...args) {
        // if (process.env.NODE_NEV === 'production') return
        doLog('DEBUG', ...args)
    },
    
    info(...args) {doLog('INFO', ...args)},

    warn(...args) {doLog('WARN', ...args)},

    error(...args) {doLog('ERROR', ...args)}
}

function doLog(level, ...args) {
    const strs = args.map(arg => (typeof arg === 'string') ? arg : JSON.stringify(arg))
    var line = strs.join(' | ')
    line = `${_getTime()} - ${level} - ${line}\n`
    console.log(line)
    fs.appendFileSync('./logs/backend.log', line)
}

function _getTime() {
    let now = new Date()
    return now.toLocaleString()
}