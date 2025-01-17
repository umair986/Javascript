const express = require("express");
const mongoose = require("mongoose");
const {auth , JWT_SECRET} = require('./auth');

const app = express();
app.use(express.json());

function adminRouter(app){
app.post("/admin/signup" , function(req,res){

});

app.post("/admin/signin" , function(req,res){

}); 
}