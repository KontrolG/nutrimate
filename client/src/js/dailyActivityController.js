import { elements } from "./views/base";
import DailyActivity from "./models/DailyActivity";
import * as activityView from "./views/dailyActivityView";
import { changeCurrentSectionTo } from "./views/navigationView";

const loadDailyActivity = event => {
  const todayDate = new Date().toDateString();
  setupDailyActivity(todayDate);
};

const setupDailyActivity = date => {
  globals.state.dailyActivity = new DailyActivity(date);
  displayActivityMeals();
  updateDailyActivity();
};

const displayActivityMeals = () => {
  const { dailyActivity } = globals.state;
  dailyActivity.retrieveActivity();
  if (!dailyActivity.isEmpty()) renderFoodsAte();
};

const renderFoodsAte = () => {
  const { meals } = globals.state.dailyActivity;
  activityView.clearMeals();
  Object.entries(meals).forEach(renderMealFoods);
};

const renderMealFoods = ([meal, foods]) => {
  foods.forEach(food => activityView.renderFood(food, meal));
};

const updateDailyActivity = () => {
  updateCaloriesMeter();
  updateTotalMacros();
};

const updateCaloriesMeter = () => {
  updateTotalCalories();
  updateActivityGraph();
};

const updateTotalCalories = () => {
  const caloriesAmount = globals.state.dailyActivity.getCaloriesAmount();
  activityView.changeTotalCalories(caloriesAmount);
};

const updateActivityGraph = () => {
  const mealsPercentages = globals.state.dailyActivity.getPercentagesPerMeals();
  const graphValues = getGraphValuesFromMealsPercentages(mealsPercentages);
  activityView.changeActivityGraph(graphValues);
};

const getGraphValuesFromMealsPercentages = mealsPercentages => {
  const initialGraphValues = {};
  return Object.entries(mealsPercentages).reduce(
    toGraphValues,
    initialGraphValues
  );
};

const toGraphValues = (graphValues, [meal, percentage]) => {
  const color = getMealColor(meal);
  graphValues[meal] = { color, percentage };
  return graphValues;
};

const getMealColor = meal => {
  const colors = {
    breakfast: "rgb(106, 184, 255)", // blue
    lunch: "rgb(255, 181, 72)", // orange
    dinner: "rgb(255, 119, 226)", // pink
    snack: "rgb(130, 106, 249)" // purple
  };
  return colors[meal];
};

const updateTotalMacros = () => {
  // obtener el total de cada macro
  // modificar el valor de los macros.
};

/* ADD FOOD */
const handleAddFood = event => {
  const { target } = event;
  if (!activityView.isMealSelector(target)) return;
  const { mealName } = target.dataset;
  addFood(globals.state.food, mealName);
  showMealChanges(mealName);
};

const addFood = (food, mealName) => {
  globals.state.dailyActivity.addFood(food, mealName);
  activityView.renderFood(food, mealName);
};

const showMealChanges = mealName => {
  updateDailyActivity();
  activityView.changeActivityFoodList(mealName);
  changeCurrentSectionTo("activitySection");
};

window.addEventListener("load", loadDailyActivity);
elements.foodAddSwapper.addEventListener("click", handleAddFood);

/* elements.dateInput.addEventListener("change", changeDailyActivity);


[...elements.activityMealsSwapperBtns].forEach(button =>
  button.addEventListener("click", toggleMealsList)
); */ // Cambiar mealTbody, Implementar con event delegation