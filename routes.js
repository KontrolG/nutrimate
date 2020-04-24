const sanetizePattern = string => string.replace(/[^\w\s\%\,\.]/gi, "");
const isValid = string => /[^\w\s\%\,\.]/gi.test(string);

module.exports = {
  search: (request, response, query, foodData) => {
    new Promise((resolve, reject) => {
      /*
      Errores humanos:
       - query vacia. -> envia los primeros resultados.
       - Caracteres indebidos.
        p. error en la expresion regular debido al patrón.
        s1. limpiar patrón (remover caracteres) ¿usar RegExp es lo correcto?.
        s2. Regresar error en el patron.
        s3. No permitir patrón.
       - Numeros negativos.
       - Limit de 0. -> usa valor por default (10).
      
      */
      // if (!isValid(query.q)) throw new Error("Invalid characters");
      const searchPattern = sanetizePattern(query.q);
      const start = parseInt(query.start) || 0;
      const limit = parseInt(query.limit, 10) || 10;
      console.log({start, limit});

      const results = foodData.getResultsFromSearch(searchPattern, start, limit);

      resolve(results);
    }).then(results => {
      setTimeout(() => {
        // sendJSON(response, data);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(results));
      }, 1000);
    });
  },
  get: (request, response, query, foodData) => {
    new Promise(resolve =>
      setTimeout(() => {
        const result = foodData.find(({ fdcId }) => fdcId == query.fdcId);
        resolve(result);
      }, 1000)
    ).then(result => {
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      response.end(JSON.stringify(result));
    });
  }
};