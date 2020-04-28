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

  findNutrientBy(key, value, nutrients) {
    return nutrients.find(nutrient => nutrient[key] === value);
  }

  getMacroNutrientsFrom(nutrients) {
    const calories = this.findNutrientBy("unitName", "kcal", nutrients);
    const protein = this.findNutrientBy("name", "Protein", nutrients);
    const carbohydrate = this.findNutrientBy(
      "name",
      "Carbohydrate, by difference",
      nutrients
    );
    const fat = this.findNutrientBy("name", "Total lipid (fat)", nutrients);
    const fiber = this.findNutrientBy(
      "name",
      "Fiber, total dietary",
      nutrients
    );
    return [calories, protein, carbohydrate, fat, fiber];
  }

  calculateAmount(nutrient, gramWeight) {
    const { name, amount, unitName } = nutrient;
    const calculatedAmount = (amount / 100) * gramWeight;
    return {
      name,
      amount: calculatedAmount,
      unitName
    };
  }
  
  calculateMacroNutrients(nutrients, portion) {
    const { gramWeight } = portion;
    return this.getMacroNutrientsFrom(nutrients)
               .map(macronutrient => this.calculateAmount(macronutrient, gramWeight));
  };

  reduceProperties(food) {
    const { fdcId, description, portions, nutrients } = food;
    const portion = portions[0];
    const [
      calories,
      protein,
      carbohydrate,
      fat
     ] = this.calculateMacroNutrients(nutrients, portion);

    return {
      fdcId,
      description,
      portion,
      calories,
      protein,
      carbohydrate,
      fat
    };
  }

  getResultsFromSearch(searchPattern, start, limit) {
    const searchRegExp = new RegExp(searchPattern, "gi");
    return this.foods
      .filter(food => searchRegExp.test(food.description))
      .slice(start, start + limit)
      .map(this.reduceProperties, this);
  }

  getFoodById(fdcId) {
    return this.foods.find(food => food.fdcId === fdcId);
  }
};