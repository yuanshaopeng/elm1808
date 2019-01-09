import userList from "@/view/home/userList.vue";
import vipList from "@/view/home/vipList.vue";
import userPower from "@/view/home/userPower.vue";
import adminPower from "@/view/home/adminPower.vue";
import adminList from "@/view/home/adminList.vue";
import logSearch from "@/view/home/logSearch.vue";
import typeList from "@/view/home/typeList.vue";
import index from "@/view/home/index.vue";
import adminShop from "@/view/home/adminShop.vue"
export default {
    routes:[{
        path:"/userList",
        name:"userList",
        meta:{isLogin:true},
        component:userList
    },{
        path:"/vipList",
        name:"vipList",
        meta:{isLogin:true},
        component:vipList
    },{
        path:"/userPower",
        name:"userPower",
        meta:{isLogin:true},
        component:userPower
    },{
        path:"/adminPower",
        name:"adminPower",
        meta:{isLogin:true},
        component:adminPower
    },{
        path:"/adminList",
        name:"adminList",
        meta:{isLogin:true},
        component:adminList
    },{
        path:"/logSearch/:id",
        name:"logSearch",
        meta:{isLogin:true},
        component:logSearch
    },{
        path:"/typeList",
        name:"typeList",
        meta:{isLogin:true},
        component:typeList
    },{
        path:"/index",
        name:"index",
        meta:{isLogin:true},
        component:index
    },{
        path:"/shopList",
        name:"shopList",
        meta:{isLogin:true},
        component:adminShop
    }]
}