<template>
    <div v-if="shopOpt" class="shop">
        <shop-head :shop="shopOpt"></shop-head>
        <el-button-group>
            <el-button type="text" @click="chooseComp('shopMenu')">菜单</el-button>
            <el-button type="text" @click="chooseComp('shopPl')">评论</el-button>
            <el-button type="text" @click="chooseComp('shopSelf')">商家</el-button>
        </el-button-group>
          
        <component :is="choose" :style="{height:h,paddingBottom:'1.36rem'}"></component>
        <footer>
            购物车
        </footer>
    </div>

</template>

<script>
import shopHead from "@/components/shop/shopHead";
import shopMenu from "@/components/shop/shopMenu";
import shopPl from "@/components/shop/shopPl";
import shopSelf from "@/components/shop/shopSelf";
export default {
    data() {
        return {
            shopOpt:null,
            choose:'shopMenu',
            h:0,
        }
    },
    watch: {
        shopOpt(){
            this.$nextTick(()=>{
                let h = document.documentElement.clientHeight;
                let rem = document.documentElement.style.fontSize.split("px")[0]*1;
                this.h = h - 0.8*rem-1.36*rem+"px";
            })
        }
    },
    mounted(){
        this.$http.getShopByID(this.$route.params.id).then(res=>{
            this.shopOpt = res.data;
        })
        this.$nextTick(()=>{
            
        })

        
    },
    methods:{
        chooseComp(name){
            this.choose = name;
        }
    },
    components:{
        shopHead,
        shopMenu,
        shopPl,
        shopSelf
    }
}
</script>
<style>
    .shop .el-button-group{
        width: 100%;
        height: 0.8rem;
        position: sticky;
        top:0;
    }
    .h2000{
        height: 2000px;
        width:100%; 
    }
    .shop .el-button-group .el-button{
        width: 33.33%;
    }
    .shop footer{
        height: 1.36rem;
        background: cornflowerblue;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
