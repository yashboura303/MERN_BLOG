import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
// import { Spinner } from "reactstrap";
// import { ReactComponent as LikeIcon } from "./svgs/heart.svg";
// import { ReactComponent as DateIcon } from "./svgs/date.svg";
// const moment = require("moment");
const axios = require("axios");

function Blog(props) {
	const [userBlog, setBlog] = useState([]);
	const fetchUserBlog = () => {
		axios({
			method: "get",
			url: `http://localhost:8000/blogs/blog/${props.match.params.blog_id}`,
			headers: {
				Authorization: "Bearer " + Cookie.get("token"),
			},
		})
			.then((response) => {
				setBlog(response.data);
				// setFetched(true);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	useEffect(() => {
		fetchUserBlog();
	}, []);
	return <div className="container-fluid">blog </div>;
}

export default Blog;
