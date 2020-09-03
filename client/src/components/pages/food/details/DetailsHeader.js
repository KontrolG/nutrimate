import React from "react";
import Header from "../../../layout/Header";
import ReturnButton from "./ReturnButton";

const DetailsHeader = props => {
  return (
    <Header className={""}>
      <ReturnButton />
      <h2>Details</h2>
    </Header>
  );
};

export default DetailsHeader;
