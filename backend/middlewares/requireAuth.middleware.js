const logger = require('../services/logger.service')
const authService = require('../api/auth/auth.service')

module.exports = {
  requireAuth,
  requireHost,
  requireAdmin
}

function requireAuth(req, res, next) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  next()
}

function requireAdmin(req, res, next) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedinUser.isAdmin) {
    logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}

function requireHost(req, res, next) {
  const stayId = req.params.id
  const stay = stayService.getById(stayId)
  const loginToken = req.cookies.loginToken
  const loggedinUser = authService.validateToken(loginToken)

  if (!stay) return res.status(404).send('Stay not found')
  
  if (stay.host._id !== loggedinUser._id) {
    logger.warn(loggedinUser.fullname + ' attempted to delete stay owned by ' + stay.host.fullname)
    return res.status(403).send('Not Authorized')
  }
  next()
}