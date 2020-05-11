import { protocol, hostname, port, pathname } from "../apiConfiguration";

export default class {
  constructor(endpoint) {
    const url = new URL(
      `${protocol}://${hostname}:${port}/${pathname}/${endpoint}`
    );
    
    // Estudiar...
    this.getUrlWithSearchParams = parameters => {
      const searchParamsIsAvailible = url.searchParams !== undefined;
      if (searchParamsIsAvailible) {
        Object.entries(parameters).forEach(this.setSearchParam, url);
      } else {
        this.addParametersToUrl(url, parameters);
      }
      /* return url.href; // Production */
      return url.pathname + url.search; // Development
    };
  }

  async fetchData(parameters) {
    const requestUrl = this.getUrlWithSearchParams(parameters);
    console.log(requestUrl);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  }

  setSearchParam([name, value]) {
    const url = this; // thisObject modified by Array.prototype.forEach method.
    url.searchParams.set(name, value);
  }

  addParametersToUrl(url, parameters) {
    const toParameterStrings = entry => entry.join("=");
    const searchString = "?" + 
      Object.entries(parameters).map(toParameterStrings).join("&");
    url.href += searchString;
  }
}