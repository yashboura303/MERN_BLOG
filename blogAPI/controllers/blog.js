const Blog = require('../models/blog.js');

exports.getBlogs = async (req, res, next) => {
    const blogs = await Blog.find({})
    .populate('comment')
    .exec(function(err, blogs) {
        if (err) res.status(422).res.json(err);
        res.json(blogs);
    });
};

exports.createBlog = async (req, res, next) => {
    const { blog, user } = req.body;

    const newBlog = await new Blog({
        blog,
        user
    }).save(err => {
        if (err) {
            res.status(500).send(err);
        }
    });
    res.send(newBLog);
};

exports.getUserBlogs = async (req, res, next) => {
    const user_id = req.params._id;
    const blogs = await Blog.find({ user: user_id }, (err) => {
        if (err) res.status(422).res.json(err);
        res.json(blogs);
    }).sort('-date');
};

exports.likeBlog = async (req, res, next) => {
    const blog_id = req.params._id;
    const blog = await Blog.findByIdAndUpdate(blog_id, { $inc: { 'blog.likes': 1 } }, { new: true }, (err) => {
        if (err) res.status(422).res.json(err);
        res.json(blog);
    });
};

exports.deleteBlog = async (req, res, next) => {
    const blog_id = req.params._id;
    const blog = await Blog.deleteOne({ _id: blog_id }, (err) => {
        if (err) res.status(422).res.json(err);
        res.json(blog);
    });
};

