<template>
    <div>
        <el-table
        :data="jsList"
        style="width: 100%">
        <el-table-column
            type="index"
            label="序号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="js_name"
            label="角色名称"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-button type="text" @click="resetJs(scope.row._id)">修改</el-button>
                <el-button type="text" @click="delJs(scope.row._id)">删除</el-button>
                 <el-button type="text" @click="isShow(true,scope.row._id)">权限</el-button>
            </template>
        </el-table-column>
        </el-table>
        <js-gl v-show="show" :data="menuList" :jsid="js_ID"></js-gl>

    </div>
    
</template>
<script>
    import jsGl from "@/components/adminList/jsgl.vue"
    export default {
        name:"adminPower",
        data() {
            return {
                jsList:[],
                show:false,
                menuList:[],
                js_ID:"",
            }
        },
        components:{
            jsGl
        },
        methods:{
            //修改角色名称
            resetJs(id){
                // alert(id)
                this.$prompt('请输入角色新名称', '修改角色名称', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    let jsName = value;
                    this.$http.jsNameRepeat({
                        jsName:value
                    }).then(res=>{
                        if(res.data.status==1){
                            //点击确定时  输入管理员密码验证身份
                            this.$prompt('请输入管理员密码', '用户身份验证', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            }).then(({ value }) => {
                                //点击确定时  发起请求；
                                this.$http.updateJsName({
                                    admin_pwd:value,
                                    jsName:jsName
                                }).then(res=>{
                                    this.$http.getadminJS()
                                    .then(res=>{
                                        this.jsList = res.data;
                                        this.$message({
                                        type: 'success',
                                        message: '角色新名称为：' + jsName,
                                        duration:1500
                                    });
                                    })
                                    
                                })
                                .catch(err=>{
                                    // console.log(err.toString.indexOf("401"))
                                    if(err.toString().indexOf("401")>0){
                                        this.$router.push("/login");
                                        localStorage.clear();
                                    }else{
                                        this.$message({
                                        type: 'error',
                                        message: "修改失败",
                                        duration:1500
                                    });  
                                    }
                                     
                                })
                            }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消修改',
                                duration:1500
                            });       
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.statusText,
                                duration:1500
                            });   
                        }
                    })
                    

                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消修改',
                    duration:1500
                });       
                });
            },
            delJs(id){
                this.$confirm('此操作将永久删除该角色, 是否继续?', '删除角色', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        duration:1500

                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration:1500
                    });          
                });
            },
            //控制蒙版显示隐藏
            isShow(bol,id){
                this.show = bol;
                this.js_ID = id;
                this.$http.getMenuList(id)
                .then(res=>{
                    // console.log(res);
                    this.menuList = res.data;
                })
                
            }
        },
        mounted() {
            this.$http.getadminJS()
            .then(res=>{
                this.jsList = res.data;
            })
        },
    }
</script>