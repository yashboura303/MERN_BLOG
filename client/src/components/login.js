import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions.js";
import { errorAlertAction, clearAlertAction } from "../redux/actions.js";
import Alert from "./alert";

const axios = require("axios");

function Login({ clearAlertAction, errorAlertAction, loginAction, history }) {
    // {clearAlertAction} = props
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onUserNameChange = e => setUserName(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

    useEffect(() => {
        clearAlertAction();
        if (localStorage.getItem("user")) {
            history.push("/");
        }
    }, [clearAlertAction, history]);
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
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.user.username);
                loginAction(response.data.user);
                history.push("/");
            })
            .catch(err => {
                errorAlertAction(err.response.data);
            });
    };

    const onSubmit = e => {
        e.preventDefault();
        signIn();
    };

    return (
        <div className="login container w-50 w-sm-50 my-4 p-3 p-sm-5">
            <h1 className="text-center  mb-5 d-none d-sm-block">
                Welcome to Blogify
            </h1>
            <h3 className="text-center  mb-5 d-block d-sm-none">
                Welcome to Blogify
            </h3>
            <Alert />
            <Form onSubmit={onSubmit} className="w-75 mx-auto">
                <FormGroup className="w-75 w-sm-75 mx-auto">
                    <Label className="mr-sm-2">
                        Username
                        <RiUserLine className="ml-1" />
                    </Label>
                    <Input
                        type="text"
                        onChange={onUserNameChange}
                        value={username}
                        placeholder="username"
                    />
                </FormGroup>
                <FormGroup className="w-75 w-sm-75 mx-auto mb-4">
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
                    className=" w-75 w-sm-75 mx-auto btn-block"
                    color="success"
                    type="submit"
                >
                    Sign-In
                </Button>
            </Form>
            <p className="small-xl pt-3 text-center">
                <span className="text-muted mr-1">Not a member?</span>
                <a href="/signup">Sign up</a>
            </p>
        </div>
    );
}

export default connect(null, {
    loginAction,
    errorAlertAction,
    clearAlertAction,
})(Login);
