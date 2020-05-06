import DataApi from './DataApi';

export default class extends DataApi {
  constructor(foodDataCentralID) {
    super("get");
    this.fdcId = foodDataCentralID;
  }

  async fetchDetails() {
    const { fdcId } = this;
    const data = await this.fetchData({fdcId});
    this.setDetails(data);
  }

  setDetails(data) {
    /* data.nutrients = data.nutrients
      .sort(this.byRank)
      .map(this.calculateAmountPerGram);
    const macroNutrients = this.getMacroNutrients(); */
    this.description = data.description;
    this.portions = data.portions;
    this.nutrients = data.nutrients.sort(this.byRank)
      .map(this.calculateAmountPerGram);
    this.setMacroNutrients();
    this.quantity = 1;
    this.selectedPortionIndex = 0;
  }

  byRank(previous, next) {
    return (previous.rank - next.rank);
  }

  calculateAmountPerGram(nutrient) {
    const { name, amount, unitName } = nutrient;
    return {
      name,
      amountPerGram: amount / 100,
      amount,
      unitName
    };
  }

  setMacroNutrients() {
    const macroNutrients = this.getMacroNutrients();
    Object.assign(this, macroNutrients);
  }

  /* Seria complicado al pasarlo al dailyActivity, comprobar luego.
  Considerado mala practica por Google.
  get calories() {this.findNutrientBy("unitName", "kcal");}
  get protein() {this.findNutrientBy("name", "Protein");}
  get carbohydrate() {this.findNutrientBy("name", "Carbohydrate");}
  get fat() {this.findNutrientBy("name", "Total lipid");}
  get fiber() {this.findNutrientBy("name", "Fiber");} */
   
  getMacroNutrients() {
    const calories = this.findNutrientBy("unitName", "kcal");
    const protein = this.findNutrientBy("name", "Protein");
    const carbohydrate = this.findNutrientBy("name", "Carbohydrate");
    const fat = this.findNutrientBy("name", "Total lipid");
    const fiber = this.findNutrientBy("name", "Fiber");
    return {calories, protein, carbohydrate, fat, fiber};
  }

  findNutrientBy(key, value) {
    const regularExpression = new RegExp(value, "gi");
    return (
      this.nutrients.find(nutrient =>
        regularExpression.test(nutrient[key])
      ) || {
        amount: 0,
        unitName: null
      });
  }
  
  /* get currentPortion() {
    return this.portions[this.selectedPortionIndex] || { gramWeight: 1 };
  } */

  getCurrentPortion() {
    return this.portions[this.selectedPortionIndex] || { gramWeight: 1 };
  }

  updateNutrients() {
    const { nutrients, quantity } = this;
    const { gramWeight } = this.getCurrentPortion();
    const totalGrams = gramWeight * quantity;
    nutrients.forEach(nutrient =>
      nutrient.amount = nutrient.amountPerGram * totalGrams
    );
  }
}