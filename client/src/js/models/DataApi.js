import { protocol, hostname, port, pathname } from "../apiConfiguration";

export default class {
  constructor(endpoint) {
    const url = new URL(
      `${protocol}://${hostname}:${port}/${pathname}/${endpoint}`
    );
    
    // Estudiar...
    this.getUrlWithSearchParams = parameters => {
      Object.entries(parameters).forEach(this.setSearchParam, url);
      return url.href;
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
    const url = this; // this modified by Array.prototype.forEach method.
    url.searchParams.set(name, value);
  }
}