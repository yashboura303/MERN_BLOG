import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter, Spinner } from "reactstrap";
import Cookie from "js-cookie";
const axios = require("axios");
const moment = require("moment");


function UserBlogs(props) {
	const [modal, setModal] = useState(false);
	const [blogID, setBlogId] = useState(0);
	const [blogs, setBlogs] = useState([]);
	const [fetched, setFetched] = useState(false);

	const toggle = () => setModal(!modal);
	const deleteBlog = () => {
		axios({
			method: "delete",
			url: `http://localhost:8000/blogs/delete/${blogID}`,
			headers: {
				Authorization: "Bearer " + Cookie.get("token"),
			},
		})
			.then((response) => {
				fetchUserBlogs();
			})
			.catch((err) => {
				console.log("Errror", err.response);
			});
	};
	const setIDtoDelete = (id) => {
		setBlogId(id);
		setModal(!modal);
	};
	const confirmDelete = () => {
		setModal(!modal);
		deleteBlog();
	};
	const fetchUserBlogs = () => {
		axios({
			method: "get",
			url: `http://localhost:8000/blogs/${props.match.params.id}`,
			headers: {
				Authorization: "Bearer " + Cookie.get("token"),
			},
		})
			.then((response) => {
				setBlogs(response.data);
				setFetched(true);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	useEffect(() => {
		fetchUserBlogs();
	}, []);

	function showBlogs() {
		if (blogs.length === 0 && fetched)
			return <p className="text-center">You have currently no blogs</p>;
		if (blogs.length > 0) {
			return (
				<div>
					{blogs.map((blog) => (
						<div
							className="container border border-dark m-2 p-2"
							key={blog._id}
						>
							<h4 className="text-primary text-monospace font-weight-bold">
								{blog.title}
							</h4>
							<p>{blog.body}</p>
							<div className="container row justify-content-between">
								<p className="badge badge-dark">
									{moment(blog.date).format("Do MMMM, YYYY")}
								</p>
								<button
									type="button"
									className="btn btn-danger btn-sm"
									onClick={() => setIDtoDelete(blog._id)}
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			);
		}
		return (
			<div className="text-center spin">
				<Spinner color="primary" />
			</div>
		);
	}
	return (
		<div className="container">
			{showBlogs()}
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Are You Sure?</ModalHeader>
				<ModalFooter>
					<Button color="danger" onClick={confirmDelete}>
						Yes
					</Button>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default UserBlogs;
