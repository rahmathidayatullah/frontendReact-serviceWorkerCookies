import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.scss";
import "./Responsive.scss";
import Home from "./pages";
import reportWebVitals from "./reportWebVitals";
import serviceworker from "./serviceworker";
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceworker();
