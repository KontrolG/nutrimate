import Storage from "./Storage";

export default class extends Storage {
  constructor(date, caloriesGoal = 2000) {
    super("activities");
    this.date = date;
    this.foodCurrentId = 0;
    this.caloriesGoal = caloriesGoal;
    this.meals = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    };
  }

  getFoodCaloriesBalance({calories}) {
    const foodCalories = calories.amount;
    const { remainingCalories } = this.getCaloriesPlusFood(foodCalories);
    return this.getBalancePercentages(
      foodCalories,
      remainingCalories
    );
  }

  getCaloriesAmount() {
    const currentTotal = this.getNutrientTotal("calories");
    const { caloriesGoal } = this;
    return { currentTotal, caloriesGoal };
  }

  getNutrientTotal(nutrientName) {
    const nutrientPerMeal = this.getNutrientPerMeal(nutrientName);
    return this.getNutrientTotalFromMeals(nutrientPerMeal);
  }

  getNutrientPerMeal(nutrientName) {
    const nutrientPerMeal = {};
    for (const [mealName, foods] of Object.entries(this.meals)) {
      nutrientPerMeal[mealName] = this.getNutrientFromFoods(foods, nutrientName);
    }
    return nutrientPerMeal;
  }

  getNutrientFromFoods(foods, nutrientName) {
    let mealNutrientAmount = 0;
    for (const food of foods) {
      mealNutrientAmount += food[nutrientName].amount;
    }
    return mealNutrientAmount;
  }

  getNutrientTotalFromMeals(nutrientPerMeal) {
    const initialTotal = 0;
    const { toNutrientTotal } = this;
    return Object.values(nutrientPerMeal).reduce(
      toNutrientTotal,
      initialTotal
    );
  }

  toNutrientTotal(nutrientTotal, mealNutrient) {
    return (nutrientTotal += mealNutrient);
  }

  getCaloriesPlusFood(foodCalories) {
    const newTotal = this.getNutrientTotal("calories") + foodCalories;
    let remainingCalories = this.caloriesGoal - newTotal;
    if (remainingCalories < 0) remainingCalories = 0;
    return { newTotal, remainingCalories };
  }

  getBalancePercentages(foodCalories, remainingCalories) {
    const modulus = this.caloriesGoal / 100;
    const now = this.getNutrientTotal("calories") / modulus;
    const food = foodCalories / modulus;
    const remaining = remainingCalories / modulus;
    return { now, food, remaining };
  }

  getFoodsAddedCount() {
    const initialCount = 0;
    const { meals, toFoodsCount } = this;
    return Object.values(meals).reduce(toFoodsCount, initialCount);
  }

  toFoodsCount(count, mealFoods) {
    return count += mealFoods.length;
  }

  getPercentagesPerMeal() {
    const caloriesPerMeal = this.getNutrientPerMeal("calories");
    const percentagesPerMeal = {};
    const modulus = this.getPercentageDivider() / 100;

    for (const [mealName, mealCalories] of Object.entries(caloriesPerMeal)) {
      const mealPercentage = (mealCalories / modulus);
      percentagesPerMeal[mealName] = mealPercentage;
    };

    return percentagesPerMeal;
  }

  getPercentageDivider() {
    const { currentTotal, caloriesGoal } = this.getCaloriesAmount();
    return currentTotal > caloriesGoal ? currentTotal : caloriesGoal;
  }

  getMacronutrientsTotals() {
    const macronutrientsNames = ["protein", "carbohydrate", "fat", "fiber"];
    const macronutrientTotals = {};
    for (const nutrientName of macronutrientsNames) {
      macronutrientTotals[nutrientName] = this.getNutrientTotal(nutrientName);      
    }
    return macronutrientTotals;
  }

  retrieveActivity() {
    const storedActivity = this.getStoredActivity();
    if (storedActivity) {
      this.setDetails(storedActivity);
    }
  }

  getStoredActivity() {
    const activities = this.retrieve();
    if (!activities) return;
    return activities.find(this.hasSameDate, this);
  }

  hasSameDate(activity) {
    return activity.date === this.date;
  }

  setDetails(storedActivity) {
    Object.assign(this, storedActivity);
  }

  isEmpty() {
    return this.getFoodsAddedCount() === 0;
  }

  addFood(food, mealName) {
    // Al cambiar los arrays desde este nuevo objeto se puede cambiar el original
    // Implementar metodo statico para modificar sin alterar el original.
    const newFood = this.getNewFoodItem(food);
    this.meals[mealName].push(newFood);
    this.saveChanges();
  }

  getNewFoodItem(food) {
    const item = { id: this.foodCurrentId++ };
    return Object.assign(item, food);
  }

  saveChanges() {
    const activities = this.retrieve() || [];
    this.putActivity(activities);
    this.save(activities);
  }

  putActivity(activities) {
    const activityIndex = activities.findIndex(this.hasSameDate, this);
    const activityFound = activityIndex !== -1;
    if (activityFound) activities[activityIndex] = this;
    else activities.push(this);
  }
}