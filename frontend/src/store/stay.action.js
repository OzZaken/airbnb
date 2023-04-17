import { stayService } from "../services/stay.service"
import { showSuccessMsg, showErrorMsg, showUserMsg } from '../services/event-bus.service'
import { storageService } from "../services/async-storage.service"

const STORAGE_KEY = 'stay'

// -------------------------------   Action Creators:    -------------------------------
export function getActionRemoveStay(stayId) {
    return { type: 'REMOVE_STAY', stayId }
}
export function getActionAddStay(stay) {
    return { type: 'ADD_STAY', stay }
}
export function getActionUpdateStay(stay) {
    return { type: 'UPDATE_STAY', stay }
}
// -------------------------------   CRUD    -------------------------------
export function addStay(stay) {
    return async (dispatch) => {
        try {
            var saveStay = stayService.save(stay)
            console.log('Added Stay', saveStay)
            dispatch(getActionAddStay(saveStay))
        } catch (err) {
            showErrorMsg('Cannot add stay')
            console.log('Cannot add stay', err)
        }
        finally {
            showSuccessMsg(`Stay ${saveStay.name} added successfully`)
        }
    }
}

export function loadStays() {
    return async (dispatch, getState) => {
        const { filterBy, sortBy } = getState().stayModule
        try {
            const stays = await stayService.query(filterBy, sortBy)
            dispatch({ type: 'SET_STAYS', stays })
        } catch (err) {
            showErrorMsg('Cannot load stays')
        }
    }
}

export function updateStay(stay) {
    return async (dispatch) => {
        var updateStay = stayService.save(stay)
        try {
            console.log('Updated Stay:', updateStay)
            dispatch(getActionUpdateStay(updateStay))
        } catch (err) {
            showErrorMsg(`Cannot update stay ${updateStay.name}`)
            console.log('Cannot save stay', err)
        }
        finally {
            showSuccessMsg('Stay updated')
        }
    }
}

export function removeStay(stayId) {
    return async (dispatch) => {
        try {
            var removeStay = await stayService.remove(stayId)
            showUserMsg(`${removeStay._id} Deleted Successfully`)
            dispatch(getActionRemoveStay(stayId))
        } catch (err) {
            showErrorMsg('Cannot remove stay')
            console.log('Cannot remove stay', err)
        }
    }
}

// -------------------------------   WishList    -------------------------------
export function addToWishList(stay) {
    return (dispatch) => {
        dispatch({ type: 'ADD_TO_WISHLIST', stay })
    }
}

export function removeFromWishList(stayId) {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', stayId })
    }
}

export function clearWishList() {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_WISHLIST' })
    }
}

// -------------------------------   Query Params    -------------------------------
/* filter */
export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}

/* sort */
export function setSortBy(sortBy) {
    return (dispatch, getState) => {
        let { stays } = getState().stayModule

        switch ({ sortBy }) {
            case 'price':
                stays = stays.sort((t1, t2) => t1.price - t2.price)
                break

            case 'name':
                stays = stays.sort((t1, t2) => t1.name.localeCompare(t2.name))
                break

            case 'rate':
                stays = stays.sort((t1, t2) => t1.rate - t2.rate)
                break

            case 'capacity':
                stays = stays.sort((t1, t2) => t1.capacity - t2.capacity)
                break
            default:
        }
        dispatch({ type: 'SET_STAYS', stays })
    }
}

/* pagination */
export function setPageIdx(pageIdx = 0) {
    return (dispatch) => {
        dispatch({ type: 'SET_PAGE_IDX', pageIdx })
    }
}

export function incPageIdx() {
    return (dispatch, getState) => {
        const { pageIdx } = getState().stayModule.filterBy
        dispatch({ type: 'INC_PAGE_IDX', pageIdx })
    }
}

export function DecPageIdx() {
    return (dispatch, getState) => {
        const { pageIdx } = getState().stayModule.filterBy
        dispatch({ type: 'DEC_PAGE_IDX', pageIdx })
    }
}

//--------Optimistic Mutation  (IOW - Assuming the server call will work, so updating the UI first)
export function onLoadStaysPWA() {
    const storageStays = storageService.query(STORAGE_KEY)
    // dispatch({ type: 'SET_STAYS', stays: storageStays })

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
        } catch (err) {
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
        var newStay = stayService.save(stay)
        dispatch(getActionAddStay(newStay))
        showUserMsg(`adding new Stay: ${newStay.name}`)
        try {
            dispatch(getActionAddStay(newStay))
            console.log('Added Stay', newStay)
        } catch (err) {
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