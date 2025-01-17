const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  userID: ObjectId,
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  courses: String,
});

const Admin = new Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  courses: String,
});

const Course = new Schema({
  title: String,
  desc: String,
  price: String,
  imageURL: String,
  creatorID: ObjectId,
});

const Purchases = new Schema({
  purchaseID: ObjectId,
  userID: ObjectId,
  creatorID: ObjectId,
});
