import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from "reactstrap";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutAction } from "../redux/actions.js";
import { ReactComponent as ReactLogo } from "./logo.svg";

// const user_id = Cookie.get("user") ? Cookie.get("user") : null;

function NavComponent(props) {
	const [isOpen, setIsOpen] = useState(true);
	const history = useHistory();
	const toggle = () => setIsOpen(!isOpen);
	return (
		<div>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand href="#">
					<div className="d-inline my-auto">
						<ReactLogo />
					</div>
					Welcome To Blog
				</NavbarBrand>
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
		props.logoutAction();
		history.push("/");
	}

	function loggedInNav() {
		if (props.isLoggedIn === false) {
			return (
				<Nav className=" ml-auto" navbar>
					<NavItem>
						<Link className="nav-link" to="/login">
							Login
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/signup">
							Register
						</Link>
					</NavItem>
				</Nav>
			);
		}
		return (
			<Nav className=" ml-auto" navbar>
				<NavItem className="my-auto text-white">
					Welcome {props.user.fullName} !
				</NavItem>
				<NavItem>
					<Link className="nav-link" to={`/blogs/${props.user._id}`}>
						Your Blogs
					</Link>
				</NavItem>
				<NavItem>
					<Link className="nav-link" to="/addBlog">
						Add Blog
					</Link>
				</NavItem>
				<NavItem>
					<button className="nav-link button-link" onClick={logout}>
						Logout
					</button>
				</NavItem>
			</Nav>
		);
	}
}

const mapStateToProps = (state) => {
	return { isLoggedIn: state.isLoggedIn, user: state.user };
};

export default connect(mapStateToProps, { logoutAction })(NavComponent);
