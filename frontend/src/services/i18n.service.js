import { loadFromLocalStorage, saveToLocalStorage } from './browser-storage.service'
const STORAGE_KEY = 'userLang'

// first basic translation map from data in clint side  
var gTranslationMap = require('../assets/data/translate.json')

// calling and update `gTranslationMap` from backend. 
// loadTranslations() 

var gLangCode = loadFromLocalStorage(STORAGE_KEY)
    || navigator.language.substring(0, 2) /* equal to `.split('-')[0]` */
    || 'en' // default


const transService = {
    doTrans,
    getTranslationValue: _getTranslationValue,
    setLang,
    getCurrencyPrice,
    formatNumOlder,
    formatNum,
    formatCurrency,
    formatDate,
    kmToMiles,
    getEarthRadius,
}

export default transService

async function loadTranslations() {
    try {
        const response = await fetch('translations.json')
        const data = await response.json()
        gTranslationMap = data
    } catch (err) {
        console.error('Failed to load translations:', err)
        throw new Error('Failed to load translations')
    }
}

function setLang(lang) {
    gLangCode = lang
    saveToLocalStorage(STORAGE_KEY, lang)
}

function doTrans() {
    const elTxts = document.querySelectorAll('[data-trans]')

    elTxts.forEach(elTxt => {
        const translationKey = elTxt.dataset.trans
        const translationValue = _getTranslationValue(translationKey)
        elTxt.innerText = translationValue
        if (elTxt.placeholder !== undefined) elTxt.placeholder = translationValue
    })
}

// ---------------------------------   currency  
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

function formatCurrency(num, fromCurr = 'USD', toCurr = 'USD') {
    const rateMap = {
        USD: 1,
        ILS: 3.67, // 1 USD = 3.67 ILS
        EUR: 0.90, // 1 USD = 0.90 EUR
    }
    const convertedNum = num / rateMap[fromCurr] * rateMap[toCurr]
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: toCurr
    }).format(convertedNum)
}

// ---------------------------------   number  
function formatNum(num) {
    return new Intl.NumberFormat(gLangCode).format(num)
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

// ---------------------------------   date  
function formatDate(time) {
    const options = {
        year: 'numeric', month: 'short',
        day: 'numeric', hour: 'numeric',
        minute: 'numeric', hour12: true,
    }
    return new Intl.DateTimeFormat(gLangCode, options).format(time)
}

// ---------------------------------   distance units   
function kmToMiles(km) {
    return +(km / 1.609).toFixed(3)
}

function getEarthRadius() {
    const lang = navigator.language
    const kmLocales = ['en-US', 'en-GB', 'fr-FR', 'es-ES', 'it-IT', 'pt-PT', 'pt-BR']
    const milesLocales = ['en-CA', 'en-AU']

    if (kmLocales.includes(lang)) return 6371 // Earth's radius in km
    else if (milesLocales.includes(lang)) return 3959 // Earth's radius in miles
    else {
        logger.warn('Unknown locale:', lang)
        return 6371 // default to km
    }
}

// ---------------------------------   private   
function _getTranslationValue(translationKey) {
    return gTranslationMap[translationKey]?.[gLangCode]
}