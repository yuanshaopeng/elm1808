<template>
    <div class="adminList">
        <div class="buttonGroup">
            <el-button-group>
                <el-button type="primary">管理员</el-button>
                <el-button type="primary">技术部</el-button>
                <el-button type="primary">市场部</el-button>
            </el-button-group>
            <el-button-group>
                <el-button type="primary" @click="showMark(true)">添加管理员</el-button>
            </el-button-group>
        </div>
        <div class="pad30">
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="admin_tx"
            label="头像"
            width="180">
            <template slot-scope="scope">
                <img class="adminLogo" :src="scope.row.admin_tx" alt="">
            </template>
        </el-table-column>
        <el-table-column
            prop="admin_name"
            label="管理员名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="admin_jsName"
            label="管理员角色">
        </el-table-column>
        <el-table-column
            prop="admin_time"
            label="注册日期">
            <template slot-scope="scope">
                <span>{{scope.row.admin_time | datatype}}</span>
            </template>
        </el-table-column>
         <el-table-column
            label="操作">
            <template slot-scope="scope">
                <a href=““>查看管理员日志</a>
            </template>
        </el-table-column>
        </el-table>
        </div>
        <!-- 分页插件 -->
        <div class="btm30">
            <el-pagination
                :background="true"
                :page-size="5"
                :total="count"
                :pager-count="9"
                @current-change="getData">
            </el-pagination>
        </div>
        <!-- 添加猛版 -->
        <add-admin v-show="markShow" ref="mark"></add-admin>
    </div>
</template>
<script>
    import addAdmin from "@/components/adminList/addAdmin"
    export default {
        name:"adminList",
        data() {
            return {
                //表格数据
                tableData:[],
                //信息条数
                count:0,
                //控制蒙版显示隐藏
                markShow:false
            }
        },
        methods:{
            //获取表单数据方法
            getData(value){
                console.log(value-1)
                this.$http.getadminList({
                    skip:(value-1)*5,
                    limit:5
                }).then(res=>{
                    this.count = res.data.count;
                    this.tableData = res.data.data;
                    console.log(this.tableData)
                })
            },
            //控制蒙版显示隐藏；
            showMark(bol){
                this.markShow = bol;
            }
        },
        components:{
            addAdmin
        },
        filters:{
            //时间格式过滤器
            datatype(value){
                value = value*1;
                let date = new Date(value);
                return date.getFullYear()+"-"+((date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1))+"-"+(date.getDate()>9?date.getDate():"0"+date.getDate())
            }
        },
        mounted() {
            //读取首页表格数据；
            this.$http.getadminList({
                skip:0,
                limit:5
            }).then(res=>{
                this.count = res.data.count;
                this.tableData = res.data.data;
            })
        },
    }
</script>
<style>
    .adminList{
        position: relative;
        height: 100%;
    }
    .adminLogo{
        width: 35px;
        height: 35px;
    }
    .buttonGroup{
        display: flex;
        padding: 10px 30px;
        justify-content: space-between;
    }
    .btm30{
        bottom: 30px;
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100%;
        
    }
    .pad30{
        padding:0px 30px;
    }
    .cell{
        text-align: center
    }
</style>

