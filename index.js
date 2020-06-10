const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
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
  let requestedFile = null;
  if (pathname === "/") requestedFile = "/index.html";
  else if (isStatic(pathname)) requestedFile = pathname.substr(1);
  
  if (pathname.startsWith("/api")) {
    const requestedEndpoint = pathname.replace("/api/", "");
    try {
      apiRoutes[requestedEndpoint](request, response, query, foodData);
    } catch (error) {
      console.log(error);
    // Error humano: Escribir mal el endpoint.
      pageNotFoundError(response);
    }
  } else if (requestedFile) {
    serveStatic(requestedFile, response);
  }
   else pageNotFoundError(response); // Cuando no ingrese a /api MEJORAR.
});

const isStatic = pathname => path.extname(pathname) !== "";

const serveStatic = (requestedFile, response) => {
  fs.readFile(`${__dirname}/client/dist/${requestedFile}`, (error, data) => {
    if (error) return pageNotFoundError(response);
    response.end(data);
  });
};

const port = process.env.PORT || 7777;
server.listen(port, () => console.log(`Server listening at port ${port}`));
