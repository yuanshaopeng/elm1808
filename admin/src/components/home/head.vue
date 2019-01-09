<template>
    <div class="head">
        <header>
            <h1>饿了么后台管理系统</h1>
            <div>
                <img class="admin_tx" :src="adminopt.admin_tx" />
                <span>{{adminopt.admin_name}}</span>
                <span class="el-icon-setting"></span>
            </div>
        </header>
    </div>
</template>
<script>
export default {
    name:"vhead",
    props:["adminopt"]
}
</script>
<style>
    .head{
        height:85px;
        background:#409EFF;
        box-shadow: 0px 2px 5px black;
    }
    .head header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 0px 30px;
    }
    .head header span{
        display: inline-block;
        padding: 0px 5px;
        color: white;
    }
    .head h1{
        color: white;
    }
    .admin_tx{
        width:30px;
        height:30px;
    }
</style>