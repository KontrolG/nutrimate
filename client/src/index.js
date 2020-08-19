import React from "react";
import { render } from "react-dom";
import "./index.css";

import App from "./App";

const appContainer = document.querySelector("#app");

render(<App />, appContainer);
