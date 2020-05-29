import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
// import { Spinner } from "reactstrap";
// import { ReactComponent as LikeIcon } from "./svgs/heart.svg";
// import { ReactComponent as DateIcon } from "./svgs/date.svg";
const moment = require("moment");
const axios = require("axios");

function Blog(props) {
	const [userBlog, setBlog] = useState({});
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	const commentChange = (e) => setComment(e.target.value);
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
			.then((response) => {
				setComments(response.data);
			})
			.catch((err) => {
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
			.then((response) => {
				setBlog(response.data);
				setComments(response.data.comments);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	useEffect(() => {
		fetchUserBlog();
	}, []);
	const renderComments = () => {
		const renderedComments = comments.map((comment) => (
			
			<ListGroupItem className="bg-light"  key={comment._id}>
			{comment.comment}
			<p style={{ fontSize: "0.8rem" }}>By {comment.user}, {moment(comment.date).format(" Do MMMM, YYYY")} </p>
			</ListGroupItem>
		));
		if (renderedComments.length)
		{
			return (
			<>
			<h5 className="text-info">Comments..</h5>
			<ListGroup>
			{renderedComments}
			</ListGroup>
			</>)
		}
		
		return <p> No comments yet</p>
		
	};
	return (
		<div className="container-fluid p-3">
			<h3 className="text-center text-primary ">{userBlog.title}</h3>
			<p className= "text-secondary" style={{ fontSize: "0.9rem" }}>
				By {userBlog.user ? <strong>{userBlog.user.username}</strong> : ""},
				{moment(userBlog.date).format(" Do MMMM, YYYY")}{" "}
			</p>

			<hr></hr>
			<p style={{ fontSize: "1.1rem" }} >{userBlog.body}</p>
			{renderComments()}
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
		</div>
	);
}

export default Blog;
// {userBlog.user.username}
