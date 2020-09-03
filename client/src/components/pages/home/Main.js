import React from "react";
import { connect } from "react-redux";
import { setIsClosed } from "../../../actions/search";
import Main from "../../layout/Main";
import Logo from "../../Logo";
import SearchShortcut from "./SearchShortcut";
import Button from "../../Button";

const HomeMain = ({ openSearch }) => {
  return (
    <Main>
      <section id="homeSection">
        <Logo size={80} />
        <h1>Nutrimate</h1>
        <h2>Calorie Counter</h2>
        <p className="copy">
          Find <strong>healthiest foods</strong> for you while{" "}
          <em>Nutrimate</em> tracks your <strong>calories</strong>.
        </p>
        <SearchShortcut onClick={openSearch} />
        <Button
          className="profile__shortcut"
          isFilled
          isPrimary
          icon={{ name: "plate" }}
        >
          Sign In
        </Button>
      </section>
    </Main>
  );
};

const mapDispatchToProps = dispatch => ({
  openSearch() {
    return dispatch(setIsClosed(false));
  }
});

export default connect(null, mapDispatchToProps)(HomeMain);
