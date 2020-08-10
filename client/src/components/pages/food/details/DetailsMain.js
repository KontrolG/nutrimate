import React from "react";
import Main from "../../../layout/Main";
import HeadingSection from "./HeadingSection";
import SummarySection from "./SummarySection";
import BalanceSectionCopy from "./BalanceSection copy";
import BalanceSection from "./BalanceSection";
import NutrientsFactsSection from "./NutrientsFactsSection";

const DetailsMain = props => {
  return (
    <Main id="foodDetails">
      <HeadingSection />
      <SummarySection />
      {/* <BalanceSectionCopy /> */}
      <BalanceSection />
      <NutrientsFactsSection />
    </Main>
  );
};

export default DetailsMain;
