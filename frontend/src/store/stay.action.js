import { stayService } from "../services/stay.service"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

// Action Creators:
export function getActionRemoveStay(stayId) {
    return { type: 'REMOVE_STAY', stayId }
}
export function getActionAddStay(stay) {
    return { type: 'ADD_STAY', stay }
}
export function getActionUpdateStay(stay) {
    return { type: 'UPDATE_STAY', stay }
}

// Basic CRUD
export function loadStays() {
    return async (dispatch) => {
        const { filterBy } = getState().stayModule
        try {
            var LoadStays = await stayService.query(filterBy)
            dispatch({ type: 'SET_STAYS', stays: LoadStays })
        } catch (err) {
            showErrorMsg('Cannot load stays')
        }
    }
}
export function removeStay(stayId) {
    return async (dispatch) => {
        try {
            var removeStay = await stayService.remove(stayId)
            console.log('Deleted Successfully')
            dispatch(getActionRemoveStay(stayId))
        } catch (err) {
            showErrorMsg('Cannot remove stay')
            console.log('Cannot remove stay', err)
        }
    }
}
export function addStay(stay) {
    return async (dispatch) => {
        try {
            var saveStay = stayService.save(stay)
            console.log('Added Stay', saveStay)
            dispatch(getActionAddStay(saveStay))
        } catch (error) {
            showErrorMsg('Cannot add stay')
            console.log('Cannot add stay', err)
        }
        finally {
            showSuccessMsg(`Stay ${saveStay.name} added successfully`)
        }
    }
}
export function updateStay(stay) {
    return async (dispatch) => {
        var updateStay = stayService.save(stay)
        try {
            console.log('Updated Stay:', updateStay)
            dispatch(getActionUpdateStay(updateStay))
        } catch (error) {
            showErrorMsg(`Cannot update stay ${updateStay.name}`)
            console.log('Cannot save stay', err)
        }
        finally {
            showSuccessMsg('Stay updated')
        }
    }
}
export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}
export function setSortBy(sortBy) {
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

// Optimistic Mutation  (IOW - Assuming the server call will work, so updating the UI first)
const STORAGE_KEY = 'stay'

export function onLoadStaysPWA() {
    const storageStays = loadFromStorage(STORAGE_KEY)
    dispatch({ type: 'SET_STAYS', stays: storageStays })

    return async (dispatch, getState) => {
        const state = getState()
        const { isLoading } = state.stayModule
        dispatch({ type: 'TOGGLE_STAY_LOADER', isLoading })
        try {
            var LoadStays = await stayService.query()
        } catch (err) {
            showErrorMsg('Cannot load stays: last update At: //TODO')
        }
        finally {
            if (LoadStays) dispatch({ type: 'SET_STAYS', stays: LoadStays })
            const state = getState()
            const { isLoading } = state.stayModule
            dispatch({ type: 'TOGGLE_STAY_LOADER', isLoading })
        }
    }
}
export function onRemoveStayPWA(stayId) {
    return async (dispatch, getState) => {
        dispatch({ type: 'REMOVE_STAY', stayId })
        showUserMsg(`removing Stay ${stayId}`)
        try {
            var removedStayId = stayService.remove(stayId)
        } catch (error) {
            showErrorMsg('Cannot delete stay')
            console.log('Cannot delete stay', err)
            dispatch({ type: 'UNDO_REMOVE_STAY' })
        }
        finally {
            if (removedStayId === stayId) showSuccessMsg(`Stay ${removedStayId} Deleted Successful`)
        }
    }
}
export function onAddStayPWA(stay) {
    return async (dispatch) => {
        dispatch(getActionAddStay(newStay))
        showUserMsg(`adding new Stay: ${newStay.name}`)
        try {
            var newStay = stayService.save(stay)
            dispatch(getActionAddStay(newStay))
            console.log('Added Stay', newStay)

        } catch (error) {
            showErrorMsg('Cannot add stay')
            console.log('Cannot add stay', err)
            dispatch({ type: 'UNDO_ADD_STAY' })
        }
        finally {
            showSuccessMsg(`Stay ${newStay.name} added successfully`)
        }
    }
}
export function onUpdateStayPWA(stay) {
    return async (dispatch) => {
        var updateStay = stayService.save(stay)
        try {
            dispatch(getActionUpdateStay(updateStay))
            console.log('Updated Stay:', updateStay)
        } catch (err) {
            showErrorMsg('Cannot update stay')
            console.log('Cannot save stay', err)
            dispatch({ type: 'UNDO_SAVE_STAY' })
        }
        finally {
            showSuccessMsg('Stay updated')
        }
    }
}