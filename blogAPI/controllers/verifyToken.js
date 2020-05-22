const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
module.exports = function auth(req, res, next) {
    const token = req.cookies.token;
    // const bearerHeader = req.headers['authorization'] || req.headers['x-access-token'];
    // console.log(bearerHeader);
    // const bearer = bearerHeader.split(' ');
    //    const bearerToken = bearer[1];
    // console.log("token", bearerToken);
    if (!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const { _id } = verified;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        });
    } catch (err) {
        res.status(400).send("Invalid Token");
    }

};