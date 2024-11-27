// https://petal-estimate-4e9.notion.site/Databases-and-MongoDb-1017dfd107358065a996cda5ed89682e

const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123123";
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require('./db');
mongoose.connect("mongodb+srv://mohumair1901:mohumair1901@cluster0.r4h0l.mongodb.net/todo-app-database");

const app = express();
app.use(express.json());

function auth (req, res , next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token , JWT_SECRET);

    if(decodedData){
        req.userID = decodedData.id;
        next()
    }
    else{
        res.status(403).json({
            message : "Auth denied"
        })
    }


};

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

     await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    
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
            id : user._id.toString() //to convert userID to string
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

app.post("/todo", auth , async function(req, res){
    const userID = req.userID;
    const desc = req.body.desc;
    const time = req.body.time;
    const done = req.body.done;

    await TodoModel.create({
        userID : userID,    
        desc : desc,
        time : time,
        done : done
    });

    res.json({
        userID : userID
    })

});

app.get("/todo", auth , async function(req, res){
    const userID = req.userID;
    const users = await TodoModel.find({
        userID : userID,
        // desc : desc,
        // time : time,
        // done : done
    })
    res.json({
        userID : userID
    })


});

app.listen(3000);