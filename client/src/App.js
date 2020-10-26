import React from "react";
import "./sass/App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./components/navbar";
import DarkModeToggle from "./components/darkModeToggle";
import Login from "./components/login";
import Footer from "./components/footer";
import Home from "./components/home";
import WriteBlog from "./components/writeBlog";
import Register from "./components/register";
import UserBlogs from "./components/userBlogs";
import Blog from "./components/blog";
import "./sass/App.scss";
import EditBlog from "./components/editBlog";

const routing = props => {
    return (
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/addBlog" exact component={WriteBlog}></Route>
            <Route path="/blogs/:id" exact component={UserBlogs}></Route>
            <Route path="/blog/:blog_id" exact component={Blog}></Route>
            <Route
                path="/blog/edit/:blog_id"
                exact
                component={EditBlog}
            ></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Register}></Route>
            <Redirect to="/"></Redirect>
        </Switch>
    );
};

function App(props) {
    return (
        <BrowserRouter>
            <NavBar />
            {routing(props)}
            <DarkModeToggle />
            <Footer />
        </BrowserRouter>
    );
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    };
};
export default connect(mapStateToProps)(App);
