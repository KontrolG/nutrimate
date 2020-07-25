import React from "react";
import Main from "../../layout/Main";
import Logo from "../../Logo";
import Button from "../../Button";

const HomeMain = () => {
  return (
    <Main>
      <section id="homeSection">
        <Logo size={80} />
        <h1>Nutrimate</h1>
        <p className="copy">
          Eat{" "}
          <strong>
            <em>smart</em>
          </strong>
          . Stay{" "}
          <strong>
            <em>healty</em>
          </strong>
          .
        </p>
        <Button className="search__shortcut" icon={{ name: "search" }} isFilled>
          Search Food
        </Button>
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
export default HomeMain;
