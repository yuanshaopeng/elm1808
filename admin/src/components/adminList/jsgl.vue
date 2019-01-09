<template>
    <div class="mark" @click="isShow">
        <div class="markContent" @click.stop>
            <ul class="powerList">
                <li v-for="(item,index) in data" :key="index">
                    <h3><span>{{item.menu_name}}</span>
                    <el-switch
                    v-model="item.isPower"
                    active-color="#13ce66"
                    inactive-color="#ff4949" @change="fn" ></el-switch></h3>
                    <el-tag v-if="item.children"
                    v-for="(value,key) in item.children" :key="key"
                     :type="item.isPower?'success':'info'">{{value.menu_name}}</el-tag>
                </li>
            </ul>
            <div class="powerBtn">
                <el-button type="primary" @click="updatePower">确定</el-button>
                <el-button type="defalut" @click="isShow">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'jsGL',
    data() {
        return {
            
        }
    },
    props:["data","jsid"],
    methods:{
        //调用父组建方法传值
        isShow(){
            // console.log(this)
            this.$parent.isShow(false)
        },
        fn(){
            return false;
        },
        updatePower(){
            this.$prompt('请输入密码', '身份验证', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$http.updateJsPower({
                        admin_pwd:value,
                        js_ID:this.jsid,
                        menuList:JSON.stringify(this.data)
                    }).then(res=>{
                        if(res.data.status == 1){
                            window.location.href = "/";
                        }
                        
                    })
                
                }).catch(() => {
                    this.isShow()
                this.$message({
                    type: 'info',
                    message: '取消修改'
                });       
            });
        }
    },
    mounted() {
        // this.$http.getMenuList()
        // .then(res=>{
        //     // console.log(res);
        //     this.menuList = res.data;
        // })
    },
}
</script>

<style>
    .mark{
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
    .mark .markContent{
        padding: 30px 80px;
        width: 700px;
        height: 400px;
        /* max-height: 80%; */
        /* overflow: scroll; */
        background: white;
        /* max-width: 70%; */
    }
    .powerList{
        height: 350px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
    }
    .powerList li {
        width: 50%;
    }
    .powerBtn{
        display: flex;
        justify-content: center;
        align-items: center
    }
    .powerList h2{
        width: 90%;
        display: flex;
        justify-content: space-between
    }
</style>
