const fs = require("fs");
const http = require("http");
const url = require("url");

const dataJSON = fs.readFileSync(`${__dirname}/data/data.json`, "utf8");
const foodData = JSON.parse(dataJSON);

const server = http.createServer((request, response) => {
  const endpoint = url.parse(request.url, true);
  const { pathname, query } = endpoint;

  if (pathname.match(/^\/api\//)) {
    switch (pathname.replace(/^\/api\//, "")) {
      case "search":
        // PARAMS: q: query, start, end o limit
        const { q: searchQuery } = query;
        const start = parseInt(query.start, 10) || 0;
        const limit = parseInt(query.limit, 10) || 5;
        const regExp = new RegExp(searchQuery, "gi");
        const results = foodData
          .filter(food => regExp.test(food.displayName))
          .slice(start, start + limit)
          .map(
            ({
              foodCode,
              displayName,
              portionDefault,
              portionAmount,
              portionDisplayName,
              addedSugars,
              alcohol,
              solidFats,
              saturatedFats,
              calories
            }) => ({
              foodCode,
              displayName,
              portionDefault,
              portionAmount,
              portionDisplayName,
              addedSugars,
              alcohol,
              solidFats,
              saturatedFats,
              calories
            })
          );
        
        response.end(
          JSON.stringify(results)
          /* `Buscando por query: ${JSON.stringify({
            searchQuery,
            start,
            limit
          })}\rResultados: ${JSON.stringify(results) || "Sin resultados"}` */
        );
        break;
      case "get":
        const { foodCode: foodCodeQuery } = query;
        const result = foodData.find(
          ({ foodCode }) => foodCode == foodCodeQuery
        );
        response.end(JSON.stringify(result)
          /* `Buscando por id: ${foodCodeQuery}; ${JSON.stringify(result) ||
            "ningun resultado"}` */
        );
        break;
      default:
        response.end(JSON.stringify(endpoint));
        break;
    }
  }
});

const port = process.env.PORT || 7777;
server.listen(port, () => console.log(`Server listening at port ${port}`));
