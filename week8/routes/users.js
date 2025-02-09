const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models");
const { purchaseModel } = require("../models");
const { courseModel } = require("../models");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");
const { JWT_USER_PASSWORD } = require("../config");

userRouter.post("/signup", async function (req, res) {
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
    const { email, firstname, lastname, password } = req.body;
    // console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 5);
    // console.log(hashedPassword);

    const checking = await UserModel.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hashedPassword,
    });
    console.log(checking);
    res.json({
      message: "Successfully signed in",
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error" + e,
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email });
    if (!User || !(await bcrypt.compare(password, User.password))) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }
    if (User) {
      const token = jwt.sign({ id: User._id }, JWT_USER_PASSWORD);
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  // const User = await UserModel.findOne({
  //   email: email,
  //   password: password,
  // });
  // console.log(User);

  // if (User) {
  //   const token = jwt.sign(
  //     {
  //       id: User._id, //to convert userID to string
  //     },
  //     JWT_USER_PASSWORD
  //   );
  //   //Cookie logic here
  //   res.json({
  //     token: token,
  //   });
  // } else {
  //   res.status(403).json({
  //     message: "Invalid Credentials",
  //   });
  // }
});
userRouter.get("/purchased", userMiddleware, async function (req, res) {
  const userID = req.userID;

  const purchases = await purchaseModel.find({
    userID,
  });

  const coursesData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseID) },
  });

  res.json({
    messag: "your purchased courses",
    purchases,
    coursesData,
  });
});

module.exports = {
  userRouter: userRouter,
};
