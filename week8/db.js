const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  courses: String,
});

//lololol
const Admin = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  courses: String,
});

const Course = new Schema({
  title: String,
  desc: String,
  price: Number,
  imageURL: String,
  creatorID: ObjectId,
});

const Purchases = new Schema({
  purchaseID: ObjectId,
  userID: ObjectId,
});

const UserModel = mongoose.model("users", User);
const adminModel = mongoose.model("admin", Admin);
const courseModel = mongoose.model("course", Course);
const purchaseModel = mongoose.model("purchase", Purchases);

module.exports = {
  UserModel,
  adminModel,
  courseModel,
  purchaseModel,
};
