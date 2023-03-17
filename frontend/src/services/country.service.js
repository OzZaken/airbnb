const _ = require('lodash')
const COUNTRIES = require('../assets/data/countries.json')
const COUNTRIES_MAP = _.keyBy(COUNTRIES, country => country.alpha3Code)

export const countryService = {
    query,
    getCountries
}

function query(countryCode = null, filterBy = '') {
    var resCountries = COUNTRIES

    if (countryCode) resCountries = COUNTRIES_MAP[countryCode].borders.map(code => COUNTRIES_MAP[code])

    resCountries = resCountries.filter(c => c.name.includes(filterBy))

    // Don't allow traveling to countries with "no borders"
    resCountries = resCountries.filter(c => c.borders && c.borders.length > 0)

    resCountries = resCountries.map(({ alpha3Code, name, borders, latlng, flag }) => ({ code: alpha3Code, name, borders, latlng, flag }))
    return resCountries
}

function getCountries() {
    return COUNTRIES
}