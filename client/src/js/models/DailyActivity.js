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

  getFoodCaloriesBalance() {
    const currentTotal = this.getCurrentCaloriesCount();
    const { caloriesGoal } = this;
    return {
      currentTotal,
      caloriesGoal
    };
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