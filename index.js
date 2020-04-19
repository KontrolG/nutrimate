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
        new Promise((resolve, reject) => {
          const { q: searchQuery } = query;
          const start = parseInt(query.start, 10) || 0;
          const limit = parseInt(query.limit, 10) || 10;
          const regExp = new RegExp(searchQuery, "gi");
          const results = foodData
            .filter(food => regExp.test(food.displayName))
            .slice(start, start + limit);
            resolve(results);
        }).then(results => {
          setTimeout(() => {
            response.writeHead(200, { "Content-type": "application/json" });
            response.end(JSON.stringify(results));
          }, 1000);
        });
        break;
      case "get":
        new Promise(resolve => setTimeout(() => {
          const result = foodData.find(
            ({ foodCode }) => foodCode == query.foodCode
          );
          resolve(result);
        }, 1000)).then(result => response.end(JSON.stringify(result)));
        break;
      default:
        response.end(JSON.stringify(endpoint));
        break;
    }
  }
});

const port = process.env.PORT || 7777;
server.listen(port, () => console.log(`Server listening at port ${port}`));
