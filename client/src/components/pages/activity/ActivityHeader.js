import React from "react";
import Header from "../../layout/Header";
import DateSelectionForm from "./DateSelectionForm";

const DetailsHeader = props => {
  return (
    <Header className={""}>
      <DateSelectionForm />
    </Header>
  );
};

export default DetailsHeader;
