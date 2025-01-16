const express = require("express");
const mongoose = require("mongoose");
const {auth , JWT_SECRET} = require('./auth');

const app = express();
app.use(express.json());

app.post("login", function(req,res){

});

app.post("signup", function(req,res){

});

app.post("buy", function(req,res){

});

app.get("purchased", function(req,res){

});

app.get("all-courses", function(req,res){

});

app.listen(3000);