const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, JWT_USER_PASSWORD);

  if (decoded) {
    req.userID = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "User does not exist",
    });
  }
}

module.exports = {
  userMiddleware: userMiddleware,
};
