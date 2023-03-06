export function updateView(view) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_VIEW', view })
    }
}

export function setTitle(title) {
    return (dispatch) => {
        dispatch({ type: 'SET_TITLE',  title })
    }
}



export function addUserAction(actionData) {
    return (dispatch) => {
        dispatch({ type: 'ADD_USER_ACTION', data: actionData })
    }
}


// Actions Creators
export function getAddUserAction(actionData) {
    return { type: 'ADD_USER_ACTION', data: actionData }
}