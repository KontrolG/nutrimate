import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFoodById, cleanFood } from "../../../../actions/details";

import LoadingSpinner from "../../../LoadingSpinner";
import DetailsBody from "./DetailsBody";
import Main from "../../../layout/Main";

const DetailsMain = ({
  fetchFoodById,
  cleanFoodOnUnmount,
  foodId,
  isLoading,
  food
}) => {
  useEffect(() => {
    fetchFoodById(foodId);
    return cleanFoodOnUnmount;
  }, []);

  const foodIsAvailable = !isLoading && food;
  const details = foodIsAvailable ? (
    <DetailsBody {...food} />
  ) : (
    <LoadingSpinner />
  );

  return <Main id="foodDetails">{details}</Main>;
};

const mapStateToProps = ({ details }) => {
  const { food, isLoading } = details;
  return { food, isLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    cleanFoodOnUnmount() {
      cleanFood(dispatch);
    },
    fetchFoodById(id) {
      dispatch(fetchFoodById(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsMain);
