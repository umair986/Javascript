const express = require("express");
const mongoose = require("mongoose");
const {auth , JWT_SECRET} = require('./auth');

const app = express();
app.use(express.json());

function createCourses(app){

app.post("/create-course", function(req,res){

});


app.post("/delete-course", function(req,res){

});
}
