import {
  SET_IS_LOADING,
  SET_FOOD,
  SET_QUANTITY,
  SET_PORTION_INDEX
} from "./types";
import { fetchData } from "../utils";

export const fetchFoodById = foodId => async dispatch => {
  console.log("This works!");
  const food = await loadData(dispatch, setIsLoading, () =>
    fetchData("api/get", { fdcId: foodId })
  );
  dispatch(setFood(food));
};

const loadData = async (
  dispatch,
  setLoadingActionCreator,
  dataFetchingFunction
) => {
  dispatch(setLoadingActionCreator(true));
  const result = await dataFetchingFunction();
  dispatch(setLoadingActionCreator(false));
  return result;
};

const setIsLoading = isLoading => {
  return { type: SET_IS_LOADING, isLoading };
};

export const setFood = food => {
  return { type: SET_FOOD, food };
};
