import React from "react";
import mockedResults from "./mockedResults";
import ResultItem from "./ResultItem";

const ResultsList = props => {
  const toResultItem = (food, index) => <ResultItem key={index} {...food} />;
  const resultsItems = mockedResults.map(toResultItem);

  return <ul className="results__list">{resultsItems}</ul>;
};

export default ResultsList;
