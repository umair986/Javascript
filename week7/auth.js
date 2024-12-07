const jwt = require("jsonwebtoken");
const JWT_SECRET = "123123";


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

module.exports = {
    auth,
    JWT_SECRET
}