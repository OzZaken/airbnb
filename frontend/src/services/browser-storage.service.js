export {
    //  Local 
    saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage,
    //  Session
    saveToSessionStorage, loadFromSessionStorage, removeFromSessionStorage,
    // Cookies
    setCookie, setExpiredCookie, getCookie
}

// ---------------------------------   Local Storage     
function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

function saveToLocalStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key)
}

// ---------------------------------   Session Storage     
function loadFromSessionStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

function saveToSessionStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function removeFromSessionStorage(key) {
    sessionStorage.removeItem(key);
}
// ---------------------------------   Cookies   
function setCookie(key, value) {
    document.cookie = `${key}=${value};path=/`
}

function getCookie(key) {
    let name = key + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setExpiredCookie(key, value, timeMap) {
    const expires = ";expires=" + _formatTime(timeMap)
    document.cookie = `${key}=${value}${expires};path=/`
}

function _formatTime({ year = 0, month = 0, week = 0, day = 0, hour = 0, minute = 0 }) {
    const totalMinutes
        = minute
        + (hour * 60)
        + (day * 24 * 60)
        + (week * 7 * 24 * 60)
        + (month * 30 * 24 * 60)
        + (year * 365 * 24 * 60)
    const expirationDate = new Date(Date.now() + (totalMinutes * 60 * 1000))
    return expirationDate.toUTCString()
}

// ---------------   debug    
function _checkCookie() {
    let cookie = getCookie(prompt('Cookie name?', 'debug'))
    if (cookie !== '') alert('cookie: ' + cookie)

    else {
        cookie = prompt('!cookie... Enter cookie key:', 'debug test 123')
        if (cookie === '' || cookie === null) cookie = 'debug'

        setExpiredCookie('debug', cookie, { minute: 1 })
    }
}
window.checkCookie = _checkCookie 