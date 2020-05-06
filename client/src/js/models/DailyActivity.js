export default class {
  constructor(date, caloriesGoal = 2000) {
    this.date = date;
    this.currentID = 0;
    this.caloriesGoal = caloriesGoal;
    this.meals = {
      "breakfast": [],
      "lunch": [],
      "dinner": [],
      "snack": []
    }
  }

  addFood(food, mealName) {
    food.id = this.currentID;
    this.currentID++;
    this.meals[mealName].push(food);
    this.saveChanges();
  }

  getFoodCaloriesBalance({calories}) {
    const { currentTotal, caloriesGoal } = this.getCaloriesAmount();
    const caloriesAmount = calories.amount;
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
    const currentTotal = this.getCurrentCaloriesCount();
    const { caloriesGoal } = this;
    return {
      currentTotal,
      caloriesGoal
    }
  }

  getCurrentCaloriesCount() {
    let currentTotal = 0;
    for (const meal in this.meals) {
      if (this.meals.hasOwnProperty(meal)) {
        const mealTotal = this.meals[meal].reduce((total, {calories}) => total + calories, 0);
        currentTotal += mealTotal;
      }
    }
    return currentTotal;
  }

  getFoodsAddedCount() {
    let foodsCount = 0;
    for (const meal in this.meals) {
      if (this.meals.hasOwnProperty(meal)) foodsCount += this.meals[meal].length;
    }
    return foodsCount;
  }

  isEmpty() {
    return this.getFoodsAddedCount() === 0;
  }

  retrieveActivity() {
    const activities = this.getActivities();
    if (!activities.length) return;
    const activityItem = activities.find(
      activity => activity.date === this.date
    );
    if (!activityItem) return;
    for (const key in activityItem)
      if (activityItem.hasOwnProperty(key)) this[key] = activityItem[key];
  }

  getActivities() {
    const storageActivities = localStorage.getItem("activities");
    return storageActivities ? JSON.parse(storageActivities) : [];
  }

  putActivity(activities) {
    /* Usar segundo parametro del find */
    const itemIndex = activities.findIndex(activity => activity.date === this.date);
    if (itemIndex >= 0) activities[itemIndex] = this;
    else activities.push(this);
  }

  saveChanges() {
    const activities = this.getActivities();
    this.putActivity(activities);
    localStorage.setItem("activities", JSON.stringify(activities));
  }
}