const mongoose = require("mongoose");

const Scheme = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

const User = new Schema ({
    username : String,
    password : String,
    name : String
})

const ToDo = new Schema ({
    desc : String,
    time : String,
    done : Boolean,
    userID : ObjectID
})

const UserModel = mongoose.model('users', User);
const ToDoModel = mongoose.model('todos', ToDo);

module.exports = {
    UserModel,
    ToDoModel
}