const cors = require('cors')
const express = require('express')
const path = require('path')/* serve static files (on production environment)*/
const app = express()
const http = require('http').createServer(app)
const port = process.env.PORT || 3030
const cookieParser = require('cookie-parser')/* allows you to access cookies */
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')/* ALS */
const { setupSocketAPI } = require('./services/socket.service')/* sockets */
const logger = require('./services/logger.service')/* logger */

// Configuring CORS Make sure origin contains the url frontend is running on
const corsConfig = {
    origin: [
        'http://127.0.0.1:5173',
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://localhost:3001',
    ],
    credentials: true
}

/* Routes */
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const stayRoutes = require('./api/stay/stay.routes')
const orderRoutes = require('./api/order/order.routes')
const reviewRoutes = require('./api/review/review.routes')
setupSocketAPI(http)


app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') app.use(express.static(path.resolve(__dirname, 'public')))
else app.use(cors(corsConfig))

/*  ignore favicon missing */
app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/stay', stayRoutes)
app.use('/api/order', orderRoutes)

// return home when not find
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.all('*', setupAsyncLocalStorage)

// const ANSI_COLOR_BLUE = '\x1b[34m'
const ANSI_COLOR_RESET = '\x1b[0m'
const ANSI_COLOR_GREEN = '\x1b[32m'

http.listen(port, () => {
    logger.info('Server listening at port %d', port)
    console.log(`Server listening at port: ${ANSI_COLOR_GREEN}${port}${ANSI_COLOR_RESET}`)
})