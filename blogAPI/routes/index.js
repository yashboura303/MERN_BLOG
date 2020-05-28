const express = require('express');
const router = express.Router();
const blogs = require('../controllers/blog.js');
const comments = require('../controllers/comment.js');
const auth = require('../controllers/verifyToken.js');	
/* GET home page. */
router.get('/blogs', blogs.getBlogs);
router.get('/blogs/:_id', auth, blogs.getUserBlogs);

router.post('/blogs',auth, blogs.createBlog);
router.post('/blogs/:id/addComment',auth, comments.createComment);

router.put('/blogs/like', auth,blogs.likeBlog);

router.delete('/blogs/delete/:_id',auth, blogs.deleteBlog);


	
	

module.exports = router;
