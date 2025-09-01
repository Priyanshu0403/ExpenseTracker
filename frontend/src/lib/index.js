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