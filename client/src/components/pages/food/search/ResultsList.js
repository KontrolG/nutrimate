import React, { Fragment } from "react";
import ResultItem from "./ResultItem";
import LoadingSpinner from "../../../LoadingSpinner";

const ResultsList = ({ results }) => {
  const toResultItem = (food, index) => <ResultItem key={index} {...food} />;
  const resultsItems = results.map(toResultItem);
  /* <ul className="results__list">{resultsItems}</ul> */
  return (
    <Fragment>
      <ul className="results__list">{resultsItems}</ul>
    </Fragment>
  );
};

export default ResultsList;
