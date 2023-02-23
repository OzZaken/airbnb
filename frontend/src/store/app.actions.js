export function updateView(view) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_VIEW', view })
    }
}
export function addUserAction(actionData) {
    return (dispatch) => {
        dispatch({ type: 'ADD_USER_ACTION', data: actionData })
    }
}
export function addUserAction(actionData) {
    return (dispatch) => {
        dispatch({ type: 'ADD_USER_ACTION', data: actionData })
    }
}
export function getAddUserAction(actionData) {
    return { type: 'ADD_USER_ACTION', data: actionData }
}