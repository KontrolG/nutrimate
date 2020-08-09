import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import "./App.css";

import Router from "./components/Router";
import store from "./store";

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Router />
      </Provider>
    </StrictMode>
  );
};

export default App;
