import React, { Fragment } from "react";
import Header from "./DetailsHeader";
import Main from "./DetailsMain";
import "./Details.css";

const Details = props => {
  const { id } = props.match.params;
  return (
    <Fragment>
      <Header />
      <Main foodId={id} />
    </Fragment>
  );
};

export default Details;
