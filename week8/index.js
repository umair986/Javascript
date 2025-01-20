const express = require("express");
const mongoose = require("mongoose");
// const { auth, JWT_SECRET } = require("./auth");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/courses");
const { userRouter } = require("./routes/users");
const { connectDB } = require("./db");
const app = express();
app.use(express.json());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);

async function main() {
  connectDB()
    .then(() => {
      app.listen(3000, () => {
        console.log(`⚙ Server is running at port : 3000`);
      });
    })
    .catch((err) => {
      console.log("MONGO db connection failed !!! ", err);
    });
}

main();
