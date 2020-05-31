import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import ErrorMessage from "./alerts/error.js";
import SuccessMessage from "./alerts/success.js";
const axios = require("axios");

function AddBlog(props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const onTitleChange = e => setTitle(e.target.value);
    const onBodyChange = e => setBody(e.target.value);
    const [error, setErrorMessage] = useState("");
    const [success, setSucessMessage] = useState("");

    const createBlog = () => {
        const user_id = JSON.parse(Cookie.get("user"));
        axios({
            method: "post",
            url: "/blogs",
            data: {
                blogTitle: title,
                blogBody: body,
                user: user_id._id,
            },
            headers: {
                Authorization: "Bearer " + Cookie.get("token"),
            },
        })
            .then(response => {
                console.log(response.data);
                setErrorMessage("");
                setSucessMessage("Blog Created!");
                // props.history.push("/");
            })
            .catch(err => {
                console.log("Errror", err.response);
                setErrorMessage(err.response.data);
                setSucessMessage("");
            });
    };

    const onSubmit = e => {
        e.preventDefault();
        createBlog();
    };
    return (
        <div className="container">
            <h1 className="text-center text-info">Create New Blog</h1>
            <ErrorMessage error={error} />
            <SuccessMessage success={success} />
            <Form onSubmit={onSubmit}>
                <FormGroup className="w-50">
                    <Label>Blog Title</Label>
                    <Input type="text" onChange={onTitleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Blog Body</Label>
                    <Input type="textarea" rows="12" onChange={onBodyChange} />
                </FormGroup>
                <Button color="success">Submit</Button>
            </Form>
        </div>
    );
}

const mapStateToProps = state => {
    return { user: state.user };
};

export default connect(mapStateToProps)(AddBlog);
