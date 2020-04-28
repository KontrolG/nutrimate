const {
  getPositiveInteger,
  sanetizePattern,
  sendDataInJSON
} = require("./utils");

module.exports = {
  search: (request, response, query, foodData) => {
    new Promise(resolve => {
      /*
      Errores humanos:
      - query vacia. -> enviar resultados??
       - search vacia. -> envia los primeros resultados.
       - Caracteres indebidos.
        p. error en la expresion regular debido al patrón.
        s1. limpiar patrón (remover caracteres) ¿usar RegExp es lo correcto?.
        s2. Regresar error en el patron.
        s3. No permitir patrón.
       - Numeros negativos. -> Done
       - Numeros decimales. -> Done
       - Limit de 0. -> usa valor por default (10).
      */
      const searchPattern = sanetizePattern(query.q || "");
      const start = getPositiveInteger(query.start) || 0;
      const limit = getPositiveInteger(query.limit) || 10;

      const results = foodData.getResultsFromSearch(
        searchPattern,
        start,
        limit
      );

      setTimeout(() => {
        sendDataInJSON(response, results);
        resolve();
      }, 1000);
    })
  },
  get: (request, response, query, foodData) => {
    new Promise(resolve => {
      const result = foodData.getFoodById(query.fdcId);
      setTimeout(() => {
        sendDataInJSON(response, result);
        resolve();
      }, 1000);
    })
  }
};