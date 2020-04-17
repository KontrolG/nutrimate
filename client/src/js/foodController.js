import * as foodView from "./views/foodView";
import Food from "./models/Food";

const state = {};

const fetchFoodController = async e => {
  const foodCode = window.location.hash.replace("#", "");
  if (foodCode) {
    // Prepare UI

    // Get the data
    state.food = new Food(foodCode);
    await state.food.getDetails();

    // Display the data
    foodView.renderFood(state.food);
    
  }
}

["load", "hashchange"].forEach(type => window.addEventListener(type, fetchFoodController));