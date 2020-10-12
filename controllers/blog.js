const Blog = require("../models/blog.js");
const { blogValidation } = require("./validationSchemas/index.js");

exports.uploadImage = async (req, res, next) => {
    try {
        res.json({ location: req.files[0].path });
    } catch (e) {
        res.json(e);
    }
};

exports.getBlogs = async (req, res, next) => {
    const blogs = await Blog.find({})
        .populate("comment")
        .exec(function (err, blogs) {
            if (err) res.status(422).res.json(err);
            res.json(blogs);
        });
};

exports.createBlog = async (req, res, next) => {
    const { blogTitle, blogBody, user } = req.body;
    const { error } = blogValidation({ blogTitle, blogBody });
    if (error) return res.status(400).json("All fields are required!");

    await new Blog({
        body: blogBody,
        title: blogTitle,
        user,
    }).save((err, newBlog) => {
        if (err) res.status(400).json(err);
        res.json(newBlog);
    });
};

exports.getUserBlogs = async (req, res, next) => {
    const user_id = req.params.user_id;
    try {
        await Blog.find({ user: user_id }, (err, blogs) => {
            if (err) res.status(422).json(err);
            res.json(blogs);
        }).sort("-date");
    } catch (error) {
        res.json(error);
    }
};

exports.getBlogByID = async (req, res) => {
    const blog_id = req.params.blog_id;
    try {
        const blog = await Blog.findById(blog_id)
            .populate("comments")
            .populate("user");
        res.json(blog);
    } catch (error) {
        res.status(401).json(error);
    }
};
exports.updateBlog = async (req, res) => {
    const blog_id = req.params.blog_id;
    const updated_blog = {
        title: req.body.title,
        body: req.body.body,
    };
    try {
        const blog = await Blog.findByIdAndUpdate(blog_id, updated_blog);
        res.json(blog);
    } catch (error) {
        res.status(401).json(error);
    }
};

exports.likeBlog = async (req, res) => {
    const blog_id = req.params.blog_id;
    const user_id = req.body.user_id;
    const blog = await Blog.findById(blog_id);
    blog.likes.unshift({ user: user_id });
    await blog.save();
    Blog.findById(blog_id)
        .then(result => {
            res.json(result.likes);
        })
        .catch(error => {
            res.status(501).json({ error });
        });
};

exports.disLikeBlog = async (req, res) => {
    const blog_id = req.params.blog_id;
    const user_id = req.body.user_id;
    const blog = await Blog.findById(blog_id);
    const likeIndex = blog.likes.findIndex(like => like.user == user_id);
    blog.likes.splice(likeIndex, 1);
    await blog.save();
    Blog.findById(blog_id)
        .then(result => {
            res.json(result.likes);
        })
        .catch(error => {
            res.status(501).json({ error });
        });
};

exports.deleteBlog = async (req, res, next) => {
    const blog_id = req.params._id;
    await Blog.deleteOne({ _id: blog_id }, (err, blog) => {
        if (err) res.status(422).res.json(err);
        res.json(blog);
    });
};
