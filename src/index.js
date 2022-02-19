import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecordProvider } from "./store/record-context";

ReactDOM.render(
  <React.StrictMode>
    <RecordProvider>
      <App />
    </RecordProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
