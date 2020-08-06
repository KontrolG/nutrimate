import React from "react";
import ResultsList from "./ResultsList";
import mockedResults from "./mockedResults";

const ResultsSection = props => {
  return (
    <section id="foodSection">
      {/* results filters or sorters */}
      <ResultsList results={mockedResults} />
    </section>
  );
};

export default ResultsSection;
