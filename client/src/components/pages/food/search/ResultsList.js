import React from "react";
import ResultItem from "./ResultItem";
import toElementsWithMappedProps from "../../../../utils/toElementsWithMappedProps";

const ResultsList = ({ results }) => {
  const toResultItem = toElementsWithMappedProps(ResultItem);
  const resultsItems = results.map(toResultItem);

  return <ul className="results__list">{resultsItems}</ul>;
};

export default ResultsList;
