import CurrencyExchange from './js/currency-exchange.js';


const convertCurrency = async () => {

  const getConversionInput = () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    return {
      amount: parseFloat(amountInput.value),
      fromCurrency: fromCurrencySelect.value,
      toCurrency: toCurrencySelect.value,
    };
  };

  const validateAmount = (amount) => {
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount to convert.');
      return false;
    }
    return true;
  };

  const getConversionResult = async (amount, fromCurrency, toCurrency) => {
    try {
      const result = await CurrencyExchange.convertCurrency(amount, fromCurrency, toCurrency);
      return result.convertedAmount;
    } catch (error) {
      throw new Error(`Error converting currency. ${error.message}`);
    }
  };

  const updateUI = (result) => {
    const resultDiv = document.getElementById('conversionResult');
    resultDiv.innerHTML = `<p>${getConversionInput().amount} ${getConversionInput().fromCurrency} is approximately ${result} ${getConversionInput().toCurrency}.</p>`;
  };


  const conversionInput = getConversionInput();
  if (validateAmount(conversionInput.amount)) {
    try {
      const convertedAmount = await getConversionResult(
        conversionInput.amount,
        conversionInput.fromCurrency,
        conversionInput.toCurrency
      );
      updateUI(convertedAmount);
    } catch (error) {
      updateUI(error.message);
    }
  }
};


const clearResult = () => {
  const resultDiv = document.getElementById('conversionResult');
  resultDiv.innerHTML = '';
};

document.getElementById('convertButton').addEventListener('click', convertCurrency);
document.getElementById('amount').addEventListener('input', clearResult);
document.getElementById('fromCurrency').addEventListener('change', clearResult);
document.getElementById('toCurrency').addEventListener('change', clearResult);
