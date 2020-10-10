import React, { useState, useEffect } from "react";
import { Container, Button, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import { Editor } from "@tinymce/tinymce-react";

import {
    errorAlertAction,
    successAlertAction,
    clearAlertAction,
} from "../redux/actions.js";
import Alert from "./alert";

const axios = require("axios");

function WriteBlog({
    successAlertAction,
    clearAlertAction,
    errorAlertAction,
    history,
}) {
    const [title, setTitle] = useState("");
    const [blogBody, setBlogBody] = useState("");
    const onTitleChange = e => setTitle(e.target.value);
    useEffect(() => {
        if (!Cookie.get("user")) {
            history.push("/");
        }
        clearAlertAction();
    }, [history, clearAlertAction]);
    const createBlog = async () => {
        const user_id = JSON.parse(Cookie.get("user"));
        await axios({
            method: "post",
            url: "/api/blogs",
            data: {
                blogTitle: title,
                blogBody: blogBody,
                user: user_id._id,
            },
            headers: {
                Authorization: "Bearer " + Cookie.get("token"),
            },
        })
            .then(response => {
                console.log(response.data);
                // successAlertAction("Blog created");
                history.push(`/blogs/${user_id._id}`);
            })
            .catch(err => {
                console.log("Errror", err.response);
                errorAlertAction(err.response.data);
            });
    };

    const submitBlog = () => {
        if (blogBody === "") {
            console.log("emtpy blog");
            errorAlertAction("Blog or Title can't be empty!");
        } else {
            createBlog();
        }
    };
    const handleEditorChange = (blogBody, editor) => {
        setBlogBody(blogBody);
    };

    return (
        <>
            <Container className="my-4 writeBlog ">
                <FormGroup>
                    <Label for="blogTitle">
                        <h4>Title</h4>
                    </Label>
                    <Input
                        type="textarea"
                        rows="1"
                        onChange={onTitleChange}
                        className="title-texarea"
                        style={{ fontSize: "2rem", fontWeight: "600" }}
                    />
                </FormGroup>
                <Container className="">
                    <Alert />
                </Container>
                <h4 className="mt-2">Body</h4>
                <Editor
                    init={{
                        height: 500,
                        apiKey:
                            "czrmon8ekni27okahwzw67egeqpotxcnb3yt75qzs44bdbpq",
                        menubar: "view insert",
                        plugins: [
                            "advlist autolink lists link image charmap print preview ",
                            "emoticons",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime table paste code help wordcount",
                        ],
                        automatic_uploads: true,
                        toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | emoticons | image imagetools | help",
                        images_upload_url: "api/blogs/uploadImage",
                        imagetools_toolbar:
                            "rotateleft rotateright | flipv fliph | editimage imageoptions",
                    }}
                    onEditorChange={handleEditorChange}
                />
                <Button
                    className=" w-25 mx-auto my-5 btn-block"
                    color="success"
                    onClick={submitBlog}
                >
                    Post Blog
                </Button>
            </Container>
        </>
    );
}
const mapStateToProps = state => {
    return { user: state.auth.user };
};

export default connect(mapStateToProps, {
    successAlertAction,
    clearAlertAction,
    errorAlertAction,
})(WriteBlog);
