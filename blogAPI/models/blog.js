const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema =
    new Schema({
        body: { type: String, required: true },
        title: { type: String, required: true },
        published: { type: String, default: false },
        date: { type: Date, default: Date.now },
        user: { type: Schema.Types.ObjectId, ref: 'BlogUser' },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
        likes:{type:Number, default:0}
    });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;