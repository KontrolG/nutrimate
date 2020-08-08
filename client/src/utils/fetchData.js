import { protocol, hostname, port } from "./apiConfiguration";

const fetchData = async (url, parameters) => {
  const requestUrl = getRequestUrl(url, parameters);
  console.log(requestUrl);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
};

const getRequestUrl = (url, parameters) => {
  const completeUrl = getCompleteUrl(url);
  if (parameters) {
    return getUrlWithSearchParameters(completeUrl, parameters);
  }
  return completeUrl;
};

const getCompleteUrl = path =>
  new URL(`${protocol}://${hostname}:${port}/${path}`);

const getUrlWithSearchParameters = (completeUrl, parameters) => {
  addParametersToUrl(completeUrl, parameters);
  return completeUrl.pathname + completeUrl.search; // Development
  return url.href; // Production
};

const addParametersToUrl = (url, parameters) => {
  url.search = "";
  url.href += getSearchString(parameters);
};

const getSearchString = parameters => {
  return (
    "?" +
    Object.entries(parameters)
      .map(toParameterStrings)
      .join("&")
  );
};

const toParameterStrings = entry => {
  return entry.join("=");
};

export default fetchData;
