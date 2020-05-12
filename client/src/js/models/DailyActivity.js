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

  getFoodCaloriesBalance(food) {
    const caloriesAmount = food.calories.amount;
    const { currentTotal, caloriesGoal } = this.getCaloriesAmount();
    const { remainingCalories } = this.getCaloriesWithFood(
      currentTotal, caloriesAmount, caloriesGoal
    );
    return this.getBalancePercentages(
      caloriesGoal,
      currentTotal,
      caloriesAmount,
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
    for (const meal of Object.entries(this.meals)) {
      this.setMealCalories(caloriesPerMeal, meal);
    }
    return caloriesPerMeal;
  }

  setMealCalories(caloriesPerMeal, [mealName, foods]) {
    caloriesPerMeal[mealName] = this.getCaloriesFromFoods(foods);
  }

  getCaloriesFromFoods(foods) {
    const initialMealCalories = 0;
    const { toMealCalories } = this;
    return foods.reduce(toMealCalories, initialMealCalories);
  }

  toMealCalories(mealCalories, food) {
    return mealCalories += food.calories.amount;
  }

  getCaloriesWithFood(currentTotal, caloriesAmount, caloriesGoal) {
    const newTotal = currentTotal + caloriesAmount;
    let remainingCalories = caloriesGoal - newTotal;
    if (remainingCalories < 0) remainingCalories = 0;
    return { newTotal, remainingCalories };
  }

  getBalancePercentages(caloriesGoal, currentTotal, caloriesAmount, remainingCalories) {
    const modulus = caloriesGoal / 100;
    const now = currentTotal / modulus;
    const food = caloriesAmount / modulus;
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

  getPercentagesPerMeals() {
    const caloriesPerMeal = this.getCaloriesPerMeal();
    const { currentTotal, caloriesGoal } = this.getCaloriesAmount();
    const initialPercentagesPerMeal = {};
    const percentageDivider =
      currentTotal > caloriesGoal ? currentTotal : caloriesGoal;

    const toPercentagesPerMeal = (
      percentagesPerMeal,
      [mealName, mealCalories]
    ) => {
      const mealPercentage = (mealCalories / percentageDivider) * 100;
      console.log(
        "Linea: 88: ¿como es mejor? (Limpiar)",
        mealPercentage,
        mealCalories / (percentageDivider / 100)
      );
      percentagesPerMeal[mealName] = mealPercentage;
      return percentagesPerMeal;
    };

    return Object.entries(caloriesPerMeal).reduce(
      toPercentagesPerMeal,
      initialPercentagesPerMeal
    );
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
    const newFood = { id: this.foodCurrentId++ };
    // Al cambiar los arrays desde este nuevo objeto se puede cambiar el original
    // Implementar metodo statico para modificar sin alterar el original.
    Object.assign(newFood, food);
    this.meals[mealName].push(newFood);
    this.saveChanges();
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