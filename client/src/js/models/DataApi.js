import { protocol, hostname, port, pathname } from "../apiConfiguration";

export default class {
  constructor(endpoint) {
    this.url = new URL(
      `${protocol}://${hostname}:${port}/${pathname}/${endpoint}`
    );
  }

  async fetchData(parameters) {
    const requestUrl = this.getUrlWithSearchParams(parameters);
    console.log(requestUrl);
    const response = await fetch(requestUrl);
    return await response.json();
  }

  getUrlWithSearchParams(parameters) {
    Object.entries(parameters).forEach(this.setSearchParam, this);
    return this.url;
  }

  setSearchParam([name, value]) {
    this.url.searchParams.set(name, value);
  }
}