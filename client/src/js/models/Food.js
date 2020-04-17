export default class {
  constructor(foodCode) {
    this.foodCode = foodCode;
  }

  async getDetails() {
    const response = await fetch(`/api/get?foodCode=${this.foodCode}`);
    const data = await response.json();
    for (const key in data) {
      if (data.hasOwnProperty(key)) this[key] = data[key];
    }
  }
}