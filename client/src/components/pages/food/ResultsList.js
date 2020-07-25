import React from "react";
import simulatedStaticResults from "./simulatedStaticResults";
import ResultItem from "./ResultItem";

const ResultsList = props => {
  const toResultItem = (_, index) => <li>{index}</li>;
  const resultsItems = simulatedStaticResults.map(toResultItem);

  return <ul className="results__list">{resultsItems}</ul>;
};

export default ResultsList;
