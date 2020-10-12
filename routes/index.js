const express = require("express");
const router = express.Router();
const blogs = require("../controllers/blog.js");
const comments = require("../controllers/comment.js");
const auth = require("../controllers/verifyToken.js");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        // folder: "../public/images",
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [{ quality: "auto", fetch_format: "auto" }],
    },
});
const parser = multer({ storage: storage });
/* GET home page. */
router.get("/blogs", blogs.getBlogs);
router.get("/blogs/:user_id", auth, blogs.getUserBlogs);
router.get("/blog/:blog_id", blogs.getBlogByID);

router.post("/blogs", auth, blogs.createBlog);
router.post("/blogs/uploadImage", parser.any(), blogs.uploadImage);
router.post("/blog/addComment/:blog_id", auth, comments.createComment);

router.put("/blog/like/:blog_id", auth, blogs.likeBlog);
router.put("/blog/updateBlog/:blog_id", auth, blogs.updateBlog);
router.put("/blog/dislike/:blog_id", auth, blogs.disLikeBlog);

router.delete("/blogs/delete/:_id", auth, blogs.deleteBlog);

module.exports = router;
