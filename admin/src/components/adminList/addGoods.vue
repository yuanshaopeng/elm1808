<template>
    <div class="mark" @click="show">
        <div class="markContent" @click.stop>
            <el-input type="text" placeholder="请输入商品名称" v-model="goods.goodsName"></el-input>
            <el-input type="text" placeholder="请输入商品单价" v-model="goods.goodsPrice"></el-input>
            <el-input type="text" placeholder="请输入商品评分" v-model="goods.goodsRate"></el-input>
            {{goods.typeID}}
            <el-select v-model="goods.typeID" placeholder="请选择商品分类">
                <el-option
                v-for="(item,index) in typeList"
                :key="index"
                :label="item.typeName"
                :value="item._id">
                </el-option>
            </el-select>
            <el-upload
                    class="upload-demo"
                    action="http://localhost:8080/admin/upload"
                    :file-list="list"
                    :on-success="handelSuccess"
                    :headers="{authorization:tokenID}"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传店铺图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-button @click="addGoods">提交</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            goods:{},
            typeList:[],
            list:[],
            tokenID:localStorage.admin_tokenID
        }
    },
    props:["shopid"],
    methods:{
        show(){
            this.$parent.isshow2(false)
        },
        handelSuccess(response){
            console.log(response)
            this.goods.goodsLogo = response.files.url;
        },
        addGoods(){
            this.goods.shopID = this.shopid;
            this.$http.addGoods(this.goods).then(res=>{
                console.log(res);
            })
        }
    },
    mounted() {
        this.$http.getGoodsType(this.shopid).then(res=>{
            console.log(res);
            this.typeList = res.data;
        })
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
</style>