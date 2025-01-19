const express = require("express");
const mongoose = require("mongoose");
// const { auth, JWT_SECRET } = require("./auth");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/courses");
const { userRouter } = require("./routes/users");
const app = express();
app.use(express.json());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://mohumair1901:mohumair1901@cluster0.r4h0l.mongodb.net/course-selling-app-week8"
  );
  app.listen(3000);
  console.log("listening on port 3000");
}

main();
