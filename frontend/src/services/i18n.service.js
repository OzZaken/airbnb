var gTrans = {}
var gLangCode =  navigator.language.substring(0, 2) || 'en' // opt - .split('-')[0]
const STORAGE_KEY = 'userLang'

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
}


async function loadTranslations() {
    try {
        const response = await fetch('translations.json')
        const data = await response.json()
        gTrans = data 
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
    let translationValue = gTrans[translationKey]?.[gLangCode]

    if (!translationValue) {
        // Try other languages until a translation is found
        const fallbackLanguages = ['en', 'es', 'he']
        for (const lang of fallbackLanguages) {
            translationValue = gTrans[translationKey]?.[lang]
            if (translationValue) break
        }
    }
    return translationValue || gTrans[translationKey]?.['en'] || 'UNKNOWN'
}

function setLang(lang) {
    gLangCode = lang
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lang))
}

function getCurrencyPrice(price) {
    const currencyLookup = {
        en: { code: 'USD', rate: 1 },
        he: { code: 'ILS', rate: 3.37 },
        eg: { code: 'EGP', rate: 19.03 },
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
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }
    return new Intl.DateTimeFormat(gLangCode, options).format(time)
}

function kmToMiles(km) {
    return km / 1.609
}

function _loadLngFromLocalStorage() {
    const value = localStorage.getItem(STORAGE_KEY)
    return value ? JSON.parse(value) : null
}