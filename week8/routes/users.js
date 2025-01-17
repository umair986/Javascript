const { Router } = require("express");
const userRouter = Router();
// const mongoose = require("mongoose");
// const { auth, JWT_SECRET } = require("./auth");

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "user signin",
  });
});

userRouter.post("/signup", function (req, res) {
  res.json({
    message: "user signup",
  });
});
userRouter.get("/purchased", function (req, res) {
  res.json({
    message: "user purchased",
  });
});

module.exports = {
  userRouter: userRouter,
};
