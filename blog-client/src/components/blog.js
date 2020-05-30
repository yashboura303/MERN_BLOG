import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { ReactComponent as LikeIcon } from "./svgs/liked.svg";
import { ReactComponent as DisLikeIcon } from "./svgs/not-liked.svg";
import {
    Button,
    FormGroup,
    Label,
    Input,
    ListGroup,
    ListGroupItem,
} from "reactstrap";
const moment = require("moment");
const axios = require("axios");

function Blog(props) {
    const [userBlog, setBlog] = useState({});
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [comment, setComment] = useState("");
    const commentChange = e => setComment(e.target.value);
    const submitComment = () => {
        axios({
            method: "post",
            url: `http://localhost:8000/blog/addComment/${userBlog._id}`,
            headers: {
                Authorization: "Bearer " + Cookie.get("token"),
            },
            data: {
                comment,
                user_name: JSON.parse(Cookie.get("user")).username,
            },
        })
            .then(response => {
                setComments(response.data);
            })
            .catch(err => {
                console.log(err.response.data);
            });
    };
    const fetchUserBlog = () => {
        axios({
            method: "get",
            url: `http://localhost:8000/blog/${props.match.params.blog_id}`,
            headers: {
                Authorization: "Bearer " + Cookie.get("token"),
            },
        })
            .then(response => {
                setBlog(response.data);
                setComments(response.data.comments);
                setLikes(response.data.likes);
            })
            .catch(err => {
                console.log(err.response);
            });
    };
    useEffect(() => {
        fetchUserBlog();
    }, []);
    const renderComments = () => {
        const renderedComments = comments.map(comment => (
            <ListGroupItem className="bg-light" key={comment._id}>
                {comment.comment}
                <p style={{ fontSize: "0.8rem" }}>
                    By {comment.user},{" "}
                    {moment(comment.date).format(" Do MMMM, YYYY")}{" "}
                </p>
            </ListGroupItem>
        ));
        if (renderedComments.length) {
            return (
                <>
                    <h5 className="text-info">Comments..</h5>
                    <ListGroup>{renderedComments}</ListGroup>
                </>
            );
        }

        return <p> No comments yet</p>;
    };

    const commentBox = () => {
        if (Cookie.get("user")) {
            return (
                <>
                    <FormGroup className="mb-2 mt-5 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">
                            Add Comment:
                        </Label>
                        <Input
                            type="textarea"
                            onChange={commentChange}
                            name="text"
                            id="exampleText"
                            value={comment}
                        />
                    </FormGroup>
                    <Button
                        color="success"
                        onClick={submitComment}
                        className="btn-sm mt-1"
                    >
                        Submit
                    </Button>
                </>
            );
        }
    };

    const likeBlog = () => {
        if (Cookie.get("user")) {
            axios({
                method: "put",
                url: `http://localhost:8000/blog/like/${userBlog._id}`,
                headers: {
                    Authorization: "Bearer " + Cookie.get("token"),
                },
                data: {
                    user_id: JSON.parse(Cookie.get("user"))._id,
                },
            })
                .then(response => {
                    console.log(response.data);
                    setLikes(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const currentUserLiked = x => likes.find(like => like.user === x);
    const renderLike = () => {
        let likeIcon = null;
        if (
            Cookie.get("user") &&
            currentUserLiked(JSON.parse(Cookie.get("user"))._id)
        ) {
            likeIcon = <LikeIcon className="mr-2 pointer" />;
        } else {
            likeIcon = (
                <DisLikeIcon className="mr-2 pointer" onClick={likeBlog} />
            );
        }
        return (
            <div className=" container my-2 row">
                {likeIcon}
                {likes.length}
            </div>
        );
    };
    return (
        <div className="container-fluid p-3">
            <h3 className="text-center text-primary ">{userBlog.title}</h3>
            <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
                By{" "}
                {userBlog.user ? <strong>{userBlog.user.username}</strong> : ""}
                ,{moment(userBlog.date).format(" Do MMMM, YYYY")}{" "}
            </p>
            <hr></hr>
            <p style={{ fontSize: "1.1rem" }}>{userBlog.body}</p>
            {Cookie.get("user") ? null : (
                <p className="font-italic font-weight-bold mt-2">
                    Login To Comment and Like!
                </p>
            )}
            {renderLike()}
            {renderComments()}
            {commentBox()}
        </div>
    );
}

export default Blog;
