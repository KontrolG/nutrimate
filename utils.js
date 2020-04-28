const fs = require("fs");

const getDataFromJSON = dataName => {
  const dataJSON = fs.readFileSync(
    `${__dirname}/data/${dataName}Data.json`,
    "utf8"
  );
  return JSON.parse(dataJSON);
};

const sanetizePattern = string => string.replace(/[^\w\s\%\,\.]/gi, "");

const isValid = string => /[^\w\s\%\,\.]/gi.test(string);

const getPositiveInteger = string => Math.abs(parseInt(string, 10));

const sendDataInJSON = (response, data) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
};

const sendMessage = (response, code, message) => {
  response.writeHead(code);
  response.end(message);
};

const pageNotFoundError = response => sendMessage(response, 404, "Page not Found");

module.exports = {
  getDataFromJSON,
  sanetizePattern,
  isValid,
  getPositiveInteger,
  sendDataInJSON,
  pageNotFoundError
}; 
