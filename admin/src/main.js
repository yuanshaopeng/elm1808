// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
//引入elementUI  及样式表
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入全局样式
import "./assets/css/index.css";

//引入请求模块
import req from "./api/adminReq.js";
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = req;
//路由拦截页面
router.beforeEach((to,from,next)=>{
  console.log(to)
  if(to.meta.isLogin){
    if(localStorage.admin_ID&&localStorage.admin_tokenID){
      next()
    }else{
      next("/login")
    }
  }else{
    next()
  }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
