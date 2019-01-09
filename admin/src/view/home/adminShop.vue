<template>
    <div>
        <h2>店铺管理  <el-button type="primary" @click="isshow(true)">添加店铺</el-button></h2>
        <add-shop v-if="bol"></add-shop>
    </div>
</template>

<script>
    import addShop from "@/components/adminList/addshop"
    export default {
        name:"addshop",
        data() {
            return {
                bol:false
            }
        },
        methods:{
            isshow(val){
                this.bol = val
            }
        },
        components:{
            addShop
        }
    }
</script>

<style>

</style>
