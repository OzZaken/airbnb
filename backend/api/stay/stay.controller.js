const logger = require('../../services/logger.service')
const stayService = require('./stay.service')

const STAYS_PER_QUERY = 80

module.exports = {
  getStays,
  getStayById,
  addStay,
  updateStay,
  removeStay
}

async function getStays(req, res) {
  logger.debug('Getting Stays')
  const params = req.query.params
  const { filterBy, sortBy, pageIdx } = JSON.parse(params)

  try {
    const stays = await stayService.query(filterBy, sortBy, pageIdx)
    res.json(stays)
  } catch (err) {
    logger.error('Failed to get stays', err)
    res.status(500).send({ err: 'Failed to get stays' })
  }
}

async function getStayById(req, res) {
  try {
    const stayId = req.params.id
    const stay = await stayService.getById(stayId)
    res.json(stay)
  } catch (err) {
    logger.error('Failed to get stay', err)
    res.status(500).send({ err: 'Failed to get stay' })
  }
}

async function addStay(req, res) {
  try {
    const stay = req.body
    const addedStay = await stayService.add(stay)
    res.json(addedStay)
  } catch (err) {
    logger.error('Failed to add stay', err)
    res.status(500).send({ err: 'Failed to add stay' })
  }
}

async function updateStay(req, res) {
  try {
    const stay = req.body
    const updatedStay = await stayService.update(stay)
    res.json(updatedStay)
  } catch (err) {
    logger.error('Failed to update stay', err)
    res.status(500).send({ err: 'Failed to update stay' })
  }
}

async function removeStay(req, res) {
  try {
    const stayId = req.params.id
    const removedId = await stayService.remove(stayId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove stay', err)
    res.status(500).send({ err: 'Failed to remove stay' })
  }
}