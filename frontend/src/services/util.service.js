export const utilService = {
    delay,
    // make
    makeId,
    makeLorem,
    makeChart,
    // format
    timeAgo,
    getFormatDate,
    getFormatTime,
    // random
    getRandomDate,
    getRandomColor,
    // math
    getRandomIntInclusive,
    getRandomFloatInclusive,
    // regex
    getCamelCase,
    getKebabCase,
    getNumWithCommas,
    getKebabFromCamel,
    getCamelFromKebab,
    isValidEmail,
    isValidDate,
    isValidTime,
}

function delay(ms = 1500) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/* Make */
function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeChart(labels, label, data) {
    const backgroundColor = (data) => {
        const backgroundColors = []
        const borderColors = []
        for (let i = 0; i < data.length; i++) {
            backgroundColors.push(getRandomColor())
            borderColors.push(getRandomColor())
        }
    }

    return {
        labels,
        datasets: [{
            label,
            data,
            backgroundColor,
            borderColor,
            borderWidth: 1
        }]
    }
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

/* Date & Time */

/* human-readable string that represents the time difference in terms of:
  years, months, weeks, days, hours, minutes, or seconds 
  (depending on the largest time range that the difference fits into).
  examples: if the function is called on March 26, 2023 at 10:30:00 AM UTC, the output could be:
  "in 1 year" if the ms parameter is set to March 26, 2024 at 10:30:00 AM UTC.
  "1 year ago" if the ms parameter is set to March 26, 2022 at 10:30:00 AM UTC.
  "in 6 months" if the ms parameter is set to September 26, 2023 at 10:30:00 AM UTC.
  "6 months ago", "in 2 weeks", "2 weeks ago" etc.*/
function timeAgo(ms = new Date()) {
    const date = ms instanceof Date ? ms : new Date(ms)
    const formatter = new Intl.RelativeTimeFormat('en')

    const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1,
    }
    // calculates the time difference between the ms parameter and the current date.
    const secondsElapsed = (date.getTime() - Date.now()) / 1000


    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key]
            let time = formatter.format(Math.round(delta), key)
            if (time.includes('in')) {
                time = time.replace('in ', '')
                time = time.replace('ago', '')
                time += ' ago'
            }
            return time
        }
    }
}

// YYYY-MM-DD format.
function getFormatDate(millisecond) {
    const valueDate = new Date(millisecond)
    return `${valueDate.getFullYear()}-${(valueDate.getMonth() + 1 + '').padStart(2, '0')}-${(valueDate.getDate() + '').padStart(2, '0')}`
}

// HH:MM format.
function getFormatTime(millisecond) {
    const valueTime = new Date(millisecond)
    return `${(valueTime.getHours() + '').padStart(2, '0')}:${(valueTime.getMinutes() + '').padStart(2, '0')}`
}

/* Math */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    //The maximum is inclusive and the minimum is inclusive 
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomFloatInclusive(min, max, decimals) {
    return +((Math.random() * (max - min)) + min).toFixed(decimals)
}

/* Random */
function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// from 01/01/2020 until today
function getRandomDate(start = new Date(2020, 0, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime()
}

/* RegEx */
function getNumWithCommas(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function getKebabCase(str) {
    return str.map(prop => {
        const regex = /[^A-Za-z0-9]+/g
        return prop.toLowerCase().replace(regex, '-')
    })
}

function getCamelCase(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

function getKebabFromCamel(str) {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

function getCamelFromKebab(str) {
    return str.replace(/[-_]\w/g, (match) => match.charAt(1).toUpperCase())
}

function isValidEmail(str) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(str)
}

function isValidDate(str) {
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    return regex.test(str)
}

function isValidTime(str) {
    const regex = /^(0?[1-9]|1[0-2]):[0-5]\d\s(am|pm)$/i
    return regex.test(str)
}

//? todo: ↓↓ should be the backend?
/** Explanation:
 * Start with a letter (both upper and lowercase) or a number
 * Have a length of at least 2 characters and at most 21 characters
 * Do not have consecutive dots, underscores, or hyphens.
 * Do not start or end with a dot, underscore, or hyphen. */
function isValidUsername(str) {
    const regex = /^(?=[a-zA-Z0-9])(?!.*[-_.]{2})[a-zA-Z0-9._-]{2,21}(?<![.-])$/
    return regex.test(str)
}

/** different type of passwords for different types of users:
 * user: at least 8 characters with at least one lowercase letter, one uppercase letter, and one number.
 * host: at least 12 characters with at least one lowercase letter, one uppercase letter, one number, and one special character ($, @, !, %, *, ?, or &).
 * admin: level password, I've included a regex that requires at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 12 characters.*/
function isValidPass(str, passLvl = 'user') {
    let regex

    if (passLvl === 'user') regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    else if (passLvl === 'host') regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>?[\]\\\/])[a-zA-Z\d!@#$%^&*()\-_=+{};:<,.>?[\]\\\/]{8,}$/
    else if (passLvl === 'admin') regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>?[\]\\\/])[a-zA-Z\d!@#$%^&*()\-_=+{};:<,.>?[\]\\\/]{12,}$/
    else throw new Error(`Invalid passLvl parameter: ${passLvl}`)

    return regex.test(str)
}