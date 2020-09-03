import { handleAction, handleActions } from "redux-actions";
import { setDate, setCurrentId } from "../actions/activity";
import { combineReducers } from "redux";

const reducer = (state, { payload }) => payload;
const date = handleAction(setDate, reducer, null);
const currentId = handleAction(setCurrentId, reducer, 0);

// const activityReducer = handleActions(
//   { setDate, setCurrentId },
//   { date: null, currentId: 0 }
// );
const activityReducer = combineReducers({ date, currentId });

export default activityReducer;
