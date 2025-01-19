const { Router } = require("express");
const userRouter = Router();
const { UserModel } = require("../db");
const { z } = require("zod");
// const { auth, JWT_SECRET } = require("./auth");

userRouter.post("/signin", async function (req, res) {
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
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    await UserModel.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
    });
    res.json({
      message: "Successfully signed in",
    });
  } catch (e) {
    res.status(500).json({
      message: "User already exist",
    });
  }
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
