import axios from "axios"
import qs from "qs";
export default {
    getType(obj){
        return axios({
            method:"get",
            url:"/api/getType",
            params:obj
        })
    },
    //获取店铺
    getShop(obj){
        return axios({
            method:"get",
            url:"/api/getShop",
            params:obj
        })
    },
    //通过id获取店铺
    getShopByID(id){
        console.log("run",id);
        return axios({
            method:"get",
            url:"/api/shop/"+id,
        })
    },
    //通过id获取店铺菜单
    getGoodsOpt(id){
        return axios({
            method:"get",
            url:"/api/shopGoods/"+id,
            params:{
                userID:"5c3e7feadc016a05cfb419cf"
            }
        })
    },
    //添加订单
    addOrder(obj){
        return axios({
            method:"post",
            url:"/api/order",
            data:qs.stringify(obj)
        })
    }
}