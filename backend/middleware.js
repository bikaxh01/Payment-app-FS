const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // user auth middleware
  const authHeader = req.headers.authorization;
   
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Invalid user" });
  }

  let token = authHeader.split(" ")[1]; // removing barrer from auth
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // verify JWT

    req.userID = decoded.userId;
   
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid user" });
  }
};

module.exports = {
  authMiddleware,
};
