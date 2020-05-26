import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./logo.svg";

// const token = Cookie.get("token") ? Cookie.get("token") : null;

function NavComponent(isLoggedIn) {
	const [isOpen, setIsOpen] = useState(true);

	const toggle = () => setIsOpen(!isOpen);
	return (
		<div>
			<Navbar color="light" light expand="md">
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

	function loggedInNav() {
		if (isLoggedIn) {
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
				<NavItem>
					<Link className="nav-link" to="/login">
						Logout
					</Link>
				</NavItem>
				<NavItem>
					<Link className="nav-link" to="/signup">
						Add Blog
					</Link>
				</NavItem>
			</Nav>
		);
	}
}

const mapStateToProps = (state) => {
	const { isLoggedIn } = state;
	return isLoggedIn;
};

export default connect(mapStateToProps)(NavComponent);
