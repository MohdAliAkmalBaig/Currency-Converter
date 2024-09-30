const apiKey = '137ed001e5fbef78e2298ea3'; // Replace with your actual API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// DOM Elements
const amountEl = document.getElementById('amount');
const fromCurrencyEl = document.getElementById('fromCurrency');
const toCurrencyEl = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convert');
const resultEl = document.getElementById('res'); // Corrected this line

// Function to fetch the list of currencies and populate dropdowns
function populateCurrencyDropdowns() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencyEl.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencyEl.appendChild(option2);
            });
            // Set default values
            fromCurrencyEl.value = 'INR';
            toCurrencyEl.value = 'USD';
        })
        .catch(error => console.error('Error fetching currency list:', error));
}

// Function to convert currency
function convertCurrency() {
    const amount = amountEl.value;
    const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;

    if (!amount || amount <= 0) {
        resultEl.textContent = 'Please enter a valid amount.';
        return;
    }

    // Fetch exchange rate for the selected fromCurrency
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultEl.textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
        })
        .catch(() => {
            resultEl.textContent = 'Error fetching conversion rate.';
        });
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);

// Populate currency dropdowns on page load
populateCurrencyDropdowns();
