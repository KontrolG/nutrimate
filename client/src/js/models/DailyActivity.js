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
    const currentTotal = this.getCurrentCaloriesTotal();
    const { caloriesGoal } = this;
    return { currentTotal, caloriesGoal };
  }

  getCurrentCaloriesTotal() {
    const caloriesPerMeal = this.getCaloriesPerMeal();
    return this.getCaloriesTotalFromMeals(caloriesPerMeal);
  }

  getCaloriesTotalFromMeals(caloriesPerMeal) {
    const initialTotal = 0;
    const { toCaloriesTotal } = this;
    return Object.values(caloriesPerMeal).reduce(
      toCaloriesTotal,
      initialTotal
    );
  }

  toCaloriesTotal(caloriesTotal, mealCalories) {
    return (caloriesTotal += mealCalories);
  }

  getCaloriesPerMeal() {
    const caloriesPerMeal = {};
    for (const [mealName, foods] of Object.entries(this.meals)) {
      caloriesPerMeal[mealName] = this.getCaloriesFromFoods(foods);
    }
    return caloriesPerMeal;
  }

  getCaloriesFromFoods(foods) {
    const initialMealCalories = 0;
    const { toMealCalories } = this;
    return foods.reduce(toMealCalories, initialMealCalories);
  }

  toMealCalories(mealCalories, food) {
    return mealCalories += food.calories.amount;
  }

  getCaloriesPlusFood(foodCalories) {
    const newTotal = this.getCurrentCaloriesTotal() + foodCalories;
    let remainingCalories = this.caloriesGoal - newTotal;
    if (remainingCalories < 0) remainingCalories = 0;
    return { newTotal, remainingCalories };
  }

  getBalancePercentages(foodCalories, remainingCalories) {
    const modulus = this.caloriesGoal / 100;
    const now = this.getCurrentCaloriesTotal() / modulus;
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
    const caloriesPerMeal = this.getCaloriesPerMeal();
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