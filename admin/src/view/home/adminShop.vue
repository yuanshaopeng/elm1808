<template>
    <div>
        <h2>店铺管理  <el-button type="primary" @click="isshow(true)">添加店铺</el-button></h2>
        <add-shop v-if="bol"></add-shop>
        <add-goods v-if="bol2" :shopid="shopID"></add-goods>
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
                label="店铺logo">
                <template slot-scope="scope">
                    <img class="shopLogoImg" :src="scope.row.shopLogo" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="shopName"
                label="店铺名称"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button
                    type="text">
                    移除
                    </el-button> 
                     <el-button
                    type="text">
                    修改
                    </el-button>
                    <el-button
                    type="text" @click="addShopType(scope.row._id)">
                    添加商品类别
                    </el-button>
                     <el-button
                    type="text" @click="isshow2(true,scope.row._id)">
                    添加商品
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            :page-size="5"
            :total="count"
            @current-change="getshop">
        </el-pagination>
    </div>
</template>

<script>
    import addShop from "@/components/adminList/addshop"
    import addGoods from "@/components/adminList/addGoods"
    export default {
        name:"addshop",
        data() {
            return {
                bol:false,
                list:[],
                count:0,
                bol2:false,
                shopID:""
            }
        },
        methods:{
            isshow(val){
                this.bol = val
            },
            isshow2(val,id){
                this.bol2 = val;
                if(!id) {return };
                this.shopID = id;
            },
            getshop(val){
                this.$http.getShop({
                    skip:(val-1)*5,
                    limit:5
                }).then(res=>{
                    this.list = res.data.data;
                    this.count = res.data.count;
                })
            },
            addShopType(id){
                console.log(id)
                this.$prompt('请输入类别名称', '添加类别', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(({ value }) => {
                        console.log(value);
                        this.$http.addGoodsType({
                            shopID:id,
                            typeName:value
                        }).then(res=>{console.log(res)})
                       
                });
            }
        },
        components:{
            addShop,
            addGoods
        },
        mounted(){
            this.$http.getShop({
                skip:0,
                limit:5
            }).then(res=>{
                console.log(res);
                this.list = res.data.data;
                this.count = res.data.count;
            })
        }
    }
</script>

<style>
    .shopLogoImg{
        width: 35px;
        height: 35px;
    }
</style>
