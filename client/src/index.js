import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./redux/reducers/auth.js";
import alertReducer from "./redux/reducers/alerts.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ auth: authReducer, alert: alertReducer });
const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
