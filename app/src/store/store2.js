import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
//Vuex刷新页面数据丢失  为初始值
export default new Vuex.Store({
    state:{
        num:1
    },
    mutations:{},
    actions:{},
    getters:{}
})