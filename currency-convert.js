const axios = require('axios')

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`)
    const rate = response.data.rates[to]

    if (rate) return rate
    throw new Error()
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} ${to}`)
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    return response.data.map(country => country.name)
  } catch (e) {
    throw new Error(`Unable to get any data on currency code '${currencyCode}'`)
  }
}

// Create convertCurrencyAlt async function
const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to)
  const rate = await getExchangeRate(from, to)
  const exchangedAmount = amount * rate

  return `${amount} ${from} = ${exchangedAmount} ${to}.\n${to} can be used in: ${countries.join(', ')}`
}

convertCurrencyAlt('EUR', 'JPY', 1).then(status => console.log(status))
  .catch(e => console.log(e.message))

// getExchangeRate('USD', 'EUR').then(rate => console.log(rate))
// getCountries('CAD').then(countries => console.log(countries))
