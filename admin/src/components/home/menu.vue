<template>
    <div>
        <el-tree accordion :data="data" :props="{label:'menu_name',children:'children'}" @node-click="menuEnter"></el-tree>
    </div>
</template>
<script>
    export default {
        name:"vmenu",
        props:["data"],
        methods:{
            //菜单入口方法
            menuEnter(opt,node,comp){
               if(opt.menu_url){
                   if(opt.menu_url == "/logSearch"){
                        this.$router.push(opt.menu_url+'/'+localStorage.admin_ID);
                   }else{
                        this.$router.push(opt.menu_url)
                   }
                  
               }
            }
        }
    }
</script>
<style>
    .el-tree-node__content{
        padding: 15px;
    }
</style>
