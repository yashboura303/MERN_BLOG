const Blog = require('../models/blog.js');
const Comment = require('../models/comment.js');

exports.createComment = async (req, res, next) => {
    const { comment, user_id, blog_id } = req.body;
    const blog = Blog.findById({blog_id});
    const newComment = await new Comment({
        comment,
        user: user_id
    }).save(async (err, comment) => {
        if (err) {
            res.status(500).send(err);
        }
        blog.comments.push(comment._id);
        const updateBlog = Blog.findById({blog_id}).populate('comments').then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });

    });

};