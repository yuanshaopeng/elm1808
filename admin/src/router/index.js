import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import login from "@/view/login"
import homeChildren from "@/router/homeChildren/routercfg";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/index",
      meta:{
        isLogin:true
      },
      name: 'home',
      component: home,
      //设置菜单二级路由；
      children:homeChildren.routes
    },{
      path:"/login",
      meta:{
        isLogin:false
      },
      name:"login",
      component:login
    }
  ]
})
