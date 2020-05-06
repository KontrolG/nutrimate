import * as foodView from "./views/foodView";
import Food from "./models/Food";
import { changeCurrentSectionTo } from "./views/navigationView";
import { highlightSelected } from "./views/searchView";
import { elements, toggleHideShow, hide, elementsStrings } from "./views/base";

const handleFoodRequest = event => {
  const foodDataCentralID = window.location.hash.replace("#", "");
  if (foodDataCentralID) searchFood(foodDataCentralID)
};

const searchFood = foodDataCentralID => {
  // prepareForSearch
  changeCurrentSectionTo("foodSection");
  highlightSelected(foodDataCentralID);
  foodView.clearFood();
  // loader
  loadFood(foodDataCentralID);
}

const loadFood = async foodDataCentralID => {
  await getFood(foodDataCentralID); 
  displayFood();
}

const getFood = async foodDataCentralID => {
  globals.state.food = new Food(foodDataCentralID);
  const { food } = globals.state;
  await food.fetchDetails();
  food.updateNutrients();
}

const displayFood = () => {
  foodView.renderFood(globals.state.food);
  changeBalanceValues();
}

const changeBalanceValues = () => {
  const { food, dailyActivity } = globals.state;
  const balanceValues = dailyActivity.getFoodCaloriesBalance(food);
  foodView.changeCaloriesBalanceValues(balanceValues);
}

// Renombrar
const modifyFood = event => {
  const { target } = event;
  if (target.matches(elementsStrings.quantityInput)) modifyQuantity();
  else if (target.matches(elementsStrings.portionSelect)) modifyPortion();
  else return;
  updateFoodNutrients();
};

const modifyQuantity = () => {
  const inputQuantity = foodView.getQuantity();
  globals.state.food.quantity = inputQuantity;
};

const modifyPortion = () => {
  const optionPortionIndex = foodView.getPortionIndex();
  globals.state.food.selectedPortionIndex = optionPortionIndex;
};

const updateFoodNutrients = () => {
  const { food } = globals.state;
  food.updateNutrients();
  changeBalanceValues();
  foodView.changeNutrients(food.nutrients);
};

const toggleAddPopup = event => toggleHideShow(elements.foodAddPopup);

/* Por implementar 
const handleFoodAddBtnBlur = e => {
  console.log(e.target.matches());
  if (!e.target) {
    hide(elements.foodAddPopup);
  }
}; */

window.state = globals.state;

["load", "hashchange"].forEach(type => 
  window.addEventListener(type, handleFoodRequest));

elements.foodSection.addEventListener("input", modifyFood);
elements.foodAddBtn.addEventListener("click", toggleAddPopup);

// window.addEventListener("click", handleFoodAddBtnBlur);