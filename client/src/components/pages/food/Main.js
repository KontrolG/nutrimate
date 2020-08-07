import React, { Suspense, lazy } from "react";
import Main from "../../layout/Main";

const ResultsSection = lazy(() => import("./ResultsSection"));
const FoodMain = () => {
  return (
    <Main>
      <Suspense fallback="loading">
        <ResultsSection />
      </Suspense>
    </Main>
  );
};
export default FoodMain;
