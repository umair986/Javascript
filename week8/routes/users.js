const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "123";
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
  const { email, password } = req.body;

  const User = await UserModel.findOne({
    email: email,
    password: password,
  });
  console.log(User);

  if (User) {
    const token = jwt.sign(
      {
        id: User._id, //to convert userID to string
      },
      JWT_USER_PASSWORD
    );
    //Cookie logic here
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid Credentials",
    });
  }
});
userRouter.get("/purchased", function (req, res) {
  res.json({
    message: "user purchased",
  });
});

module.exports = {
  userRouter: userRouter,
};
