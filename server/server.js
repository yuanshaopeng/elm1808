const express = require("express");
const adminrouter = require("./router/admin_router.js");
const apirouter = require("./router/app_router.js");
const bodyParser = require("body-parser");
const http = express();
http.listen(3000,()=>{
    console.log("server port 3000");
})
http.use(bodyParser.urlencoded({extended:false}));

http.use("/admin",adminrouter)
http.use("/api",apirouter)





http.all("*",(req,res)=>{
    res.header("access-control-alown-origin","*")
    res.sendFile(__dirname+req.url);
})