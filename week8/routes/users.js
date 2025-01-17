const express = require("express");
const mongoose = require("mongoose");
const {auth , JWT_SECRET} = require('./auth');

const app = express();
app.use(express.json());

function userRouter(app){

    app.post("/users/signin", function(req,res){

    });
    
    app.post("/users/signup", function(req,res){
    
    });
    
}