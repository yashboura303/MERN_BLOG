import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions.js";
import { errorAlertAction, clearAlertAction } from "../redux/actions.js";
import Alert from "./alert";

const axios = require("axios");

function Login(props) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onUserNameChange = e => setUserName(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

    useEffect(() => {
        props.clearAlertAction();
        if (Cookie.get("user")) {
            props.history.push("/");
        }
    }, []);
    const signIn = async () => {
        await axios({
            method: "post",
            url: "/api/users/login",
            data: {
                username,
                password,
            },
        })
            .then(response => {
                Cookie.set("token", response.data.token);
                Cookie.set("user", JSON.stringify(response.data.user));
                Cookie.set("username", response.data.user.username);
                props.loginAction(response.data.user);
                props.history.push("/");
            })
            .catch(err => {
                props.errorAlertAction(err.response.data);
            });
    };

    const onSubmit = e => {
        e.preventDefault();
        signIn();
    };

    return (
        <div className="container w-50 my-5">
            <h1 className="text-center text-info">Login</h1>
            <Alert />
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

export default connect(null, {
    loginAction,
    errorAlertAction,
    clearAlertAction,
})(Login);
