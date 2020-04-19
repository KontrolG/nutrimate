import { elements } from "./views/base";
import DailyActivity from "./models/DailyActivity";
import * as activityView from "./views/dailyActivityView";
import { changeSection } from "./views/navigationView";

const updateTotalCalories = () => {
  const {
    currentTotal,
    caloriesGoal
  } = globals.state.dailyActivity.getFoodCaloriesBalance();
  activityView.updateCurrentCalories(currentTotal);
  activityView.updateCaloriesGoal(caloriesGoal);
}

const renderFoodsAteList = () => {
  const { meals } = globals.state.dailyActivity;
  activityView.clearLists();
  for (const meal in meals) {
    if (meals.hasOwnProperty(meal)) meals[meal].forEach(food => activityView.addFood(food, meal));
  }
}

const retrieveActivity = () => {
  const { dailyActivity } = globals.state;
  dailyActivity.retrieveActivity();
  if (!dailyActivity.isEmpty()) renderFoodsAteList();
}

const setupDailyActivity = date => {
  globals.state.dailyActivity = new DailyActivity(date);
  retrieveActivity();
  updateTotalCalories();
}

const loadDailyActivity = e => {
  const todayDate = new Date().toDateString();
  setupDailyActivity(todayDate);
}

const addFood = (food, mealName) => {
  globals.state.dailyActivity.addFood(food, mealName);
  activityView.addFood(food, mealName);
}

const handleAddFood = e => {
  const { mealName } = e.target.dataset;
  const { displayName, calories } = globals.state.food;
  const newFood = {
    displayName,
    calories
  };

  addFood(newFood, mealName);
  updateTotalCalories();
  activityView.changeActivityFoodList(mealName);
  changeSection("activitySection");
};

const toggleMealsList = e => {
  const { mealName } = e.target.dataset;
  activityView.changeActivityFoodList(mealName);
};

const getActivityDate = inputDate => {
  const date = new Date(inputDate);
  date.setHours(24);
  return date.toDateString();
}

const changeDailyActivity = e => {
  const inputDate = e.target.value;
  const activityDate = getActivityDate(inputDate);
  setupDailyActivity(activityDate);
}

window.addEventListener("load", loadDailyActivity);
elements.dateInput.addEventListener("change", changeDailyActivity);
elements.foodAddSwapper.addEventListener("click", handleAddFood);
[...elements.activityMealsSwapperBtns].forEach(button =>
  button.addEventListener("click", toggleMealsList)
);