const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Get token from headers
  const token = req.header("x-auth-token");
  //Check if no Token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization failed" });
  }
  //Verify Token
  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid." });
  }
};
