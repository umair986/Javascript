const express = require("express");
// const { auth, JWT_SECRET } = require("./auth");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/courses");
const { userRouter } = require("./routes/users");
const app = express();
app.use(express.json());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);

app.listen(3000);
