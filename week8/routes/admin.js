const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const adminRouter = Router();
const { adminMiddleware } = require("../middlewares/admin");
const { adminModel, courseModel } = require("../models");
const { JWT_ADMIN_PASSWORD } = require("../config");

adminRouter.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(100, { message: "Must be 100 or fewer characters long" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(100, { message: "Must be 100 or fewer characters long" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/\d/, { message: "Must contain at least one number" })
      .regex(/[@$!%*?&#]/, {
        message:
          "Must contain at least one special character (@, $, !, %, *, ?, &, #)",
      }),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Incorrect Format",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  try {
    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);
    // console.log(hashedPassword);

    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    res.json({
      message: "You are signed up",
    });
  } catch (e) {
    res.status(500).json({
      message: "User already exist",
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;
    const adminUser = await adminModel.findOne({ email });

    if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }
    if (adminUser) {
      const token = jwt.sign({ id: adminUser._id }, JWT_ADMIN_PASSWORD);
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminID = req.adminID;

  const { title, desc, imageURL, price } = req.body;

  try {
    const course = await courseModel.create({
      title,
      desc,
      price,
      imageURL,
      creatorID: adminID,
    });

    res.json({
      message: "Course Created",
      courseID: course._id,
    });
  } catch (error) {
    console.error("MongoDB Insert Error:", error);
    res.status(500).json({ message: "Error creating course", error });
  }
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminID = req.adminID;

  const { title, desc, imageURL, price, courseID } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseID,
      creatorID: adminID,
    },
    {
      title,
      desc,
      price,
      imageURL,
    }
  );
  res.json({
    message: "Course Updated",
    courseID: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminID = req.adminID;

  const course = await courseModel.find({
    creatorID: adminID,
  });
  res.json({
    message: "Here are your courses",
    course,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
