const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema =
    new Schema({
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
        user: { type: Schema.Types.ObjectId, ref: 'BlogUser' },
    });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;