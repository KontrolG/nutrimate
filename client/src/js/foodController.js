import * as foodView from "./views/foodView";
import Food from "./models/Food";
import { changeSection } from "./views/navigationView";
import { highlightSelected } from "./views/searchView";
import { elements, toggleHideShow, hide, elementsStrings } from "./views/base";

const calculateBalanceValues = () => {
  const { currentTotal, caloriesGoal } = globals.state.dailyActivity.getFoodCaloriesBalance();
  const { amount: calories } = globals.state.food.getNutrientByName("Energy");
  let remaining = caloriesGoal - (currentTotal + calories);
  if (remaining < 0) remaining = 0;

  console.log({
    currentTotal,
    calories,
    remaining,
    caloriesGoal
  });
  return {
    currentTotal, calories, remaining, caloriesGoal
  }
}
const changeBalanceValues = () => foodView.changeCaloriesBalanceValues(calculateBalanceValues());

const fetchFoodController = async e => {
  const foodDataCentralID = window.location.hash.replace("#", "");
  if (foodDataCentralID) {
    // Prepare UI && Change view
    changeSection("foodSection");
    highlightSelected(foodDataCentralID);
    // Loader
    foodView.clearFood();
    

    // Get the data
    globals.state.food = new Food(foodDataCentralID);
    await globals.state.food.fetchDetails();

    // Display the data
    globals.state.food.updateNutrients();
    foodView.renderFood(globals.state.food);

    // Change balance
    changeBalanceValues();
  }
}

const toggleAddPopup = e => toggleHideShow(elements.foodAddPopup);

const handleFoodAddBtnBlur = e => {
  console.log(e.target.matches());
  if (!e.target) {
    hide(elements.foodAddPopup);
  }
}

const updateFoodNutrients = () => {
  globals.state.food.updateNutrients();
  changeBalanceValues();
  foodView.changeNutrientsAmounts(globals.state.food.nutrients);
}

const handleInput = e => {
  const { target } = e;
  if (target.matches(elementsStrings.quantityInput)) modifyQuantity();
  else if (target.matches(elementsStrings.portionSelect)) modifyPortion();
  else return;
  updateFoodNutrients();
}

const modifyQuantity = () => {
  const quantity = foodView.getQuantity();
  globals.state.food.setQuantity(quantity);
}

const modifyPortion = () => {
  const portionIndex = foodView.getPortionIndex();
  globals.state.food.setSelectedPortionIndex(portionIndex);
};

window.state = globals.state;

["load", "hashchange"].forEach(type => window.addEventListener(type, fetchFoodController));
elements.foodAddBtn.addEventListener("click", toggleAddPopup);
elements.foodSection.addEventListener("input", handleInput);
// window.addEventListener("click", handleFoodAddBtnBlur);