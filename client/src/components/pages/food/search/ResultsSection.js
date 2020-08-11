import React, { useEffect } from "react";
import { connect } from "react-redux";
import ResultsList from "./ResultsList";
import LoadingSpinner from "../../../LoadingSpinner";
import { fetchResults, fetchMoreResults } from "../../../../actions/search";

const ResultsSection = ({
  query,
  isSearching,
  fetchResults,
  fetchMoreResults,
  results
}) => {
  useEffect(() => {
    fetchResults(query);
    return () => {
      console.log("cleanup");
    };
  }, [query]);

  const loadMoreFoods = () => {
    const start = results.length;
    fetchMoreResults(query, start);
  };

  const resultsElement = isSearching ? (
    <LoadingSpinner className="results__loader" />
  ) : (
    <ResultsList results={results} />
  );

  return (
    <section id="foodSection">
      {/* results filters or sorters */}
      {resultsElement}
    </section>
  );
};

const mapStateToProps = ({ search }) => {
  const { query, isSearching, results } = search;
  return { query, isSearching, results };
};

const mapDispatchToProps = { fetchResults, fetchMoreResults };

export default connect(mapStateToProps, mapDispatchToProps)(ResultsSection);
