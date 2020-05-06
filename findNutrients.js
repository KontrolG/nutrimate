  

  calculateAmount(nutrient, gramWeight) {
    const { name, amount, unitName } = nutrient;
    const calculatedAmount = (amount / 100) * gramWeight;
    return {
      name,
      amount: calculatedAmount,
      unitName
    };
  }