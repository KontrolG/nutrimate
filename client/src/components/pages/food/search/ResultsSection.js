import React, { useEffect } from "react";
import { connect } from "react-redux";
import ResultsList from "./ResultsList";
import LoadingSpinner from "../../../LoadingSpinner";
import { fetchFoods, fetchMoreFoods } from "../../../../actions/search";

const ResultsSection = ({
  query,
  isSearching,
  fetchFoods,
  fetchMoreFoods,
  results
}) => {
  useEffect(() => {
    fetchFoods(query);
    return () => {
      console.log("cleanup");
    };
  }, [query]);

  const loadMoreFoods = () => {
    const start = results.length;
    fetchMoreFoods(query, start);
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

const mapDispatchToProps = { fetchFoods, fetchMoreFoods };

export default connect(mapStateToProps, mapDispatchToProps)(ResultsSection);
