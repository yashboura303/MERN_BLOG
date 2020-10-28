import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { ReactComponent as LikeIcon } from "./svgs/heart.svg";
import { Link } from "react-router-dom";
import { ReactComponent as DateIcon } from "./svgs/date.svg";
import { clearAlertAction } from "../redux/actions.js";
import { connect } from "react-redux";
const axios = require("axios");
const moment = require("moment");

function Home(props) {
    const [blogs, setBlogs] = useState([]);
    const [fetched, setFetched] = useState(false);
    const fetchAllBlogs = async () => {
        await axios({
            method: "get",
            url: "/api/blogs",
        })
            .then(response => {
                setBlogs(response.data);
                setFetched(true);
            })
            .catch(err => {
                setFetched(true);
                console.log(err.response);
            });
    };
    useEffect(() => {
        fetchAllBlogs();
    }, [props.message]);

    function showBlogs() {
        if (blogs.length === 0 && fetched)
            return <p className="text-center">Currently no blogs</p>;
        if (blogs.length > 0) {
            return (
                <div>
                    {blogs.map(blog => (
                        <div
                            className="container mx-auto border border-dark m-4 pt-2 blogs-card"
                            key={blog._id}
                        >
                            <Link to={`/blog/${blog._id}`}>
                                <h4 className="  text-monospace font-weight-bold pointer">
                                    {blog.title}
                                </h4>
                            </Link>

                            <div
                                className="container-fluid mb-0 pb-0 mt-4 row justify-content-between"
                                style={{ fontSize: "0.9rem" }}
                            >
                                <p className="mb-2">
                                    <DateIcon /> -
                                    {moment(blog.date).format("Do MMMM, YYYY")}
                                </p>
                                <p className="mb-2">
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
const mapStateToProps = state => {
    return {
        type: state.alert.type,
        message: state.alert.message,
    };
};

export default connect(mapStateToProps, { clearAlertAction })(Home);
