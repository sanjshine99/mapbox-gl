import React from "react";
import ReactDOM from "react-dom/client";
import { TrackingWebView } from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <TrackingWebView />
  </React.StrictMode>
);
