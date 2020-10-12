const User = require("../models/user.js");
const Blog = require("../models/blog.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateSchema = require("./validationSchemas/index.js");
const {
    loginValidation,
    registerValidation,
} = require("./validationSchemas/index.js");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.createUser = async (req, res, next) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res
            .status(400)
            .json("Email already exists, please login with your ID");

    const userNameExist = await User.findOne({ username: req.body.username });
    if (userNameExist)
        return res
            .status(400)
            .json("Username  Exists, please select another username");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const new_user = new User({
            fullName: req.body.name,
            password: hashedPassword,
            username: req.body.username,
            email: req.body.email,
        });
        const saved_user = await new_user.save();
        const user = await User.findOne({ username: req.body.username });
        const msg = {
            to: new_user.email,
            from: "blogify@protonmail.com",
            subject: "Welcome to blogify",
            html: `<p>Hi <strong>${new_user.fullName}</strong>, Welcome to the blogify. Below are your details:</p>
            <ul>
            <li>Username - ${new_user.username}</li>
            <li>Registered Email - ${new_user.email}</li>
            <li>Name - ${new_user.fullName}</li>
            </ul>
            `,
        };
        await sgMail.send(msg);
        const message = `Congrats you are logged in! Your account details is sent to your registered email`;
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        console.log(token);
        console.log(message);
        console.log(user);
        console.log(saved_user);
        res.cookie("token", token);
        res.header("auth-token", token);
        res.json({ token, user, message });
    } catch (err) {
        res.status(500).json(error);
    }
};

exports.getUsers = async (req, res, next) => {
    console.log(req.user);
    const users = await User.find({});
    res.send(users);
};

exports.login = async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("Username doesn't exist");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Incorrect Password");

    const blogs = await Blog.findById(user._id).populate("comments");
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.cookie("token", token);
    res.header("auth-token", token);
    res.json({ token, user });
};

exports.verify = (req, res, next) => {
    res.send("Verifed");
};

exports.logout = async (req, res, next) => {};
