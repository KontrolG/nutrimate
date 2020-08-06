import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";

const appContainer = document.querySelector("#app");

ReactDOM.render(<App />, appContainer);
