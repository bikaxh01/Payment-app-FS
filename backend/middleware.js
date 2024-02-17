const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {  // user auth middleware
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) { 
        return res.status(403).json({msg:'Invalid user'});
    }

    const token = authHeader.split(' ')[1]; // removing barrer from auth 

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // verify JWT
 
        req.userId = decoded.userID; 

        next();
    } catch (err) {
        return res.status(403).json({});
    }
    
};

module.exports = {
    authMiddleware
}