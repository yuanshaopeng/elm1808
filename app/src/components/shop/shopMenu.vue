<template>
    <div class="shopMenu" ref="menu">
        <!-- 菜单类别 -->
        <div class="left" ref="left">
            <ul>
                <li v-for="(item,index) in shopList" :class="currentIndex==index?'active':''" @click="scrollto(index)" :key="index">
                    <div class="typeItem">

                        <el-badge :value="typeCount[index]" v-if="typeCount[index]>0" class="item">
                            <span>{{item.typeName}}</span>
                        </el-badge>
                        <span v-else>{{item.typeName}}</span>
                    </div>
                    
                </li>
            </ul>
        </div>
        <div class="right" ref="right">
            <ul>
                <li v-for="(item,index) in shopList" :key="index" >
                    <h4 class="typeTitles" ref="titles">{{item.typeName}}</h4>
                    <ul>
                        <li v-for="(value,key) in item.goods" :key="key" class="goodsItem">
                            <img class="goodsLogo" :src="value.goodsLogo" alt="">
                            <div>
                                <h4>{{value.goodsName}}</h4>
                                <span>{{value.goodsPrice}}</span>
                                <el-row>
                                <el-button type="primary" v-if="value.count>0" @click="cutCount(value,index,key)" size="mini" circle>-</el-button>
                                <span v-if="value.count>0">{{value.count}}</span>

                                <el-button type="primary" size="mini" circle @click="addCount(value,index,key)">+</el-button>  
                                </el-row>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import {mapActions,mapState,mapGetters,mapMutations} from "vuex";
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
    computed:{
        ...mapState(["shopList"]),
        ...mapGetters(["typeCount"]), 
    },
    methods:{
        ...mapMutations(["changeCount"]),
        scrollto(index){
            this.currentIndex = index;
            let h = this.heightArr[index];
            this.rightBs.scrollTo(0,-h,200);
        },
        addCount(value,index1,index2){
            let count = value.count;
            this.changeCount({index1,index2,count:count*1+1});
            this.$http.addOrder({
                userID:"5c3e7feadc016a05cfb419cf",
                shopID:this.$route.params.id,
                goodsID:value._id,
                typeID:value.typeID,
                count:value.count
            }).then(res=>{
                // this.getShopOpt(this.$route.params.id)
                console.log(res);
            })
        },
        cutCount(value,index1,index2){
            let count = value.count;
            this.changeCount({index1,index2,count:count*1-1});
            // console.log(1111);
            this.$http.addOrder({
                userID:"5c3e7feadc016a05cfb419cf",
                shopID:this.$route.params.id,
                goodsID:value._id,
                typeID:value.typeID,
                count:value.count
            }).then(res=>{
                // this.getShopOpt(this.$route.params.id)
                console.log(res)
            })
        },
        ...mapActions(["getShopOpt"])
    },
    watch:{
        shopList(){

            // alert("run")
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
                    click:true,
                    tap:true,
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
        this.getShopOpt(this.$route.params.id)
        
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
        
            ul li .typeItem{
                display: inline-block;
                width: 1.24rem;
                padding: 17.5px 7.5px;
            }
        }
    
        .right{
            overflow: hidden;
            width: 5.76rem;
            height: 100%;
            // background: chartreuse;
            position: relative;
            .goodsItem{
                height: 2.3rem;
                display: flex;
                .goodsLogo{
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
            .typeTitles{
                height: 0.58rem;
            }
        }
    }
    
    .left .active{
        background: chartreuse;
    }
</style>
