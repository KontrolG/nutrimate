import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setFood, fetchFoodById } from "../../../../actions/details";

import LoadingSpinner from "../../../LoadingSpinner";
import DetailsBody from "./DetailsBody";
import Main from "../../../layout/Main";

const DetailsMain = ({ fetchFoodById, foodId, isLoading, food }) => {
  useEffect(() => {
    fetchFoodById(foodId);
    return setFood;
  }, []);

  const foodIsAvailable = !isLoading && food;
  const details = foodIsAvailable ? <DetailsBody {...food}/> : <LoadingSpinner />;

  return <Main id="foodDetails">{details}</Main>;
};

const mapStateToProps = ({ details }) => {
  const { food, isLoading } = details;
  return { food, isLoading };
};

const mapDispatchToProps = { setFood, fetchFoodById };

export default connect(mapStateToProps, mapDispatchToProps)(DetailsMain);
