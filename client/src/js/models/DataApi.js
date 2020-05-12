import { protocol, hostname, port, pathname } from "../apiConfiguration";

export default class {
  constructor(endpoint) {
    const url = new URL(
      `${protocol}://${hostname}:${port}/${pathname}/${endpoint}`
    );
    
    // Estudiar...
    this.getUrlWithSearchParameters = parameters => {
      this.addParametersToUrl(url, parameters);
      return url.pathname + url.search; // Development
      return url.href; // Production
    };
  }

  addParametersToUrl(url, parameters) {
    url.search = "";
    url.href += this.getSearchString(parameters);
  }

  getSearchString(parameters) {
    const { toParameterStrings } = this;
    return "?" + Object.entries(parameters)
      .map(toParameterStrings)
      .join("&");
  }

  toParameterStrings(entry) {
    return entry.join("=");
  }

  async fetchData(parameters) {
    const requestUrl = this.getUrlWithSearchParameters(parameters);
    console.log(requestUrl);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  }
}