const toLowerCamelCase = string => string.split("_").map((word, index) => index > 0 ? word[0].toUpperCase().concat(word.slice(1)) : word).join("");

const parsePropertiesNames = propertiesNames => {
  for (let index = 0; index < propertiesNames.length; index++) {
    propertiesNames[index] = toLowerCamelCase(propertiesNames[index]);
  }
}

const getCSV = plainCSV => {
  try {
    return plainCSV.split("\n").map(row => eval(`[${row.replace(/\"{2}/g, "''")}]`));
  } catch (error) {
    console.error("There is an error!, check the file you are trying to parse.");
    return [];
  }
}

module.exports = function (plainCSV) {
  const [propertiesNames, ...propertiesValues] = getCSV(plainCSV);
  
  parsePropertiesNames(propertiesNames);

  return propertiesValues.map(row =>
    row.reduce((food, propertyValue, columnIndex) => {
      const propertyName = propertiesNames[columnIndex];
      food[propertyName] = propertyValue;
      return food;
    }, {})
  );
}
