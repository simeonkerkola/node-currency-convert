const axios = require('axios')

const fixerUrl = 'http://api.fixer.io/latest?base='
const countriesUrl = 'https://restcountries.eu/rest/v2/currency/'

const getExchangeRate = (from, to) => axios.get(fixerUrl + from)
  .then(response => response.data.rates[to])

const getCountries = currencyCode => axios.get(countriesUrl + currencyCode)
  .then(response => response.data.map(country => country.name))

// const convertCurrency = (from, to, amount) => {
//   let countries
//
//   return getCountries(to).then((tempCountries) => {
//     countries = tempCountries
//     return getExchangeRate(from, to)
//   }).then((rate) => {
//     const exchangedAmount = amount * rate
//
//     return `${amount} ${from} = ${exchangedAmount} ${to}.
//     ${to} can be used in: ${countries.join(', ')}`
//   })
// }

// Create convertCurrencyAlt async function
const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to)
  const rate = await getExchangeRate(from, to)
  const exchangedAmount = amount * rate

  return `${amount} ${from} = ${exchangedAmount} ${to}.\n${to} can be used in: ${countries.join(', ')}`
}

convertCurrencyAlt('EUR', 'JPY', 2).then(status => console.log(status))

// convertCurrency('USD', 'INR', 100).then(status => console.log(status))
// getExchangeRate('USD', 'EUR').then(rate => console.log(rate))
// getCountries('CAD').then(countries => console.log(countries))
