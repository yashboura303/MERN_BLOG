import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import ErrorMessage from "./alerts/error.js";
import SuccessMessage from "./alerts/success.js";
import Cookie from "js-cookie";

const token =  Cookie.get("token") ? Cookie.get("token") : null;
const axios = require("axios");

export default function Login() {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setErrorMessage] = useState("");

	const onUserNameChange = (e) => setUserName(e.target.value);
	const onPasswordChange = (e) => setPassword(e.target.value);

	const signIn = () => {
		axios({
			method: "post",
			url: "http://localhost:8000/users/login",
			data: {
				username,
				password,
			},
		})
			.then((response) => {
				Cookie.set("token", response.data);
				setErrorMessage("");
			})
			.catch((err) => {
				setErrorMessage(err.response.data);
			});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		signIn();
	};

	return (
		<div className="container w-50 my-5">
			<h1 className="text-center text-info">Login</h1>
			<ErrorMessage error={error} />
			<Form onSubmit={onSubmit}>
				<FormGroup>
					<Label className="mr-sm-2">Username</Label>
					<Input
						type="text"
						onChange={onUserNameChange}
						value={username}
						placeholder="username"
					/>
				</FormGroup>
				<FormGroup>
					<Label className="mr-sm-2">Password</Label>
					<Input
						type="password"
						onChange={onPasswordChange}
						value={password}
						placeholder="don't tell!"
					/>
				</FormGroup>
				<Button color="success" onClick={onSubmit}>
					Sign-In
				</Button>
			</Form>
		</div>
	);
}
