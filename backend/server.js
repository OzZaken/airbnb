const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')

const app = express()
const http = require('http').createServer(app)

app.use(cookieParser())
app.use(express.json())

/* Express serve static files on production environment*/
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} 

/* Configuring CORS on development */
else { 
/* Make sure origin contains the url frontend is running on*/
const corsOptions = {
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
    app.use(cors(corsOptions))
}

/* Async Local Storage */
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

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

/* Web Socket */
const { setupSocketAPI } = require('./services/socket.service')
setupSocketAPI(http)

/* Logs */
const logger = require('./services/logger.service')
const port = process.env.PORT || 3030

http.listen(port, () => logger.info('Server is running on port: ' + port))