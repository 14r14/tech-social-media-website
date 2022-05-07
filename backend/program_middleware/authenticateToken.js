const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token === null) return res.send({success: false, msg: "Not authorized."})

    jwt.verify(token, String(process.env.TOKEN_SECRET), (err, user) => {
        console.log(err);

        if (err) return res.send({success: false, msg: "Token invalid."})

        req.user = user;

        next();
    })
}

module.exports = authenticateToken;