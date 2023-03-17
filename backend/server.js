/* express, http*/
const express = require('express')
const app = express()
const http = require('http').createServer(app)

/* cookie-parser*/
const cookieParser = require('cookie-parser')
app.use(cookieParser())

/* config use json*/
app.use(express.json())

/* path, cors*/
const path = require('path')
const cors = require('cors')

/* Express serve static files on production environment*/
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} 
else { /* Configuring CORS on development */
/* Make sure origin contains the url frontend is running on*/
const corsOptions = {
        origin: [
            'http://127.0.0.1:5173',
            'http://127.0.0.1:8080',
            'http://localhost:8080',
            'http://127.0.0.1:3000',
            'http://localhost:3000'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

/* Async Local Storage */
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

/* Routes */
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const stayRoutes = require('./api/stay/stay.routes')
const orderRoutes = require('./api/order/order.routes')
const reviewRoutes = require('./api/review/review.routes')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/stay', stayRoutes)
app.use('/api/order', orderRoutes)

app.get('/**', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

/* Web Socket */
const { setupSocketAPI } = require('./services/socket.service')
setupSocketAPI(http)

/* Logs */
const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => logger.info('Server is running on port: ' + port))