<template>
    <div>
        <h2>类别列表   <el-button type=“primary” @click="show(true)">添加类别</el-button></h2>
        <add-type v-show="bol"></add-type>
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
                prop="typeLogo"
                label="类别logo"
                width="180">
                <template slot-scope="scope">
                    <img class="typeLogo" :src="scope.row.typeLogo" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="typeName"
                label="类别名称"
                width="180">
            </el-table-column>
            <el-table-column
                label="开放时间">
                <template slot-scope="scope">
                    <span>{{scope.row.typeStart | todate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="typeEnd"
                label="下架时间">
                <template slot-scope="scope">
                    <span>{{scope.row.typeEnd | todate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text">修改</el-button>
                    <el-button type="text" @click="delType(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import addType from "@/components/adminList/addtype.vue";
export default {
    name:"typeList",
    data() {
        return {
            bol:false,
            list:[]
        }
    },
    components:{
        addType
    },
    methods: {
        show(bol){
            this.bol = bol;
        },
        delType(id){
            this.$http.delTypeById(id).then(res=>{
                this.$http.getType({isAll:1}).then(res=>{
                    console.log(res);
                    this.list = res.data;
                })
            })
        }
    }, 
    mounted() {
        this.$http.getType({isAll:1}).then(res=>{
            console.log(res);
            this.list = res.data;
        })
    }, 
    filters:{
        todate(value){
            let h = parseInt(value);
            let m = parseInt((value-h)*60);
            h = h > 9?h:"0"+h;
            m = m > 9 ? m : "0"+m;
            return h+":"+m;
        }
    }
}
</script>

<style>
    .typeLogo{
        width: 35px;
        height: 35px;
    }
</style>

