import { SET_IS_LOADING, SET_FOOD } from "../actions/types";
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

const detailsReducer = combineReducers({ isLoading, food });

export default detailsReducer;
