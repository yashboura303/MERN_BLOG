import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
    RiLockPasswordLine,
    RiUserLine,
    RiMailLine,
    RiContactsBook2Line,
} from "react-icons/ri";
import { connect } from "react-redux";
import {
    errorAlertAction,
    successAlertAction,
    clearAlertAction,
    loginAction,
} from "../redux/actions.js";
import Alert from "./alert";
const axios = require("axios");

function Register({
    successAlertAction,
    errorAlertAction,
    clearAlertAction,
    loginAction,
    history,
}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const onUserNameChange = e => setUserName(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);
    const onNameChange = e => setName(e.target.value);
    const onEmailChange = e => setEmail(e.target.value);

    useEffect(() => {
        clearAlertAction();
        if (localStorage.getItem("user")) {
            history.push("/");
        }
    }, [clearAlertAction, history]);

    const register = async () => {
        try {
            const response = await axios({
                method: "post",
                url: "/api/users",
                data: {
                    username,
                    password,
                    name,
                    email,
                },
            });
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.username);
            loginAction(response.data.user);
            successAlertAction(response.data.message);
            history.push("/");
        } catch (err) {
            console.log("Erorororo", err);
            if (err.response) {
                console.log("firstt");
                console.log(err.response.data);
                errorAlertAction(err.response.data);
            } else {
                console.log("second");
                console.log(err);
                errorAlertAction(err);
            }
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        register();
    };

    return (
        <div className="container w-50 my-4 p-0 p-sm-5 py-5 py-sm-0  register">
            <h1 className="text-center my-2">Register</h1>
            <Alert />
            <Form onSubmit={onSubmit} className="w-75 mx-auto">
                <FormGroup className="w-75 mx-auto">
                    <Label className="mr-sm-2">
                        Name
                        <RiContactsBook2Line className="ml-1" />
                    </Label>
                    <Input
                        type="text"
                        placeholder="name"
                        onChange={onNameChange}
                        value={name}
                    />
                </FormGroup>
                <FormGroup className="w-75 mx-auto">
                    <Label className="mr-sm-2">
                        Email <RiMailLine className="ml-1" />
                    </Label>
                    <Input
                        type="email"
                        placeholder="email"
                        onChange={onEmailChange}
                        value={email}
                    />
                </FormGroup>
                <FormGroup className="w-75 mx-auto">
                    <Label className="mr-sm-2">
                        Username <RiUserLine className="ml-1" />
                    </Label>
                    <Input
                        type="text"
                        placeholder="username"
                        onChange={onUserNameChange}
                        value={username}
                    />
                </FormGroup>
                <FormGroup className="w-75 mx-auto">
                    <Label className="mr-sm-2">
                        Password <RiLockPasswordLine className="ml-1" />
                    </Label>
                    <Input
                        type="password"
                        onChange={onPasswordChange}
                        value={password}
                        placeholder="don't tell!"
                    />
                </FormGroup>
                <Button
                    color="success"
                    type="submit"
                    className="w-75 mx-auto btn-block"
                >
                    Sign-Up
                </Button>
            </Form>
        </div>
    );
}
export default connect(null, {
    loginAction,
    successAlertAction,
    errorAlertAction,
    clearAlertAction,
})(Register);
