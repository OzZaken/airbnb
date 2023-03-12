const logger = require('../services/logger.service')

module.exports = { log }

async function log(req, res, next) {
  logger.info('Req was made')
  next()
}