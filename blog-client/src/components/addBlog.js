import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from "react-redux";
import Cookie from "js-cookie";
import ErrorMessage from "./alerts/error.js";
const axios = require("axios");

function AddBlog(props) {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const onTitleChange = (e) => setTitle(e.target.value);
	const onBodyChange = (e) => setBody(e.target.value);
	const [error, setErrorMessage] = useState("");

	const createBlog = () => {
		console.log("cookkie user",Cookie.get('user'));
		axios({
			method: "post",
			url: "http://localhost:8000/blogs",
			data: {
				blogTitle:title,
				blogBody:body,
				user:Cookie.get('user')
			},
			headers:{
				"Authorization":"Bearer "+Cookie.get('token')
			}
		})
			.then((response) => {
				console.log(response.data);
				setErrorMessage("");
				// props.history.push("/");
			})
			.catch((err) => {
				console.log(err.response);
				setErrorMessage(err.response.data);
			});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		createBlog();
	};
  return (
    <div className="container">
      <h1 className="text-center text-info">Create New Blog</h1>
      <ErrorMessage error={error} />
		<Form onSubmit={onSubmit}>
      <FormGroup className="w-50">
        <Label>Blog Title</Label>
        <Input type="text" onChange = {onTitleChange}/>
      </FormGroup>
      <FormGroup 	 >
        <Label for="exampleText">Blog Body</Label>
        <Input type="textarea" rows="12" onChange={onBodyChange} />
      </FormGroup>
      <Button color = 'success'>Submit</Button>
    </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
	return { user:state.user };
};


export default connect(mapStateToProps)(AddBlog);