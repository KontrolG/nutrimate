const getNumberWithFixedDecimals = (number, decimals) => {
  const floatingNumber = parseFloat(number);
  const numberHasDecimals = floatingNumber % 1 !== 0;

  return numberHasDecimals ? floatingNumber.toFixed(decimals) : floatingNumber;
};

export default getNumberWithFixedDecimals;
