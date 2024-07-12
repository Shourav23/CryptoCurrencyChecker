// Function to populate the top 20 cryptocurrencies in the dropdown
async function populateCryptoDropdown() {
    const cryptoDropdown = document.getElementById('crypto');
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      data.forEach(crypto => {
        const option = document.createElement('option');
        option.value = crypto.id;
        option.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()})`;
        cryptoDropdown.appendChild(option);
      });
    } catch (error) {
      document.getElementById('result').textContent = `Failed to retrieve data: ${error.message}`;
    }
  }
  
  // Function to get the current price of the selected cryptocurrency
  async function getCryptoPrice() {
    const crypto = document.getElementById('crypto').value;
    const fiat = document.getElementById('fiat').value;
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${fiat}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const price = data[crypto][fiat];
  
      const currencySymbols = {
        inr: '₹',
        usd: '$',
        eur: '€',
        gbp: '£'
        // Add more currencies as needed
      };
  
      const symbol = currencySymbols[fiat] || ''; // Default to empty if the fiat currency is not in the map
  
      document.getElementById('result').textContent = `The current price of ${crypto} is ${symbol}${price} ${fiat.toUpperCase()}.`;
    } catch (error) {
      document.getElementById('result').textContent = `Failed to retrieve data: ${error.message}`;
    }
  }
  
  // Call the function to populate the cryptocurrency dropdown on page load
  window.onload = populateCryptoDropdown;
  