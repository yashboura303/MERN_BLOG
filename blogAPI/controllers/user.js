const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateSchema = require('./validationSchemas/index.js');
const { loginValidation, registerValidation } = require('./validationSchemas/index.js');
const refreshTokens = [];

exports.createUser = async (req, res, next) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ username: req.body.email });
    if (emailExist) return res.status(400).send("Email Exists");

    const userNameExist = await User.findOne({ username: req.body.username });
    if (userNameExist) return res.status(400).send("User Name  Exists");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);


    const new_user = await new User({
        fullName: req.body.fullName,
        password: hashedPassword,
        username: req.body.username,
        email: req.body.email
    });

    const savedUser = new_user.save(err => {
        if (err) {
            res.send(err.errmsg);
        }
        res.send(`User created`);
    });

};

exports.getUsers = async (req, res, next) => {
    console.log(req.user);
    const users = await User.find({});
    res.send(users);
};


exports.login = async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Username doesn't exist");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    const token = jwt.sign({ _id: user._id, name: user.fullName }, process.env.TOKEN_SECRET);
    refreshTokens.push(token);
    res.cookie('token', token);
    res.header('auth-token', token);
    res.json({token});
    // res.send("loggged in!");
};

exports.verify = (req, res, next) => {
    res.send("Verifed");
};

exports.logout = async (req, res, next) => {

};
// {
//  "fullName":"admin",
//  "password":"password",
//  "username":"admin",
//  "email":"govind@gmail.com"
// }