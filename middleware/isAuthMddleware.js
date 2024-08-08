const jwt = require("jsonwebtoken");
require('dotenv').config();

const isAuth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        console.log("*****************************************");
        return res.status(401).json({ massage: 'Not authenticated.' });
    }
    const replaceToken = token.replace("Bearer ", "");
    let decoded;
    try {
        console.log(replaceToken);
        console.log(token);
        decoded = jwt.verify(replaceToken, process.env.SECRETKEY);
    } catch (error) {
        console.log("*********************2*******************");
        console.log(error.message);
        return res.status(500).json({ error: error.message })
    }
    if (!decoded) {
        return res.status(401).json({ massage: 'Not authenticated.' });
    }
    req.user = decoded;
    console.log("*****************************************");
    return res.status(200).json(true)
};

module.exports = isAuth;