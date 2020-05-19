import * as foodView from "./views/foodView";
import Food from "./models/Food";
import { changeCurrentSectionTo } from "./views/navigationView";
import { highlightSelected } from "./views/searchView";
import { elements, hide, getHashWithoutNumberSign } from "./views/base";

const handleFoodRequest = event => {
  const foodDataCentralID = getHashWithoutNumberSign(window.location);
  if (foodDataCentralID) {
    searchFood(foodDataCentralID);
  }
};

const searchFood = foodDataCentralID => {
  // prepareForSearch
  changeCurrentSectionTo("foodSection");
  highlightSelected(foodDataCentralID);
  foodView.clearFood();
  // loader
  loadFood(foodDataCentralID);
};

const loadFood = async foodDataCentralID => {
  globals.state.food = new Food(foodDataCentralID);
  await fetchAndUpdateFood(); 
  displayFood();
};

const fetchAndUpdateFood = async () => {
  const { food } = globals.state;
  await food.fetchDetails();
  food.updateNutrients();
};

const displayFood = () => {
  foodView.renderFood(globals.state.food);
  updateBalanceValues();
};

const updateBalanceValues = () => {
  const { food, dailyActivity } = globals.state;
  const balanceValues = dailyActivity.getFoodCaloriesBalance(food);
  foodView.changeCaloriesBalanceValues(balanceValues);
};

// Renombrar
const modifyFood = event => {
  const { target } = event;
  if (foodView.isQuantityInput(target)) modifyQuantity();
  else if (foodView.isPortionSelect(target)) modifyPortion();
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
  foodView.changeNutrients(food.nutrients);
  updateBalanceValues();
};

const closeAddPopup = event => {
  if (foodView.addPopupIsClose()) return;
  if (!foodView.addWrapperClicked(event.target)) {
    hide(elements.foodAddPopup);
  }
};

window.state = globals.state;

["load", "hashchange"].forEach(type => 
  window.addEventListener(type, handleFoodRequest));

elements.foodSection.addEventListener("input", modifyFood);
elements.foodAddBtn.addEventListener("click", foodView.toggleAddPopup);
window.addEventListener("click", closeAddPopup);