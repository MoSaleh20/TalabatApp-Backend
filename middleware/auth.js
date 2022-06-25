const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('hi from auth');

    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) return res.status(401).send("Access denied. No token provided");
    console.log("token: " + token);

    try {
        const decoded = jwt.verify(token.toString(), "mykey");
        req.body.username = decoded.username;
        req.body.password = decoded.password;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(400).send("Invalid token");
    }
}

// export let generateAuthToken = (user: User) => {
//     const token = jwt.sign({ _id: user.username }, "mykey");
//     return token;
// }
// module.exports = auth