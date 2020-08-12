import {
  SET_IS_LOADING,
  SET_FOOD,
  SET_QUANTITY,
  SET_PORTION_WEIGHT_IN_GRAMS
} from "./types";
import fetchData from "../utils/fetchData";
import loadData from "../utils/loadData";

export const fetchFoodById = foodId => async dispatch => {
  const fetchFoodDetails = () => fetchData("api/get", { fdcId: foodId });
  const food = await loadData(dispatch, setIsLoading, fetchFoodDetails);
  dispatch(setFood(food));
};

export const cleanFood = dispatch => {
  const initialValues = { food: null, quantity: 1, portionWeightInGrams: 1 };
  dispatch(setFood(initialValues.food));
  dispatch(setQuantity(initialValues.quantity));
  dispatch(setPortionWeightInGrams(initialValues.portionWeightInGrams));
};

const setIsLoading = isLoading => {
  return { type: SET_IS_LOADING, isLoading };
};

export const setFood = food => {
  return { type: SET_FOOD, food };
};

export const setQuantity = quantity => {
  return { type: SET_QUANTITY, quantity };
};

export const setPortionWeightInGrams = portionWeightInGrams => {
  return { type: SET_PORTION_WEIGHT_IN_GRAMS, portionWeightInGrams };
};
