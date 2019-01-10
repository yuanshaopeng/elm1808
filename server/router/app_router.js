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
//通过id获取单个店铺
router.get("/shop/:id",(req,res)=>{
    let id = req.params.id;
    db.findById("shoplist",id,(err,data)=>{
        res.send(data);
    })
})
//获取店铺商品类别及商品
router.get("/shopGoods/:id",(req,res)=>{
    //1、通过店铺id  获取店铺商品类别数据；
    //[{_id:"类别标示","typeName":"类别名称","shopID":"店铺id"}]
    //映射为一个请求商品大promise数组；
    //Promise.All处理;
    let shopID = req.params.id;
    db.find("goodsType",{query:{shopID}},(err,data)=>{
        let resultArr = data.slice(0);
        let arr = data.map((item,index)=>{
            console.log(typeof item._id);
            return new Promise((resolve,reject)=>{
                db.find("goodsList",{query:{typeID:item._id.toString()}},(err,data2)=>{
                    resolve(data2);
                })
            })
        })
        Promise.all(arr)
        .then(data3=>{
            for (let i = 0; i < resultArr.length; i++) {
                resultArr[i].goods = data3[i];
            }
            res.send(resultArr);
        })
    })

})

module.exports = router;