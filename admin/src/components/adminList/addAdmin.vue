<template>
    <div class="addMark" @click="fn">
        <div class="markContent" @click.stop>
            <el-input
            placeholder="请输入管理员名称"
            v-model="admin_name"
            clearable>
            </el-input>
            <el-input
            placeholder="请输入管理员密码"
            v-model="admin_pwd"
            clearable>
            </el-input>
            <el-input
            placeholder="请选择管理员角色"
            v-model="admin_jsName"
            clearable>
            </el-input>
            <el-button type="primary">添加</el-button>
            <el-button>取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:"addMark",
    data() {
        return {
            admin_name:"",
            admin_pwd:"",
            admin_jsName:"",
            admin_jsID:"",
        }
    },  
    methods:{
        //控制蒙版显示隐藏
        fn(){
            this.$parent.showMark(false);
        }
    }
}
</script>
<style>
    .addMark{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }
    .addMark .markContent{
        padding: 30px 80px;
        max-height: 80%;
        /* overflow: scroll; */
        background: white;
        max-width: 70%;
    }
    .addMark .el-input{
        padding: 15px 30px;
    }
</style>
