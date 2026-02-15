const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { getSecret } = require("../utils/secrets");

const authMiddleware = async (req, res , next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");  

    if(!token)
        return res.status(401).send("Access Denied")

    try {
        // const verified = jwt.verify(token , process.env.JWT_SECRET) ;
                const verified = jwt.verify(token , getSecret("JWT_SECRET")) ;

        req.user = await User.findById(verified.id);
        next();
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = authMiddleware;
