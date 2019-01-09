<template>
    <div class="swiper-container" ref="typeSwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in list" :key="index">
                <dl class="typeItem" v-for="(value,key) in item" :key="key">
                    <dt><img :src="value.typeLogo" alt=""></dt>
                    <dd>{{value.typeName}}</dd>
                </dl>
            </div>
         </div>
         <div class="swiper-pagination"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[]
            }
        },
        watch: {
            list(nval){
                console.log(nval)
                this.$nextTick(()=>{
                    new this.$swiper(this.$refs.typeSwiper,{
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    })
                })  
            }
        },
        mounted() {
            this.$http.getType({
                isAll:"0"
            }).then(res=>{
                console.log(res);
                //是否有必要创建swiper；
                if(res.data.length >10){
                    let page = Math.ceil(res.data.length/10);//向上取整得到swiper页数
                    for(var i = 0 ; i < page ; i++){
                        // this.list[i] = res.data.slice(i*10,10);
                        this.$set(this.list,i,res.data.splice(0,10))
                    }
                    
                }else{
                    this.$set(this.list,0,res.data)
                }
            })
            
        },
    }
</script>
<style>
    .swiper-container{
        height: 3.54rem;
    }
    .swiper-slide{
        display: flex;
        width: 7.5rem;
        flex-wrap: wrap;
    }
    .typeItem{
        width: 20%;
        text-align: center;
        font-size: 12px;
    }
    .typeItem img{
        width: 0.9rem;
        height: 0.9rem;
    }
    .swiper-pagination-bullet{
        width: 20px;
        height: 2px;
        border-radius:0; 
    }
</style>
