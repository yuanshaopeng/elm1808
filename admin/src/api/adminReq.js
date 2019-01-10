import axios from "axios";
//请求拦截
axios.interceptors.request.use((config)=>{
    if(config.url == "/upload"){
        return config;
    }
    console.log(config)
    let params = new URLSearchParams();
    if(config.method == "post"){
      if(config.data){
        
        for(var k in config.data){
          params.append(k,config.data[k])
        }
        config.data = params;
      }
      config.headers = {
        "content-type":"application/x-www-form-urlencoded"
      }
    }
    if(config.url.indexOf("/login")<0){
        config.headers.authorization = localStorage.admin_tokenID;
        if(config.method == "get"){
            //判断是否有发送数据
            if(config.params){
                config.params.admin_ID = localStorage.admin_ID;
                config.params.admin_jsID = localStorage.admin_jsID;

            }else{
                config.params = {
                    admin_ID:localStorage.admin_ID,
                    admin_jsID : localStorage.admin_jsID
                }
            }
            
          
        }else{
            params.append("admin_ID",localStorage.admin_ID);
            params.append("admin_jsID",localStorage.admin_jsID);
            config.data = params;
        }
    }
    
    return config;
  })

//响应拦截器；
axios.interceptors.response.use((data)=>{
    if(data.status == 401){
        window.location.href = "http://localhost:8080/#/login";
        throw new Error("身份验证有误")
        localStorage.clear();
    }else{
        return data
    }
    
})
export default {
    //登陆接口
    login(data){
        return axios({
            method:"post",
            url:"/admin/login",
            data
        })
    },
    //获取管理员详情
    getAdminOpt(data){
        return axios({
            method:"get",
            url:"/admin/adminOpt",
            params:data
        })
    },
    //获取菜单请求
    getMenu(data){
        return axios({
            method:"get",
            url:"/admin/adminMenu",
            params:data
        })
    },
    //获取管理员列表请求
    getadminList(obj){
        return axios({
            method:"get",
            url:"/admin/adminList",
            params:obj
        })
    },
    //获取角色列表请求
    getadminJS(obj){
        if(obj){
            return axios({
                method:"get",
                url:"/admin/jsList",
                params:obj
            })
        }else{
            return axios({
                method:"get",
                url:"/admin/jsList",
            })
        }
    },
    //验证角色是否重复
    jsNameRepeat(obj){
        return axios({
            method:"get",
            url:"/admin/jsNameRepeat",
            params:obj
        })
    },
    //修改角色名称
    updateJsName(obj){
        return axios({
            method:"post",
            url:"/admin/updateJsName",
            data:obj
        })
    },
    //获取所有菜单请求
    getMenuList(id){
        return axios({
            method:"get",
            url:"/admin/menuList",
            params:{js_ID:id}
        })
    },
    updateJsPower(obj){
        return axios({
            method:"post",
            url:"/admin/updatePower",
            data:obj
        })
    },
    //删除图片接口
    delPic(obj){
        return axios({
            method:"post",
            url:"/admin/deload",
            data:obj
        })
    },
    //验证类别重复
    isTypeNameOk(obj){
        return axios({
            method:"get",
            url:"/admin/typenamerepeat",
            params:obj
        })
    },
    //添加类别
    addType(obj){
        return axios({
            method:"post",
            url:"/admin/addType",
            data:obj
        })
    },
    //获取所有类别店铺
    getType(obj={}){
        return axios({
            method:"get",
            url:"/admin/getType",
            params:obj
        })
    },
    //通过id删除某个类别
    delTypeById(id){
        return axios({
            method:"post",
            url:"/admin/delType/"+id,
        })
    },
    //添加店铺
    addShop(obj){
        return axios({
            method:"post",
            url:"/admin/addShop",
            data:obj
        })
    },
    getShop(obj){
        return axios({
            method:"get",
            url:"/admin/shop/"+obj.skip+"/"+obj.limit,
            
        })
    },
    addGoodsType(obj){
        return axios({
            method:"post",
            url:"/admin/goodsType",
            data:obj
        })
    },
    //获取店铺商品类别
    getGoodsType(id){
        return axios({
            method:"get",
            url:"/admin/goodsType",
            params:{shopID:id}
        })
    },
    //添加商品
    addGoods(obj){
        return axios({
            method:"post",
            url:"/admin/goods",
            data:obj
        })
    }
}

