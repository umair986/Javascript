const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

  if (decoded) {
    req.adminID = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "User does not exist",
    });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
