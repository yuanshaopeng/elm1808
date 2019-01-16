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
    let userID = req.query.userID;
    if(!userID){
        res.status(401);
        res.send();
        return ;
    }
    let shopID = req.params.id;
    db.find("goodsType",{query:{shopID}},(err,data)=>{
        let resultArr = data.slice(0);
        let arr = data.map((item,index)=>{
            // console.log(typeof item._id);
            return new Promise((resolve,reject)=>{
                db.find("goodsList",{query:{typeID:item._id.toString()}},(err,data2)=>{
                    resolve(data2);
                })
            })
        })
        Promise.all(arr)
        .then(data3=>{

            for (let i = 0; i < resultArr.length; i++) {
                for(let k = 0 ; k < data3[i].length ; k++){
                    data3[i][k].count = 0;
                }
                resultArr[i].goods = data3[i];
            }
            db.find("orderList",{query:{userID,shopID}},(err,data4)=>{
                if(data4.length >0){
                    for (let i = 0; i < data4.length; i++) {
                        let goodsID = data4[i].goodsID;
                        for (let k = 0; k < resultArr.length; k++) {
                            let goods = resultArr[k].goods;
                            for (let j = 0; j < goods.length; j++) {
                                // goods[j].count = 0;
                                if(goods[j]._id.toString() == goodsID){
                                    goods[j].count = data4[i].count;
                                }
                                
                            }
                            
                        }
                    }
                }else{
                    for (let k = 0; k < resultArr.length; k++) {
                        let goods = resultArr[k].goods;
                        for (let j = 0; j < goods.length; j++) {
                            goods[j].count = 0;
                        }
                    }
                }
                res.send(resultArr);
            })
            
        })
    })

})
//添加至订单集合接口
router.post("/order",(req,res)=>{
    let data = req.body;
    let userID = data.userID;
    let shopID = data.shopID;
    let goodsID = data.goodsID;
    console.log(data)
    if(!data.userID){
        res.status(401);
        res.send();
        return;
    }
    if(data.count*1 <= 0 ){
        db.deleteOne("orderList",{userID,shopID,goodsID},(err,data2)=>{
            getSum(userID,shopID,(sum)=>{
                db.findById("shoplist",shopID,(err,shopMsg)=>{
                    let qsf = shopMsg.shopQsf;
                    if(qsf>sum){
                        res.send({
                            code:"还差"+(qsf-sum)+"起送",
                            active:false,
                            sum
                        })
                    }else{
                        res.send({
                            code:"去结算",
                            active:true,
                            sum
                        })
                    }
                })
            })
        })
    }else{
        db.count("orderList",{userID,shopID,goodsID},(err,count)=>{
            if(count>0){
                db.updateOne("orderList",{userID,shopID,goodsID},{count:data.count},(err,data3)=>{
                    getSum(userID,shopID,(sum)=>{
                        db.findById("shoplist",shopID,(err,shopMsg)=>{
                            let qsf = shopMsg.shopQsf;
                            if(qsf>sum){
                                res.send({
                                    code:"还差"+(qsf-sum)+"起送",
                                    active:false,
                                    sum
                                })
                            }else{
                                res.send({
                                    code:"去结算",
                                    active:true,
                                    sum
                                })
                            }
                        })
                    })
                })
            }else{
                db.insertOne("orderList",data,(err,data3)=>{
                    // res.send(data3)    
                    getSum(userID,shopID,(sum)=>{
                        db.findById("shoplist",shopID,(err,shopMsg)=>{
                            let qsf = shopMsg.shopQsf;
                            if(qsf>sum){
                                res.send({
                                    code:"还差"+(qsf-sum)+"起送",
                                    active:false,
                                    sum
                                })
                            }else{
                                res.send({
                                    code:"去结算",
                                    active:true,
                                    sum
                                })
                            }
                        })
                    })
                })
            }
        })
    }
    
})

function getSum(userID,shopID,callback){
    let sum = 0;
    db.find("orderList",{userID,shopID},(err,data)=>{
        let msg  = data.map((item)=>{
            return new Promise((resolve,reject)=>{
                db.findById("goodsList",item.goodsID,(err,data2)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(data2);
                    }
                })
            })
        })
        Promise.all(msg).then(result=>{
            for(var i = 0 ; i < result.length ; i++){
                sum += result[i].goodsPrice*data[i].count;
            }
            callback(sum);
        })
    })
}
module.exports = router;