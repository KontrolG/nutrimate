const fs = require("fs");
const http = require("http");
const url = require("url");
const apiRoutes = require("./routes");
const FoodData = require("./model");

const getDataFromJSON = dataName => {
  const dataJSON = fs.readFileSync(`${__dirname}/data/${dataName}Data.json`, "utf8");
  return JSON.parse(dataJSON);
}

const foodData = new FoodData();
foodData.addData(getDataFromJSON("foundation"));
foodData.addData(getDataFromJSON("survey"));
foodData.addData(getDataFromJSON("legacy"));

const sendMessage = (response, code, message) => {
  response.writeHead(code);
  response.end(message);
}

const server = http.createServer((request, response) => {
  const requestedUrl = url.parse(request.url, true);
  const { pathname, query } = requestedUrl;

  const rootPathRegExp = new RegExp(/^\/api\//);
  const pageNotFoundError = () => sendMessage(response, 404, "Page not Found"); 

  if (rootPathRegExp.test(pathname)) {
    const requestedEndpoint = pathname.replace(rootPathRegExp, "");
    try {
      apiRoutes[requestedEndpoint](request, response, query, foodData);      
    } catch (error) {
    // Error humano: Escribir mal el endpoint.
      pageNotFoundError();
    }
  } else pageNotFoundError(); // Cuando no ingrese a /api MEJORAR.
});

const port = process.env.PORT || 7777;
server.listen(port, () => console.log(`Server listening at port ${port}`));
