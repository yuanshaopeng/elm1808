<template>
    <div class="shopMenu">
        <!-- 菜单类别 -->
        <div class="left" ref="left">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <span>{{item.typeName}}</span>
                </li>
            </ul>
        </div>
        <div class="right" ref="right">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <h4 ref="titles">{{item.typeName}}</h4>
                    <ul>
                        <li v-for="(value,key) in item.goods" :key="key">
                            <img class="goodsLogo" :src="value.goodsLogo" alt="">
                            <h4>{{value.goodsName}}</h4>
                            <span>{{value.goodsPrice}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
    data() {
        return {
            list:[],
            leftBs:null,
            rightBs:null,
        }
    },
    watch:{
        list(){
            this.$nextTick(()=>{
                let titles = this.$refs.titles;
                let heightArr = [];
                for(var i = 0 ; i< titles.length ; i++){
                    heightArr[i] = titles[i].offsetTop;
                }
                console.log(heightArr)
                this.leftBs = new BScroll(this.$refs.left,)
                this.rightBs = new BScroll(this.$refs.right,{
                    probeType:2,
                    bounce: {
                        top: false,
                        bottom: false,
                        left: false,
                        right: false
                    }
                })
                this.rightBs.on("scroll",({y})=>{
                    console.log("run")
                    console.log(y)
                })
            })
        }
    },
    mounted(){
        console.log(this.$route.params.id);
        this.$http.getGoodsOpt(this.$route.params.id).then(res=>{
            console.log(res);
            this.list = res.data;
        })
    }
}
</script>
<style lang="scss">
    .shopMenu{
        height: 100%;
        display: flex;
        justify-content: space-between;
        /* 视口高度 */
        // height: (100vm-0.8rem-1.36rem);
        .left{
            background: red;
            width: 1.54rem;
            height: 100%;
            overflow: hidden;
            ul li span{
                display: inline-block;
                width: 1.24rem;
                padding: 17.5px 7.5px;
            }
        }
        .right{
            overflow: hidden;
            width: 5.76rem;
            height: 100%;
            background: chartreuse;
            position: relative;
        }
    }
    .goodsLogo{
        width: 1.5rem;
    }
</style>
