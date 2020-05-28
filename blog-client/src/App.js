import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Home from "./components/home";
import AddBlog from './components/addBlog';
import Register from "./components/register";
import "bootstrap/dist/css/bootstrap.min.css";


const Routing = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home}></Route>
			<Route path="/signup" exact component={Register}></Route>
			<Route path="/login" exact component={Login}></Route>
			<Route path="/addBlog" exact component={AddBlog}></Route>
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

