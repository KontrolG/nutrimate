import * as foodView from "./views/foodView";
import Food from "./models/Food";
import { changeSection } from "./views/navigationView";
import { highlightSelected } from "./views/searchView";
import { elements, toggleHideShow, hide } from "./views/base";

const calculateBalanceValues = () => {
  const { currentTotal, caloriesGoal } = globals.state.dailyActivity.getFoodCaloriesBalance();
  const { calories } = globals.state.food;
  const remaining = caloriesGoal - (currentTotal + calories);

  return {
    currentTotal, calories, remaining, caloriesGoal
  }
}
const changeBalanceValues = () => foodView.changeCaloriesBalanceValues(calculateBalanceValues());

const fetchFoodController = async e => {
  const foodCode = window.location.hash.replace("#", "");
  if (foodCode) {
    // Prepare UI && Change view
    changeSection("foodSection");
    highlightSelected(foodCode);
    // Loader
    foodView.clearFood();
    

    // Get the data
    globals.state.food = new Food(foodCode);
    await globals.state.food.getDetails();

    // Display the data
    foodView.renderFood(globals.state.food);

    // Change balance
    changeBalanceValues();
    console.log(calculateBalanceValues());
  }
}

const toggleAddPopup = e => toggleHideShow(elements.foodAddPopup);

const handleFoodAddBtnBlur = e => {
  console.log(e.target.matches());
  if (!e.target) {
    hide(elements.foodAddPopup);
  }
}

window.state = globals.state;

["load", "hashchange"].forEach(type => window.addEventListener(type, fetchFoodController));
elements.foodAddBtn.addEventListener("click", toggleAddPopup);
// window.addEventListener("click", handleFoodAddBtnBlur);