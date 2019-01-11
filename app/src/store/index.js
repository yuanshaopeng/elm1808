//vuex状态管理仓库；
//用来储存管理共享数据；
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
//导出vuex的状态仓库
export default new Vuex.Store({
    //等同于组建中的data
    state:{
        num:10,
        count:2,
        obj:{
            xx:11
        }
    },
    //同步方法  修改state得值
    /*
     *  在mutations中放置异步操作，则无法获取异步操作的结束状态；
     *  所以异步操作不能放置mutations中；
     */
    mutations:{
        NUM(state,payload){
            /*
                state：仓库中的state对象
                payload：额外数据
            */
            console.log(state,payload);
            // Vue.set(state.obj,"xx",12)
            state.num = payload;
        },
        COUNT(state,payload){
            state.count = payload;
        }
        // fn1(state,payloyd){
        //     setTimeout(()=>{
        //         console.log("北京")
        //     },2000)
        // },
        // fn2(state){
        //     setTimeout(()=>{
        //         console.log("店铺")
        //     },1000)
        // }
    },
    //存放异步操作 
    //异步操作结束后若需要对state状态修改时，需通过commit调用mutations中的方法对其修改；
    //actions不对state值进行直接修改
    actions:{
        fn(context,payload){
            //context ==> store {commit,dispatch,state,getter}
            // {commit} = {commit,dispatch,state,getter}
            //payload ==> 额外数据
            context.commit("NUM",22);
            console.log(payload);
        }
    },
    //等同于组件中的computed 计算属性
    getters:{
        computedFn(state,getters){
            console.log("run")
            return state.num+getters.get2;
        },
        get2(state){
            console.log(state)
            return state.count*2;
        }
    }

})