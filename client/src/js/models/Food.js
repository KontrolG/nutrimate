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
        amount: this.fixAmount(amount),
        unitName
      }));
    this.quantity = 1;
    this.selectedPortionIndex = 0;
  }

  getNutrientByName(nutrientName) {return this.nutrients.find(({name}) => name === nutrientName);}
  getMacroNutrients() {
    const calories = this.getNutrientByName("Energy");
    const protein = this.getNutrientByName("Protein");
    const fat = this.getNutrientByName("Total lipid (fat)");
    const carbs = this.getNutrientByName("Carbohydrate, by difference");
    const fiber = this.getNutrientByName("Fiber, total dietary");
    return [calories, protein, fat, carbs, fiber];
  }
  
  getCurrentPortion() {return this.portions[this.selectedPortionIndex] || {gramWeight: 1};}

  setQuantity(quantity) {this.quantity = quantity}
  setSelectedPortionIndex(selectedPortionIndex) {this.selectedPortionIndex = selectedPortionIndex}

  fixAmount(amount, decimals = 1) {return parseFloat(amount.toFixed(decimals));}

  updateNutrients() {
    const { nutrients, quantity } = this;
    const { gramWeight } = this.getCurrentPortion();
    const totalGrams = gramWeight * quantity;
    nutrients.forEach(
      nutrient =>
        (nutrient.amount = this.fixAmount(nutrient.amountPerGram * totalGrams))
    );
  }
}