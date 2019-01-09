import axios from "axios"
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
    }
}