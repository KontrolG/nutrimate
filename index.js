const http = require("http");
const url = require("url");
const apiRoutes = require("./routes");
const FoodData = require("./model");
const { getDataFromJSON, pageNotFoundError } = require("./utils");

const foodData = new FoodData();
foodData.addData(getDataFromJSON("foundation"));
foodData.addData(getDataFromJSON("survey"));
foodData.addData(getDataFromJSON("legacy"));

const server = http.createServer((request, response) => {
  const requestedUrl = url.parse(request.url, true);
  const { pathname, query } = requestedUrl;

  const rootPathRegExp = new RegExp(/^\/api\//);

  if (rootPathRegExp.test(pathname)) {
    const requestedEndpoint = pathname.replace(rootPathRegExp, "");
    try {
      apiRoutes[requestedEndpoint](request, response, query, foodData);
    } catch (error) {
      console.log(error);
    // Error humano: Escribir mal el endpoint.
      pageNotFoundError(response);
    }
  } else pageNotFoundError(response); // Cuando no ingrese a /api MEJORAR.
});

const port = process.env.PORT || 7777;
server.listen(port, () => console.log(`Server listening at port ${port}`));
