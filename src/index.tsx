import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import rootStore from "./redux/store";
import { getNavRoutes, routeProps } from "./helper/navHelper";

// @ts-ignore: Unreachable code error
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={rootStore}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {getNavRoutes().map(({ path, element: Ele }: routeProps) => (
            <Route path={path} element={<Ele />} />
          ))}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
