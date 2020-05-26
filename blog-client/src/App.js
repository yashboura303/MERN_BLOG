import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
import "bootstrap/dist/css/bootstrap.min.css";

const Routing = () => {
	return (
		<Switch>
			<Route path="/" exact component={App}></Route>
			<Route path="/signup" exact component={Register}></Route>
			<Route path="/login" exact component={Login}></Route>
		</Switch>
	);
};

export default function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routing />
		</BrowserRouter>
	);
}

