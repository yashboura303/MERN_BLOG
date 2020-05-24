import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
// import logo from 'logo.svg';
import { ReactComponent as ReactLogo } from "./logo.svg";

function NavComponent() {
	const [isOpen, setIsOpen] = useState(true);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">
					<div className="d-inline my-auto"><ReactLogo /></div> Welcome To Blog
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
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
				</Collapse>
			</Navbar>
		</div>
	);
}

export default NavComponent;
