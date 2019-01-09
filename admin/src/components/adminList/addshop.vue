<template>
    <div class="mark" @click="show">
        <div class="markContent" @click.stop>
            <el-input v-model="shop.shopName" placeholder="请输入店铺名称"></el-input>
            <el-input v-model="shop.shopAddress" placeholder="请输入店铺地址"></el-input>
            <el-upload
                class="upload-demo"
                action="http://localhost:8080/admin/upload"
                :file-list="shop.list"
                :on-success="handelSuccess"
                :headers="{authorization:tokenID}"
                list-type="picture">
                <el-button size="small" type="primary">点击上传店铺图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-select v-model="shop.shopTypeID" placeholder="请选择店铺类别">
                <el-option
                v-for="(item,key) in typeList"
                :key="key"
                :label="item.typeName"
                :value="item._id">
                </el-option>
            </el-select>
            <el-input v-model="shop.shopOpt" placeholder="请输入店铺介绍"></el-input>
            <el-input v-model="shop.shopTel" placeholder="请输入店铺电话"></el-input>
            <el-button type=“primary“ @click="addShop" >提交</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:"addShop",
    data(){
        return {
            shop:{},
            typeList:[],
            tokenID:localStorage.admin_tokenID
        }
    },
    methods:{
        handelSuccess(res){
            console.log(res);
            this.shop.shopLogo = res.files.url;
        },
        addShop(){
            this.shop.shopRate = 4.5;
            this.$http.addShop(this.shop).then(res=>{
                console.log(res);
            })
        },
        show(){
            this.$parent.isshow(false)
        }
    },
    mounted(){
        this.$http.getType({
            isAll:"1"
        }).then(res=>{
            this.typeList = res.data;
        })
    }
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
</style>
