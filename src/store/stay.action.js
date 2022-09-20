import { stayService } from '../services/stay.service.local'

export function setCurrentUrl(page) {
  return (dispatch) => {
      dispatch({ type: 'SET_PAGE', page: page })
  }
}

export function loadStays() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().stayModule
    try {
      const stays = await stayService.query(filterBy)
      dispatch({ type: 'SET_STAYS', stays })
    } catch (err) {
      console.log(`err:`, err)
    }
  }
}

export function removeStay(stayId) {
  return async (dispatch) => {
    try {
      await stayService.remove(stayId)
      dispatch({ type: 'REMOVE_STAY', stayId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addStay(stay) {
  return async (dispatch) => {
    try {
      const savedStay = await stayService.save(stay)
      dispatch({ type: 'ADD_STAY', stay: savedStay })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function updateStay(stay) {
  return async (dispatch) => {
    try {
      const savedStay = await stayService.save(stay)
      dispatch({ type: 'UPDATE_STAY', stay: savedStay })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function sortByStays(sortBy) {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_SORT_BY', sortBy })

    let { stays } = getState().stayModule

    if (sortBy.sortBy === 'name') {
      stays = stays.sort((t1, t2) => t1.name.localeCompare(t2.name))
    }
    if (sortBy.sortBy === 'price') {
      stays = stays.sort((t1, t2) => t1.price - t2.price)
    }

    dispatch({ type: 'SET_STAYS', stays })
  }
}


