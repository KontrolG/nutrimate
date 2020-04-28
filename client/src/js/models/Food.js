export default class {
  constructor(foodDataCentralID) {
    this.fdcId = foodDataCentralID;
  }

  async fetchDetails() {
    const response = await fetch(`/api/get?fdcId=${this.fdcId}`);
    const data = await response.json();
    /* for (const key in data) {
      if (data.hasOwnProperty(key)) this[key] = data[key];
    } */
    this.description = data.description;
    this.portions = data.portions;
    this.nutrients = data.nutrients
      .sort((previous, next) => previous.rank - next.rank)
      .map(({ name, amount, unitName }) => ({
        name,
        amountPerGram: amount / 100,
        amount: amount,
        unitName
      }));
    this.quantity = 1;
    this.selectedPortionIndex = 0;
  }

  getNutrientByName(nutrientName) {return this.nutrients.find(({name}) => name === nutrientName) || {amount: "n/a"};}

  getNutrientByUnit(unitName) {return this.nutrients.find(nutrient => nutrient.unitName === unitName) || {amount: "n/a"};}

  getMacroNutrients() {
    const { amount: calories } = this.getNutrientByUnit("kcal");
    const { amount: protein } = this.getNutrientByName("Protein");
    const { amount: fat } = this.getNutrientByName("Total lipid (fat)");
    const { amount: carbs } = this.getNutrientByName("Carbohydrate, by difference");
    const { amount: fiber } = this.getNutrientByName("Fiber, total dietary");
    return {calories, protein, fat, carbs, fiber};
  }
  
  // En javascript los accesors son por dot o bracket notation. Esto es redundante.
  getCurrentPortion() {return this.portions[this.selectedPortionIndex] || {gramWeight: 1};}

  setQuantity(quantity) {this.quantity = quantity}
  
  setSelectedPortionIndex(selectedPortionIndex) {this.selectedPortionIndex = selectedPortionIndex}

  updateNutrients() {
    const { nutrients, quantity } = this;
    const { gramWeight } = this.getCurrentPortion();
    const totalGrams = gramWeight * quantity;
    nutrients.forEach(
      nutrient =>
        nutrient.amount = nutrient.amountPerGram * totalGrams
    );
  }
}