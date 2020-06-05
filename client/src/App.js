import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Home from "./components/home";
import AddBlog from "./components/addBlog";
import Register from "./components/register";
import UserBlogs from "./components/userBlogs";
import Blog from "./components/blog";
import "bootstrap/dist/css/bootstrap.min.css";

const Routing = () => {
    let routes = (
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Register}></Route>
            <Route path="/blog/:blog_id" exact component={Blog}></Route>
            <Redirect to="/"></Redirect>
        </Switch>
    );

    if (Cookie.get("user")) {
        routes = (
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/addBlog" exact component={AddBlog}></Route>
                <Route path="/blogs/:id" exact component={UserBlogs}></Route>
                <Route path="/blog/:blog_id" exact component={Blog}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        );
    }
    return <>{routes}</>;
};

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routing />
        </BrowserRouter>
    );
}
