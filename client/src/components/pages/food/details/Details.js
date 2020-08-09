import React, { Fragment } from "react";
import Header from "./DetailsHeader";
import Main from "./DetailsMain";

const Details = props => {
  const { id } = props.match.params;
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};

export default Details;
