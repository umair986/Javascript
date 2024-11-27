// https://petal-estimate-4e9.notion.site/Databases-and-MongoDb-1017dfd107358065a996cda5ed89682e

const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123123";
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require('./db');
mongoose.connect("mongodb+srv://mohumair1901:mohumair1901@cluster0.r4h0l.mongodb.net/todo-app-database");

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

   const UserName = await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    console.log(UserName);
    
    res.json({
        message: "You are signed up"
    })
});

app.post("/signin", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

     const user = await UserModel.findOne({
        email: email,
        password : password
    })

    console.log(user);

    if (user){
        const token = jwt.sign({
            id : user._id
        }, JWT_SECRET);
        res.json({
            message : token
        })
    }
    else{
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }

});

app.post("/todo", function(req, res){

});

app.get("/todo", function(req, res){

});

app.listen(3000);