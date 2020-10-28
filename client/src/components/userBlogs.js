import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter, Spinner } from "reactstrap";
import { Link } from "react-router-dom";

const axios = require("axios");
const moment = require("moment");

function UserBlogs(props) {
    const [modal, setModal] = useState(false);
    const [blogID, setBlogId] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [fetched, setFetched] = useState(false);

    const fetchUserBlogs = async id => {
        await axios({
            method: "get",
            url: `/api/blogs/${id}`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(response => {
                setBlogs(response.data);
                setFetched(true);
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    const toggle = () => setModal(!modal);
    const deleteBlog = () => {
        axios({
            method: "delete",
            url: `/api/blogs/delete/${blogID}`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(response => {
                fetchUserBlogs(props.match.params.id);
            })
            .catch(err => {
                console.log("Errror", err.response);
            });
    };
    const setIDtoDelete = id => {
        setBlogId(id);
        setModal(!modal);
    };
    const confirmDelete = () => {
        setModal(!modal);
        deleteBlog();
        fetchUserBlogs(props.match.params.id);
    };
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            props.history.push("/");
        }
        fetchUserBlogs(props.match.params.id);
    }, [props.history, props.match.params.id]);

    function showBlogs() {
        if (blogs.length === 0 && fetched)
            return (
                <h2
                    className="text-center pt-5 no-blogs-heading"
                    style={{ height: "70vh" }}
                >
                    You have currently no blogs, write a blog now!
                </h2>
            );
        if (blogs.length > 0) {
            return (
                <div style={{ height: "70vh" }} className="mt-3 user-blogs">
                    {blogs.map(blog => (
                        <div
                            className="container  m-3 p-2 user-blogs-card"
                            key={blog._id}
                        >
                            <Link to={`/blog/${blog._id}`}>
                                <h4 className="text-monospace font-weight-bold d-inline-block">
                                    {blog.title}
                                </h4>
                            </Link>
                            <br></br>
                            <p className="badge badge-dark">
                                {moment(blog.date).format("Do MMMM, YYYY")}
                            </p>
                            {/* <p>{blog.body}</p> */}
                            <div className="container row justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm mr-2"
                                    onClick={() => setIDtoDelete(blog._id)}
                                >
                                    Delete
                                </button>
                                <Link to={`/blog/edit/${blog._id}`}>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => setIDtoDelete(blog._id)}
                                    >
                                        Edit
                                    </button>
                                </Link>
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
