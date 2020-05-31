import React, { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutAction, loginAction } from "../redux/actions.js";
import { ReactComponent as ReactLogo } from "./svgs/blog.svg";

function NavComponent(props) {
    const [isOpen, setIsOpen] = useState(true);
    const history = useHistory();
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        if (Cookie.get("user")) {
            props.loginAction(JSON.parse(Cookie.get("user")));
        } else {
            props.logoutAction();
        }
    }, []);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Link className="navbar-brand" to="/">
                    <div className="row whiteDiv">
                        <ReactLogo className="ml-2 my-auto" />
                        <h3 className="d-inline my-auto ml-2">MERN Blog</h3>
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
        Cookie.remove("token");
        Cookie.remove("user");
        Cookie.remove("username");
        props.logoutAction();
        history.push("/");
    }

    function loggedInNav() {
        if (props.isLoggedIn) {
            return (
                <Nav className=" ml-auto" navbar>
                    <NavItem className="my-auto text-white mx-2">
                        <h5 className="d-inline">
                            Welcome {`${Cookie.get("username")}`}!
                        </h5>
                    </NavItem>
                    <NavItem>
                        <Link
                            className="nav-link"
                            to={`/blogs/${props.user._id}`}
                        >
                            <h5 className="d-inline">Your Blogs</h5>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/addBlog">
                            <h5 className="d-inline">Add Blog</h5>
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
            <Nav className=" ml-auto" navbar>
                <NavItem>
                    <Link className="nav-link" to="/login">
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
