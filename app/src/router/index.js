import Vue from 'vue'
import Router from 'vue-router'
import index from "@/view/index.vue";
import miste from "@/view/index/miste";
import discover from "@/view/index/discover";
import order from "@/view/index/order";
import profiles from "@/view/index/profiles";
import tologin from "@/view/index/tologin";
import shop from "@/view/shop";
import vuexLearn from "@/view/vuexLearn";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect:"/miste",
      children:[{
        path:"/miste",
        name:"miste",
        meta:{
          isLogin:false
        },
        component:miste
      },{
        path:"/discover",
        name:"discover",
        meta:{
          isLogin:false
        },
        component:discover
      },{
        path:"/order",
        name:"order",
        meta:{
          isLogin:true
        },
        component:order
      },{
        path:"/profiles",
        name:"profiles",
        meta:{
          isLogin:false
        },
        component:profiles
      },{
        path:"/tologin",
        name:"tologin",
        meta:{
          isLogin:false
        },
        component:tologin
      }]
    },
    {
      path:"/shop/:id",
      name:'shop',
      meta:{
        isLogin:false
      },
      component:shop
    },{
      path:"/vuex",
      name:"vuex",
      meta:{
        isLogin:false
      },
      component:vuexLearn
    }
  ]
})
