import { createActions } from "redux-actions";
import { SET_DATE, SET_CURRENT_ID } from "./types";

/* 
this.foodCurrentId = 0;
    this.caloriesGoal = caloriesGoal;
    this.meals = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    };
*/
const identityFunction = payload => payload;
export const { setDate, setCurrentId } = createActions({
  SET_DATE: identityFunction,
  SET_CURRENT_ID: identityFunction
});
