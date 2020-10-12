import React, { useState, useEffect } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Button,
} from "reactstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutAction, loginAction } from "../redux/actions.js";
import { ReactComponent as ReactLogo } from "./svgs/blog.svg";

function NavComponent({ loginAction, logoutAction, isLoggedIn, user }) {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        if (localStorage.getItem("user")) {
            loginAction(JSON.parse(localStorage.getItem("user")));
        } else {
            logoutAction();
        }
    }, [loginAction, logoutAction]);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Link className="navbar-brand" to="/">
                    <div className="row whiteDiv">
                        <ReactLogo className="ml-2 ml-sm-5 my-auto" />
                        <h3 className="d-inline my-auto ml-2">Blogify</h3>
                    </div>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {loggedInNav()}
                </Collapse>
            </Navbar>
        </div>
    );

    function logout() {
        localStorage.clear();
        logoutAction();
        history.push("/");
    }

    function loggedInNav() {
        if (isLoggedIn) {
            return (
                <Nav className=" ml-auto" navbar>
                    <NavItem className="my-auto text-white mx-2">
                        <h5 className="d-inline">
                            Hi {`${localStorage.getItem("username")}`}!
                        </h5>
                    </NavItem>

                    <NavItem>
                        <Link className="nav-link" to="/addBlog">
                            <Button color="info d-inline">Write a Blog</Button>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to={`/blogs/${user._id}`}>
                            <h5 className="d-inline">Your Blogs</h5>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <button
                            className="nav-link button-link"
                            onClick={logout}
                        >
                            <h5 className="d-inline">Logout</h5>
                        </button>
                    </NavItem>
                </Nav>
            );
        }
        return (
            <Nav className=" ml-auto mr-sm-4" navbar>
                <NavItem>
                    <Link className="nav-link mr-sm-4" to="/login">
                        <h5 className="d-inline">Login</h5>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/signup">
                        <h5 className="d-inline">Register</h5>
                    </Link>
                </NavItem>
            </Nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, { logoutAction, loginAction })(
    NavComponent
);
