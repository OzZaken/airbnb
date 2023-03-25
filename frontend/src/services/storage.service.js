module.exports = {
    saveToLocalStorage, loadFromLocalStorage,
    saveToSessionStorage, loadFromSessionStorage,
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null

}

function saveToLocalStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromSessionStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null

}

function saveToSessionStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}