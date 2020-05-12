module.exports = class {
  constructor() {
    this.foods = [];
    this.fallbackNutrient = {
      amount: 0,
      unitName: null
    };
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
      .slice(start, start + limit)
      .map(this.reduceProperties, this);
  }

  reduceProperties(food) {
    const { fdcId, description, portions, nutrients } = food;
    const portion = portions[0];
    const [calories, protein, carbohydrate, fat] = this.calculateMacroNutrients(
      nutrients,
      portion
    );

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

  calculateMacroNutrients(nutrients, portion) {
    const { gramWeight } = portion;
    return this.getMacroNutrientsFrom(nutrients).map(macronutrient =>
      this.calculateAmount(macronutrient, gramWeight)
    );
  }

  getMacroNutrientsFrom(nutrients) {
    const calories = this.findNutrientBy("unitName", "kcal", nutrients);
    const protein = this.findNutrientBy("name", "Protein", nutrients);
    const carbohydrate = this.findNutrientBy("name", "Carbohydrate", nutrients);
    const fat = this.findNutrientBy("name", "Total lipid", nutrients);
    return [calories, protein, carbohydrate, fat];
  }

  findNutrientBy(key, value, nutrients) {
    const regularExpression = new RegExp(value, "gi");
    return (
      nutrients.find(nutrient => regularExpression.test(nutrient[key])) ||
      this.fallbackNutrient
    );
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

  getFoodById(fdcId) {
    const food = this.foods.find(food => food.fdcId === fdcId);
    this.removeKiloJoulesNutrient(food);
    return food;
  }

  removeKiloJoulesNutrient(food) {
    const { kiloJoulesNutrient } = this;
    food.nutrients = food.nutrients.filter(kiloJoulesNutrient);
  }

  kiloJoulesNutrient(nutrient) {
    return nutrient.unitName !== "kj";
  }
};