module.exports = class {
  constructor() {
    this.foods = [];
  }

  addFood(food) {
    this.foods.push(food);
  }

  addData(data) {
    data.forEach(this.addFood, this);
  }

  getResultsFromSearch(searchPattern, start, limit) {
    const searchRegExp = new RegExp(searchPattern, "gi");
    return this.foods
            .filter(food => searchRegExp.test(food.description))
            .slice(start, start + limit);
  }
};