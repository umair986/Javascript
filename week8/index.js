const express = require("express");
const mongoose = require("mongoose");
const {auth , JWT_SECRET} = require('./auth');

const app = express();
app.use(express.json());


app.post("/course/purchase", function(req,res){

});

app.get("/user/purchased", function(req,res){

});

app.get("/courses", function(req,res){

});

app.listen(3000);