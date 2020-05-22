const express = require('express');
const router = express.Router();
const blogs = require('../controllers/blog.js');
const comments = require('../controllers/comment.js');
/* GET home page. */
router.get('/blogs', blogs.getBlogs);
router.get('/blogs/:_id', blogs.getUserBlogs);

router.post('blogs'.blogs.createBlog);
router.post('/blogs/:id/addComment', comments.createComment);

router.put('/blogs/like', blogs.likeBlog);

router.delete('/blogs/delete', blogs.deleteBlog);


	
	

module.exports = router;
