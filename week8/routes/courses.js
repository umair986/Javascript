const { Router } = require("express");
const courseRouter = Router();
const { courseModel, purchaseModel } = require("../models");
const { userMiddleware } = require("../middlewares/user");
// const { auth, JWT_SECRET } = require("./auth");

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  const userID = req.userID;
  const courseID = req.body.courseID;

  await purchaseModel.create({
    userID,
    courseID,
  });
  res.json({
    message: "successfully bought this course",
  });
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
