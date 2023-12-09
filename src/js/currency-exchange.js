export default class CurrencyExchange {
  static getCurrencyCodes() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to return currency codes: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      });
  }

  static getExchangeRate(baseCurrency, newCurrency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/${baseCurrency}/${newCurrency}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to get exchange rate: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      });
  }

  static convertCurrency(amount, baseCurrency, newCurrency) {
    return this.getExchangeRate(baseCurrency, newCurrency)
      .then(exchangeRateData => {
        if (exchangeRateData.result !== 'success') {
          throw new Error(`Error converting currency: ${exchangeRateData.result}`);
        }
        const conversionRates = exchangeRateData.conversion_rates;
        if (!(newCurrency in conversionRates)) {
          throw new Error(`Conversion rate for ${newCurrency} not found.`);
        }
        const rate = conversionRates[newCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        return { rate, convertedAmount };
      });
  }
}