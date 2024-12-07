const express = require("express");

const app = express();

let reqCount = 0;

function reqIncreaser(){
    reqCount = reqCount +1;
    console.log(`Total no of Req = ${reqCount}`);
}

    app.get("/sum", function(req, res){
        reqIncreaser();
        const a = parseInt(req.query.a);
        const b = parseInt(req.query.b);

        res.json({
            ans : a + b,
        })

    });


app.listen(3001);