import React, { useState, useEffect } from "react";
import { Container, Button, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

import {
    errorAlertAction,
    successAlertAction,
    clearAlertAction,
} from "../redux/actions.js";
import Alert from "./alert";

const axios = require("axios");

function EditBlog(props) {
    const [title, setTitle] = useState("");
    const [blogBody, setBlogBody] = useState("");
    const onTitleChange = e => setTitle(e.target.value);
    const fetchBlog = async blog_id => {
        await axios({
            method: "get",
            url: `/api/blog/${blog_id}`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(response => {
                console.log(response.data);
                setTitle(response.data.title);
                setBlogBody(response.data.body);
            })
            .catch(err => {
                console.log("Errror", err.response);
                props.errorAlertAction(err);
            });
    };
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            props.history.push("/");
        }
        props.clearAlertAction();
        fetchBlog(props.match.params.blog_id);
    }, [
        props.history,
        props.match.params.blog_id,
        props.clearAlertAction,
        props,
    ]);
    const updateBlog = async () => {
        const user_id = JSON.parse(localStorage.getItem("user"));
        await axios({
            method: "put",
            url: `/api/blog/updateBlog/${props.match.params.blog_id}`,
            data: {
                title,
                body: blogBody,
                user: user_id._id,
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(response => {
                console.log(response.data);
                successAlertAction("Blog edited");
                props.history.push(`/blogs/${user_id._id}`);
            })
            .catch(err => {
                console.log("Errror", err);
                props.errorAlertAction(err.response.data);
            });
    };

    const submitBlog = () => {
        if (blogBody === "") {
            console.log("emtpy blog");
            props.errorAlertAction("Blog or Title can't be empty!");
        } else {
            updateBlog();
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
                        value={title}
                    />
                </FormGroup>
                <Container className="">
                    <Alert />
                </Container>
                <h4 className="mt-2">Body</h4>
                <Editor
                    value={blogBody}
                    init={{
                        height: 500,
                        branding: false,
                        apiKey:
                            "czrmon8ekni27okahwzw67egeqpotxcnb3yt75qzs44bdbpq",
                        menubar: "view insert",
                        style_formats: [
                            {
                                title: "Headings",
                                items: [
                                    { title: "Heading 1", format: "h2" },
                                    { title: "Heading 2", format: "h3" },
                                    { title: "Heading 3", format: "h4" },
                                    { title: "Heading 4", format: "h5" },
                                    { title: "Heading 5", format: "h6" },
                                ],
                            },
                            {
                                title: "Inline",
                                items: [
                                    { title: "Bold", format: "bold" },
                                    { title: "Italic", format: "italic" },
                                    { title: "Underline", format: "underline" },
                                    {
                                        title: "Strikethrough",
                                        format: "strikethrough",
                                    },
                                    {
                                        title: "Superscript",
                                        format: "superscript",
                                    },
                                    { title: "Subscript", format: "subscript" },
                                    { title: "Code", format: "code" },
                                ],
                            },
                            {
                                title: "Blocks",
                                items: [
                                    { title: "Paragraph", format: "p" },
                                    {
                                        title: "Blockquote",
                                        format: "blockquote",
                                    },
                                    { title: "Div", format: "div" },
                                    { title: "Pre", format: "pre" },
                                ],
                            },
                            {
                                title: "Align",
                                items: [
                                    { title: "Left", format: "alignleft" },
                                    { title: "Center", format: "aligncenter" },
                                    { title: "Right", format: "alignright" },
                                    {
                                        title: "Justify",
                                        format: "alignjustify",
                                    },
                                ],
                            },
                        ],

                        plugins: [
                            "advlist autolink lists link image charmap print preview ",
                            "emoticons",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime table paste code help wordcount",
                        ],
                        automatic_uploads: true,
                        toolbar:
                            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | image magetools | code | help",
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
                    Done
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
})(EditBlog);
