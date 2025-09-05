export const maskAccountNumber = (accountNumber) => {
  if (typeof accountNumber !== "string" ||  accountNumber.length < 12){
    return accountNumber;
  }
  const firstFour = accountNumber.substring(0,4);
  const lastFour = accountNumber.substring(accountNumber.length-4);
//   const lastFour = accountNumber.slice(-4);
  const maskedDigits = '*'.repeat(accountNumber.length - 8);
  return `${firstFour}${maskedDigits}${lastFour}`;
};

export const formatCurrency = (value) =>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(isNaN(value)) return "Invalid Input";
    
    const numberValue = typeof value === "string"? parseFloat(value) : value;
    
    return new Intl.NumberFormat('en-IN',{
        style: 'currency',
        currency: user?.currency || 'INR',
        minimumFractionDigits: 2,
    }).format(numberValue);
}

export const getDateSevenDaysAgo = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  return sevenDaysAgo.toISOString().split('T')[0];
}

export async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
    if (!response.ok) {
      const countries = data.map((country) => {
        const currencies = country.currencies || {};
        const currencyCodes = Object.keys(currencies)[0];

        return {
          country: country.name.common,
          flag: country.flags.svg || country.flags.png,
          currency: currencyCodes || "", 
        };
      });

      const sortedCountries = countries.sort((a, b) =>
      a.country.localeCompare(b.country)
      );

      return sortedCountries;
    }else {
      console.error(`Error:${data.message}`);
      return [];
    }
  } catch (error) {
    console.error('An error occured while fetching data:', error);
    return [];
  }
}