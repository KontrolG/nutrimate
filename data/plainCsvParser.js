const splitWords = string => string.split(/[\_\s\.\-]/g);

const capitalize = word => {
  const firstLetterUpperCase = word[0].toUpperCase();
  const restLetters = word.slice(1);
  return firstLetterUpperCase.concat(restLetters);
};

const modifyWord = (word, index) => {
  if (index > 0) word = capitalize(word);
  return word;
};

const toLowerCamelCase = string => splitWords(string)
  .map(modifyWord)
  .join("");

const replaceRepeatedDoubleQuotes = string => string.replace(/\"{2}/g, "''");

const arrayFromRowString = rowString => eval(`[${replaceRepeatedDoubleQuotes(rowString)}]`);

const getCSVRows = plainCSV => {
  try {
    return plainCSV.split("\n").map(arrayFromRowString); 
  } catch (error) {
    console.error("There was an error parsing the file!, check it looking for write errors.");
  }
}

const hasProperties = object => Object.keys(object).length;

const getObjectsFromRows = (rows, properties) => {
  return rows.map(row => row.reduce((object, propertyValue, columnIndex) => {
    const propertyName = properties[columnIndex];
    object[propertyName] = propertyValue;
    return object;
  }, {}))
}

module.exports = function (plainCSV) {
  const [columns, ...rows] = getCSVRows(plainCSV) || [];
  const properties = columns.map(toLowerCamelCase);
  const objects = getObjectsFromRows(rows, properties);
  return objects.filter(hasProperties);
}
