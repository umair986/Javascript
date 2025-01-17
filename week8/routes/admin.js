const { Router } = require("express");
const adminRouter = Router();
// const mongoose = require("mongoose");
// const { auth, JWT_SECRET } = require("./auth");

adminRouter.post("/admin/signup", function (req, res) {
  res.json({
    message: "admin signup",
  });
});

adminRouter.post("/admin/signin", function (req, res) {
  res.json({
    message: "admin signin",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
