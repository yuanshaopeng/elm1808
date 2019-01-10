<template>
    <div class="shopHead">
        <header v-bgimg>
            <span @click="back" class="el-icon-arrow-left"></span>
            <img :src="shop.shopLogo" alt="">
        </header>
        <section>
            <h2>{{shop.shopName}}</h2>
           <el-rate
            v-model="shop.shopRate"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
            </el-rate>
            <div class="h52">
                优惠
            </div>
        </section>
    </div>
</template>
<script>
export default {
    props:["shop"],
    created(){
        this.$set(this.shop,"shopRate",this.shop.shopRate*1)
    },
    methods:{
        back(){
            //路由回退
            this.$router.back(-1);
            //路由跳转
            // this.$router.push({
            //     path:"/xx",
            //     params:{sx}
            //     query:"xxx"
            // })
        }
    },
    directives:{
        bgimg:{
            inserted(el,opt,node){
                el.style.background= "url("+ node.context.shop.shopLogo +")";
                el.style.backgroundSize = "100% 100%";
            }
        }
    }
}
</script>
<style>
    .shopHead{
        
       
    }
    .h52{
        height: 0.52rem;
    }
    .shopHead header{
        position: relative;
        width: 100%;
        height: 2rem;
    }
    .shopHead header img{
        width: 1.5rem;
        height: 1.5rem;
        bottom: -0.4rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .shopHead section{
        padding-top:0.6rem; 
        text-align: center;
    }
</style>
