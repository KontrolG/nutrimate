import Storage from "./Storage";

export default class extends Storage {
  constructor(date, caloriesGoal = 2000) {
    super("activities");
    this.date = date;
    this.foodCurrentId = 0;
    this.caloriesGoal = caloriesGoal;
    this.meals = {
      "breakfast": [],
      "lunch": [],
      "dinner": [],
      "snack": []
    }
  }

  getFoodCaloriesBalance(food) {
    const caloriesAmount = food.calories.amount;
    // REDUNDANTE????????? ESTUDIAR
    const { currentTotal, caloriesGoal } = this.getCaloriesAmount();
    // Values
    const newTotal = currentTotal + caloriesAmount;
    let remaining = caloriesGoal - newTotal;
    if (remaining < 0) remaining = 0;
    // Percentages 
    const modulus = caloriesGoal / 100;
    return {
      now: (currentTotal / modulus),
      food: (caloriesAmount / modulus),
      remaining: (remaining / modulus)
    };
  }

  getCaloriesAmount() {
    const currentTotal = this.getCurrentCaloriesTotal();
    const { caloriesGoal } = this;
    return {
      currentTotal,
      caloriesGoal
    }
  }

  getCurrentCaloriesTotal() {
    const caloriesPerMeal = this.getCaloriesPerMeal();
    const initialTotal = 0;
    const toCaloriesTotal = (caloriesTotal, mealCalories) =>
      (caloriesTotal += mealCalories);
    return Object.values(caloriesPerMeal).reduce(toCaloriesTotal, initialTotal)
  }

  getCaloriesPerMeal() {
    const initialCaloriesPerMeal = {};
    const initialMealCalories = 0;

    const toMealCalories = (mealCalories, food) =>
      (mealCalories += food.calories.amount);

    const toCaloriesPerMeal = (caloriesPerMeal, [meal, foods]) => {
      const mealCalories = foods.reduce(toMealCalories, initialMealCalories);
      caloriesPerMeal[meal] = mealCalories;
      return caloriesPerMeal;
    };

    return Object.entries(this.meals).reduce(
      toCaloriesPerMeal,
      initialCaloriesPerMeal
    );
  }

  getFoodsAddedCount() {
    const initialCount = 0;
    const toFoodsCount = (count, mealFoods) => (count += mealFoods.length);
    return Object.values(this.meals).reduce(toFoodsCount, initialCount);
  }

  getPercentagesPerMeals() {
    const caloriesPerMeal = this.getCaloriesPerMeal();
    const { currentTotal, caloriesGoal } = this.getCaloriesAmount();
    const initialPercentagesPerMeal = {};
    const percentageDivider =
      currentTotal > caloriesGoal ? currentTotal : caloriesGoal;

    const toPercentagesPerMeal = (percentagesPerMeal, [mealName, mealCalories]) => {
      const mealPercentage = (mealCalories / percentageDivider) * 100;
      percentagesPerMeal[mealName] = mealPercentage;
      return percentagesPerMeal;
    }
    
    return Object.entries(caloriesPerMeal).reduce(
      toPercentagesPerMeal,
      initialPercentagesPerMeal
    );
  }

  retrieveActivity() {
    const activities = this.retrieve();
    if (!activities) return;
    const storedActivity = activities.find(this.hasSameDate, this);
    if (storedActivity) {
      this.setDetails(storedActivity);
    }
  }

  hasSameDate(activity) {
    return activity.date === this.date;
  }

  setDetails(storedActivity) {
    Object.entries(storedActivity)
          .forEach(([key, value]) => this[key] = value);
  }

  isEmpty() {
    return this.getFoodsAddedCount() === 0;
  }

  addFood(food, mealName) {
    const newFood = {id: this.foodCurrentId++};
    // Al cambiar los arrays desde este nuevo objeto se puede cambiar el original
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