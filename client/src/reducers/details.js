import {
  SET_IS_LOADING,
  SET_FOOD,
  SET_QUANTITY,
  SET_PORTION_WEIGHT_IN_GRAMS
} from "../actions/types";
import { combineReducers } from "redux";

const isLoading = (previousState = false, action) => {
  if (action.type === SET_IS_LOADING) {
    return action.isLoading;
  }
  return previousState;
};

const food = (previousState = null, action) => {
  if (action.type === SET_FOOD) {
    return action.food;
  }
  return previousState;
};

const quantity = (previousState = 1, action) => {
  if (action.type === SET_QUANTITY) {
    return action.quantity;
  }
  return previousState;
};

const portionWeightInGrams = (previousState = 1, action) => {
  if (action.type === SET_PORTION_WEIGHT_IN_GRAMS) {
    return action.portionWeightInGrams;
  }
  return previousState;
};

const detailsReducer = combineReducers({
  isLoading,
  food,
  quantity,
  portionWeightInGrams
});

export default detailsReducer;
