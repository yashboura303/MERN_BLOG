import React, { useEffect, useState } from "react";
import { ReactComponent as LikeIcon } from "./svgs/liked.svg";
import { Spinner } from "reactstrap";
import { ReactComponent as DisLikeIcon } from "./svgs/not-liked.svg";
import {
    Button,
    FormGroup,
    Label,
    Input,
    ListGroup,
    ListGroupItem,
    Container,
} from "reactstrap";
var parse = require("html-react-parser");
const moment = require("moment");
const axios = require("axios");

function Blog(props) {
    const [userBlog, setBlog] = useState({});
    const [fetched, setFetched] = useState(false);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [comment, setComment] = useState("");
    const commentChange = e => {
        setComment(e.target.value);
    };
    const submitComment = e => {
        e.preventDefault();
        setComment("");
        axios({
            method: "post",
            url: `/api/blog/addComment/${userBlog._id}`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: {
                comment,
                user_name: JSON.parse(localStorage.getItem("user")).username,
            },
        })
            .then(response => {
                setComments(response.data);
            })
            .catch(err => {
                console.log(err.response.data);
            });
    };
    useEffect(() => {
        async function fetchUserBlog() {
            await axios({
                method: "get",
                url: `/api/blog/${props.match.params.blog_id}`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
                .then(response => {
                    setBlog(response.data);
                    setComments(response.data.comments);
                    setLikes(response.data.likes);
                    setFetched(true);
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
        fetchUserBlog();
    }, [props.match.params.blog_id]);

    const renderComments = () => {
        const renderedComments = comments.map(comment => (
            <ListGroupItem className=" comment mb-2" key={comment._id}>
                <p>
                    <span className="username float-left text-capitalize">
                        {comment.user},
                    </span>
                    <span className="date float-right">
                        {moment(comment.date).format(" Do MMMM, YYYY")}{" "}
                    </span>
                </p>
                <p className="comment-body mt-4 mb-0">{comment.comment}</p>
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
        if (localStorage.getItem("user")) {
            return (
                <>
                    <form onSubmit={submitComment}>
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
                                required
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            color="success"
                            className="btn-sm mt-1 mb-4"
                        >
                            Submit
                        </Button>
                    </form>
                </>
            );
        }
    };

    const likeBlog = () => {
        if (localStorage.getItem("user")) {
            axios({
                method: "put",
                url: `/api/blog/like/${userBlog._id}`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    user_id: JSON.parse(localStorage.getItem("user"))._id,
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

    const disLikeBlog = () => {
        if (localStorage.getItem("user")) {
            axios({
                method: "put",
                url: `/api/blog/disLike/${userBlog._id}`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    user_id: JSON.parse(localStorage.getItem("user"))._id,
                },
            })
                .then(response => {
                    console.log(response.data);
                    setLikes(response.data);
                    renderLike();
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
            localStorage.getItem("user") &&
            currentUserLiked(JSON.parse(localStorage.getItem("user"))._id)
        ) {
            likeIcon = (
                <LikeIcon className="mr-2 pointer" onClick={disLikeBlog} />
            );
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
    if (!fetched) {
        return (
            <div className="text-center spin">
                <Spinner color="primary" />
            </div>
        );
    }
    return (
        <div className="container-fluid p-3 p-sm-5 bg-white">
            <h1 className="text-center  ">{userBlog.title}</h1>
            <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
                By{" "}
                {userBlog.user ? <strong>{userBlog.user.username}</strong> : ""}
                ,{moment(userBlog.date).format(" Do MMMM, YYYY")}{" "}
            </p>
            <hr></hr>
            <Container fluid>{parse(`${userBlog.body}`)}</Container>
            {localStorage.getItem("user") ? null : (
                <p className="font-italic font-weight-bold mt-2">
                    Login To Comment and Like!
                </p>
            )}
            {renderLike()}
            {commentBox()}
            {renderComments()}
        </div>
    );
}

export default Blog;
