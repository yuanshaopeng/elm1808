<template>
    <div class="miste" v-scroll="bol3">
        <miste-head></miste-head>
        <miste-search></miste-search>
        <miste-type></miste-type>
        <miste-ad></miste-ad>
        <h3>--推荐商家--</h3>
        <el-button-group>
            <el-button type="text">综合排序</el-button>
            <el-button type="text">距离最近</el-button>
            <el-button type="text">品质联盟</el-button>
            <el-button type="text">筛选</el-button>
        </el-button-group>
        <div class="wrap">
            <router-link :to="'/shop/'+item._id" v-for="(item,index) in shopList" :key="index">
            <shop-item :data="item"></shop-item>
            </router-link>
            <div v-show="bol"> <span class="el-icon-loading"></span>正在加载</div>
            <div v-show="bol2">我也是有底线的</div>

        </div>
    </div>
</template>
<script>
    import misteHead from "@/components/index/miste/misteHead"
    import misteSearch from "@/components/index/miste/misteSearch"
    import misteType from "@/components/index/miste/misteType"
    import misteAd from "@/components/index/miste/misteAd"
    import shopItem from "@/components/shopItem"
    // 
    export default {
        data(){
            return {
                shopList:[],
                bol:false,
                bol2:false,
                bol3:false
            }
        },
        components:{
            misteHead,
            misteSearch,
            misteType,
            misteAd,
            shopItem
        },
        directives:{
            scroll:{
                update(el,opt,node){  
                    let context = node.context;
                    if(opt.value){
                        window.onscroll = function(){
                            //判断触底
                            if(document.documentElement.scrollHeight == document.documentElement.scrollTop+document.documentElement.clientHeight){
                                console.log("触底了")
                                //判断上次请求是否完成
                                if(context.bol){
                                    return ;
                                }
                                context.bol = true;
                                context.$http.getShop({
                                    skip:context.shopList.length,
                                    limit:5
                                }).then(res=>{
                                    if(res.data.length >0){
                                        context.shopList = context.shopList.concat(res.data);
                                        context.bol = false;
                                    }else{
                                        context.bol3 = false;
                                        context.bol = false;
                                        context.bol2 = true;
                                    }
                                })
                            }
                        }
                    }else{
                        window.onscroll = null;
                    }
                   
                }
            }
        },
        mounted(){
            this.$http.getShop({
                skip:0,
                limit:5
            }).then(res=>{
                console.log(res);
                let list = res.data.slice(0);
                this.shopList = list;
                this.bol3 = true;
            })
        },
        //组建中的路由钩子只作用于当前路由
        //进入前
        beforeRouteEnter (to, from, next) {
            // ...
            next()
        },
        //路由传值发生改变时触发
        beforeRouteUpdate(to, from, next){
            next()
        },
        //离开当前路由前触发
        beforeRouteLeave (to, from, next) {
            // ...
            console.log("离开了");
            window.onscroll = null;
            next()
        }
    }
</script>
<style>
    .miste{
        width: 100%;
    }
    .h2000{
        height: 2000px;
        width: 100%;
    }
    .miste h3{
        text-align: center;
        padding: 10px 0px;
        color: #cccccc
    }
    .wrap{
        padding-bottom: 1.52rem;
    }
    .miste .el-button-group{
        width: 100%;
        height: 0.79rem;
        border-bottom: 1px solid #cccccc;
        font-size: 15px;
        position: sticky;
        top: 1.2rem;
        background: white;
    }
    .miste .el-button{
        width: 25%;
        color:#cccccc;
    }
</style>
