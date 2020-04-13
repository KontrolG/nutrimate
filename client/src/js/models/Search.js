export default class {
  constructor(query) {
    this.query = query;
    this.results = [];
  }

  async fetchResults() {
    console.log(this.results.length);
    const response = await fetch(`/api/search?q=${this.query}&start=${this.results.length}`);
    const results = await response.json();
    this.results.push(...results);
    console.log(results);
    return results;
  }
}