import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { ReactComponent as LikeIcon } from "./svgs/heart.svg";
import { Link } from "react-router-dom";
import { ReactComponent as DateIcon } from "./svgs/date.svg";
const axios = require("axios");
const moment = require("moment");

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [fetched, setFetched] = useState(false);
    const fetchAllBlogs = async () => {
        await axios({
            method: "get",
            url: `/blogs`,
        })
            .then(response => {
                setBlogs(response.data);
                setFetched(true);
            })
            .catch(err => {
                console.log(err.response);
            });
    };
    useEffect(() => {
        fetchAllBlogs();
    }, []);
    function showBlogs() {
        if (blogs.length === 0 && fetched)
            return <p className="text-center">Currently no blogs</p>;
        if (blogs.length > 0) {
            return (
                <div>
                    {blogs.map(blog => (
                        <div
                            className="container border border-dark m-4 p-2"
                            key={blog._id}
                        >
                            <Link to={`/blog/${blog._id}`}>
                                <h4 className="text-primary text-monospace font-weight-bold pointer">
                                    {blog.title}
                                </h4>
                            </Link>

                            <div className="container row justify-content-between">
                                <p style={{ fontSize: "0.9rem" }}>
                                    <DateIcon /> -
                                    {moment(blog.date).format("Do MMMM, YYYY")}
                                </p>
                                <p style={{ fontSize: "0.9rem" }}>
                                    <LikeIcon /> {blog.likes.length}
                                </p>
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
    return <div className="container-fluid">{showBlogs()}</div>;
}

export default Home;
