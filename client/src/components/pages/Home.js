import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import "./Home.css";

const Home = props => {
  return (
    <section id="homeSection">
      <Logo height={80} />
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
  );
};

export default Home;
