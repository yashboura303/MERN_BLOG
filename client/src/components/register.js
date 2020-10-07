import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
    RiLockPasswordLine,
    RiUserLine,
    RiMailLine,
    RiContactsBook2Line,
} from "react-icons/ri";

import { connect } from "react-redux";
import Cookie from "js-cookie";
import {
    errorAlertAction,
    successAlertAction,
    clearAlertAction,
} from "../redux/actions.js";
import Alert from "./alert";
const axios = require("axios");

function Register({
    successAlertAction,
    errorAlertAction,
    clearAlertAction,
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
        if (Cookie.get("user")) {
            history.push("/");
        }
    }, [clearAlertAction, history]);

    const register = async () => {
        await axios({
            method: "post",
            url: "/api/users",
            data: {
                username,
                password,
                name,
                email,
            },
        })
            .then(response => {
                successAlertAction(response.data);
            })
            .catch(err => {
                errorAlertAction(err.response.data);
            });
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
    successAlertAction,
    errorAlertAction,
    clearAlertAction,
})(Register);
