const express = require("express");
const router = express.Router();
const DB = require("../module/db.js");
const db = new DB("ele");
const jwt = require("../module/jwt.js");
const upload = require("../module/upload.js");
const fs = require("fs");
//admin后台管理系统路由

//后台拦截   拦截用户身份
router.use((req,res,next)=>{
    if(req.url=="/login"){
        next()
    }else if(req.url=="/upload"){
        next()
    }else{
        let token = req.headers.authorization;
        let data = null;
        if(req.method.toLowerCase() == "get"){
            data = req.query;
        }else{
            data = req.body;
        }
        jwt.setToken(token,(err,data2)=>{
            if(err){
                res.status(401);
                res.send();
            }else{
                if(data.admin_ID == data2.admin_ID && data.admin_jsID == data2.admin_jsID ){
                    next()
                }else{
                    res.status(401);
                    res.send();
                }
                
            }
        })
    }
})


//登陆接口
router.post("/login",(req,res)=>{
    let admin_name = req.body.admin_name;
    let admin_pwd = req.body.admin_pwd;
    db.find("adminList",{query:{admin_name,admin_pwd}},(err,data)=>{
        if(data.length>=1){
            //用户存在
            let user = data[0];
            db.insertOne("adminLog",{
                admin_ID:user._id,
                doTime:new Date().getTime(),
                doSth:"登陆"
            },(err,result)=>{
                if(err) throw err;
                res.send({
                    "admin_ID":user._id,
                    "admin_name": user.admin_name,
                    "admin_jsID": user.admin_jsID,
                    "admin_jsName": user.admin_jsName,
                    admin_tokenID:jwt.getToken({
                        admin_ID:user._id,
                        admin_jsID:user.admin_jsID,
                    },"7d")
                })
            })
        }else{
            //用户不存在
            res.status(400);
            res.send();
        }
    })
})

//获取用户详情
router.get("/adminOpt",(req,res)=>{
    let admin_ID = req.query.admin_ID;
    db.find("adminOpt",{query:{admin_ID}},(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})

//获取管理目录
router.get("/adminMenu",(req,res)=>{
    let menu_jsID = req.query.admin_jsID;
    db.find("admin_menu",{query:{menu_jsID}},(err,data)=>{
        res.send(data);
    })
})

//获取管理员列表
router.get("/adminList",(req,res)=>{
    let skip = req.query.skip*1;
    let limit = req.query.limit*1;
    console.log(req.query);
    db.count("adminOpt",{},(err,count)=>{
            let num = count;
            db.find("adminOpt",{skip,limit},(err,data)=>{
                if(err) throw err;
                res.send({
                    count:num,
                    data
                });
            })
    })
})

//读取角色列表接口
router.get("/jsList",(req,res)=>{
    if(req.query.jsName){
        db.find("admin_jsList",{query:{js_name:req.query.jsName}},(err,data)=>{
            res.send(data);
        })
    }else{
        db.find("admin_jsList",{},(err,data)=>{
            res.send(data);
        })
    }
})
//验证新角色名称是否重复
router.get("/jsNameRepeat",(req,res)=>{
    let jsName = req.query.jsName;
    db.count("admin_jsList",{js_name:jsName},(err,count)=>{
        if(err) throw err;
        if(count>0){
            res.send({
                status:"-1",
                statusText:"角色已存在，请勿重复添加"
            })
        }else{
            res.send({
                status:"1",
                statusText:"ok"
            })
        }
    })
})
//修改角色名称接口
router.post("/updateJsName",(req,res)=>{
    let admin_ID = req.body.admin_ID;
    let admin_pwd = req.body.admin_pwd;
    let jsName = req.body.jsName;
    /*
    * 通过用户提交的用户id，及密码 验证管理员身份合法性  
        合法  则继续   不合法返回401；
      合法   读取用户权限id   判断用户是否具备该权限   
      具备   继续     不具备返回403；  ==》回退首页
      具备   修改    记录至用户日志集合
      返回操作成功
    */
    //查询用户集合该用户是否合法
    db.findById("adminList",admin_ID,(err,data)=>{
        if(err) throw err;
        //匹配密码是否正确
        
        if(data.admin_pwd == admin_pwd){
            console.log(data.admin_pwd,admin_pwd)
            let admin_jsID = data.admin_jsID;
            db.find("admin_menu",{query:{menu_jsID:admin_jsID}},(err,data2)=>{
                let obj = data2.find((item,index)=>{
                    if(item.menu_name == "权限管理"){
                        return true;
                    }else{
                        return false;
                    }
                })
                //判断是否具备权限
                if(obj){
                    console.log(2222)
                    db.updateById("admin_jsList",admin_jsID,{js_name:jsName},(err,data3)=>{
                        db.updateMany("adminOpt",{admin_jsID:admin_jsID},{admin_jsName:jsName},(err,data5)=>{
                            db.insertOne("adminLog",{
                                "admin_ID": admin_ID,
                                "doTime": new Date().getTime(),
                                "doSth": "修改了"+jsName+"名称"
                            },(err,data4)=>{
                                res.send("ok")
                            })
                        })
                    })
                }else{
                    res.status(403);
                    res.send();
                }
            })
        }else{
            res.status(401);
            res.send();
        }
    })

})

//删除角色接口




//获取所有菜单接口
router.get("/menuList",(req,res)=>{
    let js_ID = req.query.js_ID;
    /*
        通过角色id读取角色权限
        读取菜单集合，获取所有菜单
        将所有菜单数据与开放菜单数据整合
    */
//    db.findById("adminList",admin_ID,(err,data)=>{
//        let user = data;
       db.find("menuList",{query:{}},(err,data2)=>{
           let menuList = data2;
           db.find("admin_menu",{query:{menu_jsID:js_ID}},(err,data3)=>{
               let jsMenuList = data3;
               for(var i = 0 ; i < menuList.length ; i++){
                   let menuName = menuList[i].menu_name;
                   let bol = jsMenuList.some((item,index)=>{
                       if(item.menu_name == menuName){
                           return true;
                       }else{
                           return false;
                       }
                   })
                   menuList[i].isPower = bol;
               }
               res.send(menuList);
           })
       })
//    })
})

//修改角色权限接口
router.post("/updatePower",(req,res)=>{
    let admin_ID = req.body.admin_ID;
    let admin_pwd = req.body.admin_pwd;
    let js_ID = req.body.js_ID;
    let js_name = req.body.js_name;
    let menuList = JSON.parse(req.body.menuList);
    console.log(menuList instanceof Array);
    /*
    * 通过用户提交的用户id，及密码 验证管理员身份合法性  
      将角色权限全部移除
      然后追加对应权限
      返回操作成功
    */
    //查询用户集合该用户是否合法
    db.findById("adminList",admin_ID,(err,data)=>{
        if(err) throw err;
        //匹配密码是否正确
        
        if(data.admin_pwd == admin_pwd){
            //移除角色所有权限
            // console.log(menuList);
            // res.send(menuList);
            db.deleteMany("admin_menu",{menu_jsID:js_ID},(err,data2)=>{
                
                let powerList = menuList.filter((item,index)=>{
                    if(item.isPower){
                        // return
                        delete item.isPower;
                        item.menu_jsID = js_ID;
                        let menuId = item._id;
                        delete item._id;
                        item.menu_ID = menuId;
                        return true;
                    }else{
                        return false;
                    }
                })
                db.insertMany("admin_menu",powerList,(err,data3)=>{
                    db.insertOne("adminLog",{
                        "admin_ID": admin_ID,
                        "doTime": new Date().getTime(),
                        "doSth": "修改了"+js_name+"的权限"
                    },(err,data5)=>{
                        res.send({
                            status:1,
                            url:"/"
                        })
                    })
                    
                })
                
            })
        }else{
            res.status(401);
            res.send();
        }
    })
})

//图片上传接口
router.post("/upload",(req,res)=>{
    console.log(req.headers);
    let tokenID = req.headers.authorization;
    jwt.setToken(tokenID,(err,data)=>{
        if(err){
            res.status(401);
            res.send()
        }else{
            upload._upload(req,(err,data)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send(data)
                }
               
            })
        }
    })
   
})

//删除图片接口
router.post("/deload",(req,res)=>{
    let url = req.body.url;
    fs.unlink("./upload/"+url,(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})

//验证类别是否存在
router.get("/typenamerepeat",(req,res)=>{
    db.count("typeList",{typeName:req.query.typeName},(err,count)=>{
        if(count>0){
            res.send({
                status:"-1",
                code:"已存在"
            })
        }else{
            res.send({
                status:"1",
                code:"通过"
            })
        }
    })
})

//添加类别接口
router.post("/addType",(req,res)=>{
    let data = req.body;
    if("typeName" in data && "typeLogo" in data && "typeStart" in data && "typeEnd" in data){
        db.insertOne("typeList",{
            typeName:data.typeName,
            typeLogo:data.typeLogo,
            typeStart:data.typeStart,
            typeEnd:data.typeEnd
        },(err,data2)=>{
            if(err) throw err;
            res.send({
                status:'1',
                code:data2
            })
        })
    }else{
        res.status(400)
        res.send();
    }
})

//获取类别
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

//删除某个菜单
router.post("/delType/:id",(req,res)=>{
    let id = req.params.id;
    db.deleteById("typeList",id,(err,data)=>{
        if(err) throw err;
        res.send("ok")
    })
})

//添加店铺
router.post("/addShop",(req,res)=>{
    let data = req.body;
    db.insertOne("shoplist",{
        shopName:data.shopName,
        shopLogo:data.shopLogo,
        shopAddress:data.shopAddress,
        shopTel:data.shopTel,
        shopTypeID:data.shopTypeID,
        shopOpt:data.shopOpt,
        shopRate:data.shopRate
    },(err,data2)=>{
        if(err) throw err;
        res.send(data2);
    })
})

//获取店铺
router.get("/shop/:skip/:limit",(req,res)=>{
    let skip = req.params.skip*1;
    let limit = req.params.limit*1;
    db.count("shoplist",{},(err,count)=>{
        db.find("shoplist",{query:{},skip,limit},(err,data)=>{
            if(err) throw err;
            res.send({
                count,data
            });
        })
    })
    
})

//添加类别
router.post("/goodsType",(req,res)=>{
    let shopID = req.body.shopID;
    let typeName = req.body.typeName;
    db.insertOne("goodsType",{shopID,typeName},(err,data)=>{
        if (err) throw err;
        res.send(data);
    })
})
//获取类别
router.get("/goodsType",(req,res)=>{
    db.find("goodsType",{query:{shopID:req.query.shopID}},(err,data)=>{
        if (err) throw err;
        res.send(data);
    })
})

//提交商品
router.post("/goods",(req,res)=>{
    let data = req.body;
    delete data["admin_ID"];
    delete data["admin_jsID"];
    console.log(data);
    db.insertOne("goodsList",data,(err,data2)=>{
        res.send(data2);
    })
})
module.exports = router;