const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "USER_APP";

const app = express();
app.use(express.json());

const users = [];

// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         // use a simple function here
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }

function logger (req, res , next){
    console.log(req.method + "request came");
    next();
}

function auth ( req, res, next){
    const token = req.headers.token;

    if(token){
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).send({
                    message : "Unauthorized Access"
                })
            }
            else{
                req.user = decoded;
                next();
            }
        })
    }
    else{
        res.status(401).send({
            message : "Unauthorized Access"
        })
    }
}



app.post("/signup",  logger , function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if(users.find(u => u.username === username)){
        res.json({
            message : "User Already Exist"
        })
        return;
    }

    // if(username <= 5){
    //     res.json({
    //         message: "Your username is smol"
    //     })
    //     return;
    // }

    users.push({
        username : username,
        password : password
    })

    res.json({
        message: "Hi! Thank you for Singup"
    })
    console.log(users);
});

app.post("/signin",  logger ,function(req, res){

    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user){
        const token = jwt.sign({
            username: user.username
        },JWT_SECRET); //convert their username over to a token

        user.token = token;
        res.send({
         token
        })
        console.log(users);
    }
    else{
        res.status(403).send({
            message: "Invalid Username or Password"
        })
        res.header("jwt", token)
    }
    console.log(users);         
});



app.get("/me", logger , auth, (req, res) => {
    const user = req.user;

    res.send({
        username: user.username
    })
});

app.use(express.static("./public"))

app.listen(3000);// for server to listen