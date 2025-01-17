const { Router } = require("express");
const adminRouter = Router();
// const mongoose = require("mongoose");
// const { auth, JWT_SECRET } = require("./auth");

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "admin signup",
  });
});

adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "admin signin",
  });
});

adminRouter.post("/course", function (req, res) {
  res.json({
    message: "admin signin",
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "admin signin",
  });
});

adminRouter.get("/course/bulk", function (req, res) {
  res.json({
    message: "admin signin",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
