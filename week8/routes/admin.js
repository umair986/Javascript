const { Router } = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const adminRouter = Router();
const { adminModel } = require("../db");
// const { auth, JWT_SECRET } = require("./auth");

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
    name: z
      .string()
      .min(3, { message: "Must be 3 or more characters long" })
      .max(30, { message: "Must be 100 or fewer characters long" }),
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
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    await adminModel.create({
      email: email,
      password: password,
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
