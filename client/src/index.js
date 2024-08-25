import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./redux/reducers";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="915938178129-rghpfi4p4bb2jguf17vsbjjkt9fpik1j.apps.googleusercontent.com">
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </GoogleOAuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
