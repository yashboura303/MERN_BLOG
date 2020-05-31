import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import {
    errorAlertAction,
    successAlertAction,
    clearAlertAction,
} from "../redux/actions.js";
import Alert from "./alert";
const axios = require("axios");

function Register(props) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const onUserNameChange = e => setUserName(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);
    const onNameChange = e => setName(e.target.value);
    const onEmailChange = e => setEmail(e.target.value);

    useEffect(() => {
        props.clearAlertAction();
    }, []);

    const register = () => {
        axios({
            method: "post",
            url: "/users",
            data: {
                username,
                password,
                name,
                email,
            },
        })
            .then(response => {
                props.successAlertAction(response.data);
            })
            .catch(err => {
                props.errorAlertAction(err.response.data);
            });
    };

    const onSubmit = e => {
        e.preventDefault();
        register();
    };

    return (
        <div className="container w-50 my-5">
            <h1 className="text-center text-info">Register</h1>
            <Alert />
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label className="mr-sm-2">Name</Label>
                    <Input
                        type="text"
                        placeholder="name"
                        onChange={onNameChange}
                        value={name}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="mr-sm-2">Email</Label>
                    <Input
                        type="email"
                        placeholder="email"
                        onChange={onEmailChange}
                        value={email}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="mr-sm-2">Username</Label>
                    <Input
                        type="text"
                        placeholder="username"
                        onChange={onUserNameChange}
                        value={username}
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
                <Button color="success">Sign-Up</Button>
            </Form>
        </div>
    );
}
export default connect(null, {
    successAlertAction,
    errorAlertAction,
    clearAlertAction,
})(Register);
