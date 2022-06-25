const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

module.exports = async (req, res, next) => {
    console.log('hi from adminAuth');

    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send("Access denied. No token provided");

    try {
        const decoded = jwt.verify(token.toString(), "mykey");
        let id = decoded._id;
        let u = await User.findById(id);
        if(u.isAdmin) {
            next()
        }
        else {
            res.json({"NotAdmin" : true})
        }
        
    }
    catch (e) {
        console.log(e);
        res.status(400).send("Invalid token");
    }
}