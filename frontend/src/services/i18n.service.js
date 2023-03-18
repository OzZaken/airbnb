const TRANS = require('../assets/data/default-translations.json')

const STORAGE_KEY = 'userLang'

var gTransMap = null

var gLangCode = _loadLangFromLocalStorage()
    || navigator.language.substring(0, 2)  // eq .split('-')[0]
    || 'en'

// loadTranslations()

export const translationService = {
    doTrans,
    getTranslationValue,
    setLang,
    getCurrencyPrice,
    formatNumOlder,
    formatNum,
    formatCurrency,
    formatDate,
    kmToMiles,
    getEarthRadius,
}

function setLang(lang) {
    gLangCode = lang
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lang))
}

function getEarthRadius() {
    const lang = navigator.language
    const kmLocales = ['en-US', 'en-GB', 'fr-FR', 'es-ES', 'it-IT', 'pt-PT', 'pt-BR']
    const milesLocales = ['en-CA', 'en-AU']

    if (kmLocales.includes(lang)) return 6371 // Earth's radius in km
    else if (milesLocales.includes(lang)) return 3959 // Earth's radius in miles
    else {
        console.warn('Unknown locale:', lang)
        // TODO:logger.warn('Unknown locale:', lang)
        return 6371 // default to km
    }
}

async function loadTranslations() {
    try {
        const response = await fetch('translations.json')
        const data = await response.json()
        gTransMap = data
        doTrans()
    } catch (err) {
        console.log(err)
    }
}

function doTrans() {
    const elTxts = document.querySelectorAll('[data-trans]')

    elTxts.forEach(elTxt => {
        const translationKey = elTxt.dataset.trans
        const translationValue = getTranslationValue(translationKey)
        elTxt.innerText = translationValue
        if (elTxt.placeholder !== undefined) elTxt.placeholder = translationValue
    })
}

function getTranslationValue(translationKey) {
    return gTransMap[translationKey]?.[gLangCode]
}

function getCurrencyPrice(price) {
    const currencyLookup = {
        en: { code: 'USD', rate: 1 },
        he: { code: 'ILS', rate: 3.37 },
    }

    const currency = currencyLookup[gLangCode] || currencyLookup.en
    price = price * currency.rate

    const opt = {
        style: 'currency',
        currency: currency.code,
    }

    return new Intl.NumberFormat(gLangCode, opt).format(price)
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gLangCode).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat(
        'he-IL',
        { style: 'currency', currency: 'ILS' }
    ).format(num)
}

function formatDate(time) {
    const options = {
        year: 'numeric', month: 'short',
        day: 'numeric', hour: 'numeric',
        minute: 'numeric', hour12: true,
    }
    return new Intl.DateTimeFormat(gLangCode, options).format(time)
}

function kmToMiles(km) {
    return +(km / 1.609).toFixed(3)
}

function _loadLangFromLocalStorage() {
    const value = localStorage.getItem(STORAGE_KEY)
    return value ? JSON.parse(value) : null
}