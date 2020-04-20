const toLowerCamelCase = string => string[0].toLowerCase().concat(string.slice(1)).replace(/\_/g, "");

const parsePropertiesNames = propertiesNames => {
  for (let index = 0; index < propertiesNames.length; index++) {
    propertiesNames[index] = toLowerCamelCase(propertiesNames[index]);
  }
}

module.exports = function (plainCSV) {
  const [propertiesNames, ...propertiesValues] = plainCSV.split("\r\n").map(row => row.split(";"));
  
  parsePropertiesNames(propertiesNames);
  const stringPropertiesIndexes = [1, 4];

  return propertiesValues.map(row =>
    row.reduce((food, propertyValue, columnIndex) => {
      const propertyName = propertiesNames[columnIndex];
      const isStringProperty = stringPropertiesIndexes.includes(columnIndex);
      food[propertyName] = isStringProperty
        ? propertyValue
        : parseFloat(propertyValue);
      return food;
    }, {})
  );
}
