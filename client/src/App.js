import React, { StrictMode, useState } from "react";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Navigation from "./components/layout/Navigation";
import Home from "./components/pages/Home";
import "./App.css";

const App = () => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleIsHidden = () => setIsHidden(negateBoolean);

  const negateBoolean = boolean => !boolean;

  return (
    <StrictMode>
      <Navigation />
      <Header />
      <Main>
        <Home />
      </Main>
    </StrictMode>
  );
};

export default App;
