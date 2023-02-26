import React from "react";
import { render } from "react-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "./styles/index.scss";
import { createStore, compose, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import rootReducer from "./store/reducers";
import App from "./App";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
