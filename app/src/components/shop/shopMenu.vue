<template>
    <div class="shopMenu" ref="menu">
        <!-- 菜单类别 -->
        <div class="left" ref="left">
            <ul>
                <li v-for="(item,index) in list" :class="currentIndex==index?'active':''" @click="scrollto(index)" :key="index">
                    <span>{{item.typeName}}</span>
                </li>
            </ul>
        </div>
        <div class="right" ref="right">
            <ul>
                <li v-for="(item,index) in list" :key="index" >
                    <h4 ref="titles">{{item.typeName}}</h4>
                    <ul>
                        <li v-for="(value,key) in item.goods" :key="key" class="goodsItem">
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
            currentIndex:0,
            heightArr:[]
        }
    },
    methods:{
        scrollto(index){
            this.currentIndex = index;
            let h = this.heightArr[index];
            this.rightBs.scrollTo(0,-h,200);
        }
    },
    watch:{
        list(){
            this.$nextTick(()=>{
                let that = this;
                window.onscroll = function(){
                    // let menuHeight = that.$refs.menu.offsetTop;
                    // let btnHeight = that.$parent.$refs.btngroup.$el.offsetHeight;
                    // console.log(document.documentElement.scrollTop,menuHeight,);
                    // if(document.documentElement.scrollTop+btnHeight == menuHeight ){
                        that.rightBs.enable();
                    // }
                }
                let titles = this.$refs.titles;
                let heightArr = [];
                for(var i = 0 ; i< titles.length ; i++){
                    heightArr[i] = titles[i].offsetTop;
                }
                console.log(heightArr)
                this.heightArr = heightArr.slice(0);
                this.leftBs = new BScroll(this.$refs.left,{
                    click:true,
                    tap:true
                })
                this.rightBs = new BScroll(this.$refs.right,{
                    probeType:2,
                    bounce: {
                        top: false,
                        bottom: false,
                        left: false,
                        right: false
                    }
                })
                this.rightBs.on("scrollEnd",({y})=>{
                    //-1下滑
                        console.log(this.rightBs.directionY);
                    if(this.rightBs.directionY==-1){
                        console.log(y);
                        if(y == 0){
                            console.log(1);
                            this.rightBs.disable();
                        }
                    }
                    
                })
                this.rightBs.on("scroll",({y})=>{
                     let menuHeight = this.$refs.menu.offsetTop;
                     let btnHeight = this.$parent.$refs.btngroup.$el.offsetHeight;
                    //  console.log(document.documentElement.scrollTop,menuHeight,);
                    if(document.documentElement.scrollTop+btnHeight == menuHeight ){
                        y = Math.abs(y);
                        let index = 0;
                        for (let i = 0; i < heightArr.length; i++) {
                            if(heightArr[i]<=y){
                                index = i;
                            }else{
                                break;
                            }
                        }
                        this.currentIndex = index;
                        // this.rightBs.scrollTo(0,-1,0);
                        // console.log(y);
                        
                    }else{
                        window.scrollTo(0,menuHeight);
                        return;
                    }
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
            .goodsItem{
                height: 2.3rem;
            }
        }
    }
    .goodsLogo{
        width: 1.5rem;
    }
    .left .active{
        background: chartreuse;
    }
</style>
