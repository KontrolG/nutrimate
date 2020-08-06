import React from "react";
import ResultItem from "./ResultItem";

const ResultsList = ({ results }) => {
  const toResultItem = (food, index) => <ResultItem key={index} {...food} />;
  const resultsItems = results.map(toResultItem);

  return <ul className="results__list">{resultsItems}</ul>;
};

export default ResultsList;
