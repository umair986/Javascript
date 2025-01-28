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
  const email = req.body.email;
  const password = req.body.password;

  const adminUser = await adminModel.findOne({
    email: email,
    password: password,
  });
  console.log(adminUser);

  if (adminUser) {
    const token = jwt.sign(
      {
        id: adminUser._id, //to convert userID to string
      },
      JWT_ADMIN_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid Credentials",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminID = req.adminID;

  const { title, desc, imageURL, price } = req.body;

  const course = await courseModel.create({
    title,
    desc,
    price,
    imageURL,
    createrID: adminID,
  });

  res.json({
    message: "Course Created",
    courseID: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminID = req.adminID;

  const { title, desc, imageURL, price, courseID } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseID,
      createrID: adminID,
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
    createrID: adminID,
  });
  res.json({
    message: "Here are your courses",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
