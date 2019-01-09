const express = require("express");
const router = express.Router();
const DB = require("../module/db.js");
const db = new DB("ele");
const jwt = require("../module/jwt.js");
const upload = require("../module/upload.js");
const fs = require("fs");

//获取所有类别接口
router.get("/getType",(req,res)=>{
    if(req.query.isAll == 1){
        db.find("typeList",{},(err,data)=>{
            res.send(data);
        })
    }else{
        db.find("typeList",{},(err,data)=>{
            let date = new Date();
            date = date.getHours() + date.getMinutes()/60
            console.log(date);
            data = data.filter((item,index)=>{
                if(date>=item.typeStart*1&&date<=item.typeEnd*1){
                    return true;
                }else{
                    return false;
                }
            })
            res.send(data);
        })
    }
})
//获取店铺
router.get("/getShop",(req,res)=>{
    let skip = req.query.skip*1;
    let limit = req.query.limit*1;
    db.find("shoplist",{query:{},skip,limit},(err,data)=>{
        res.send(data);
    })
})
module.exports = router;