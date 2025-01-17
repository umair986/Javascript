const { Router } = require("express");
const courseRouter = Router();
// const mongoose = require("mongoose");
// const { auth, JWT_SECRET } = require("./auth");

courseRouter.post("/create-course", function (req, res) {});

courseRouter.post("/delete-course", function (req, res) {});

courseRouter.get("/all-courses", function (req, res) {});

module.exports = {
  courseRouter: courseRouter,
};
