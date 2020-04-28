export default class {
  constructor(query) {
    this.query = query;
    this.results = [];
  }

  async fetchResults() {
    try {
      const response = await fetch(
        `/api/search?q=${this.query}&start=${this.results.length}`
      );
      const responseResults = await response.json();
      this.results.push(...responseResults);
      return responseResults;
    } catch (error) {
      alert("There is an connection error!");
    }
  }
}