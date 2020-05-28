import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
const axios = require("axios");
const moment = require('moment');

function UserBlogs(props) {
	const [ blogs, setBlogs ] = useState([]);
	const { id } = props.match.params;
	useEffect(() => {
		const fetchUserBlogs = () =>{
		axios({
			method: "get",
			url: `http://localhost:8000/blogs/${id}`,
			headers: {
				Authorization: "Bearer " + Cookie.get("token"),
			},
		})
			.then((response) => {
				console.log(response.data);
				setBlogs(response.data);
				// setErrorMessage("");
			})
			.catch((err) => {
				console.log(err.response);
				// setErrorMessage(err.response.data);
			});

		};
		fetchUserBlogs();
	}, []);

	function showBlogs(){
		if (blogs.length==0) return (<p className="text-center">You have currently no blogs</p>);
		return(
			{blogs.map((blog)=>(
			<div className="container border border-dark m-2 p-2">
			<h4 className="text-primary text-monospace font-weight-bold">{blog.title}</h4>
			<p>{blog.body}</p>
			<p className="badge badge-dark" >{moment(blog.date).format('Do MMMM, YYYY')}</p>
			</div>
			))}
		)
	}
	return (
		<div className="container">
		{showBlogs()}
		</div>)
	};



export default UserBlogs;
