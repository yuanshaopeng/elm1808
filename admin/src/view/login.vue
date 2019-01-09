<template>
    <div class="loginPage">
        <div class="loginBox flexCenter" >
            <h2>饿了么后台管理系统</h2>
            <div class="flexBox w350">
                 <el-input
                    placeholder="请输入用户名"
                    v-model="admin"
                    :clearable="true">
                </el-input>
                <el-input
                    placeholder="请输入密码"
                    v-model="pass"
                    :clearable="true">
                </el-input>
                <el-button @click="login" type="primary">登陆</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"login",
        data(){
            return {
                admin:"",
                pass:"",
            }
        },
        methods:{
            //登陆方法
            login(){
                this.$http.login({
                    admin_name:this.admin,
                    admin_pwd:this.pass
                }).then(res=>{
                    console.log(res);
                    let data = res.data;
                    localStorage.admin_name=data.admin_name;
                    localStorage.admin_ID=data.admin_ID;
                    localStorage.admin_jsID=data.admin_jsID;
                    localStorage.admin_jsName=data.admin_jsName;
                    localStorage.admin_tokenID=data.admin_tokenID;
                    this.$router.push({
                        path:"/"
                    })
                })
            }
        }
    }
</script>
<style>
    .loginPage{
        height:100%;
        width:100%;
        position:relative;
    }
    .loginBox{
        position:absolute;
        width:500px;
        height:350px;
        box-shadow:2px 2px 5px black;
        top:0;
        left:0;
        bottom:0;
        right:0;
        margin:auto;
        background:floralwhite;
    }
    .loginBox h2{
        box-shadow:0px 2px 2px black;
        background:#409EFF;
        height:80px;
        color:white;
        width:100%;
        line-height:80px;
        text-indent:30px;
    }
</style>