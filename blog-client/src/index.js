import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";

ReactDOM.render(
    <Router>
      <NavBar />
    <Switch>
      <Route path="/" exact component={App}></Route>
      <Route path="/signup" exact component={Register}></Route>
      <Route path="/login" exact component={Login}></Route>
    </Switch>
  </Router>,	
    document.getElementById("root")
);