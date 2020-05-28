const Blog = require("../models/blog.js");
const { blogValidation } = require("./validationSchemas/index.js");

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
    console.log(user, blogTitle, blogBody);
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
    const user_id = req.params._id;
    try {
        await Blog.find({ user: user_id }, (err, blogs) => {
            if (err) res.status(422).json(err);
            res.json(blogs);
        }).sort("-date");
    } catch (error) {
        res.json(error);
    }
};

exports.likeBlog = async (req, res, next) => {
    const blog_id = req.params._id;
    const blog = await Blog.findByIdAndUpdate(
        blog_id,
        { $inc: { "blog.likes": 1 } },
        { new: true },
        (err) => {
            if (err) res.status(422).res.json(err);
            res.json(blog);
        }
    );
};

exports.deleteBlog = async (req, res, next) => {
    const blog_id = req.params._id;
    await Blog.deleteOne({ _id: blog_id }, (err, blog) => {
        if (err) res.status(422).res.json(err);
        res.json(blog);
    });
};
