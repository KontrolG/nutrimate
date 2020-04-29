import DataApi from "./DataApi";

export default class extends DataApi {
  constructor(searchQuery) {
    super("search");
    this.searchQuery = searchQuery;
    this.results = [];
  }

  async fetchResults() {
    try {
      return await this.getReponseResults();
    } catch (error) {
      this.connectionError(error);
    }
  }

  async getReponseResults() {
    const { searchQuery, results } = this;
    const parameters = { q: searchQuery, start: results.length };
    const responseResults = await this.fetchData(parameters);
    results.push(...responseResults);
    return responseResults;
  }

  connectionError(error) {
    console.log(error);
    alert("There is an connection error!");
  }
}