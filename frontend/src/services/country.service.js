const _ = require('lodash')
const countries = require('../assets/data/countries.json')
const countriesMap = _.keyBy(countries, country => country.alpha3Code)

function query(countryCode = null, filterBy = '') {
    var resCountries = countries
    if (countryCode) resCountries = countriesMap[countryCode].borders.map(code => countriesMap[code])
    resCountries = resCountries.filter(c => c.name.includes(filterBy))
    // Dont allow traveling to countries with "no borders"
    resCountries = resCountries.filter(c => c.borders && c.borders.length > 0)
    resCountries = resCountries.map(({ alpha3Code, name, borders, latlng, flag }) => ({ code: alpha3Code, name, borders, latlng, flag }))
    return resCountries
}

module.exports = {
    query,
}