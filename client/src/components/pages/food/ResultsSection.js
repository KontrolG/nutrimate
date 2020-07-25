import React from "react";
import ResultsList from './ResultsList';

const ResultsSection = props => {
  return (
    <section id="FoodSection">
      {/* results filters or sorters */}
      <ResultsList />
    </section>
  );
};

export default ResultsSection;
