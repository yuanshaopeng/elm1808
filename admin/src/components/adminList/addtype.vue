<template>
    <div class="mark" @click="show">
        <div class="markContent" @click.stop>
            <el-input v-model="typeName" @change="isok" placeholder="请输入类别名称"></el-input>
            <!-- 文件上传框 -->
            <!-- 
                action:图片上传的服务器接口
             -->
            <el-upload
                class="upload-demo"

                action="http://localhost:8080/admin/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :headers="{authorization:tokenID}"
                :before-remove="handleBeforeRemove"
                :on-success="handleSuccess"
                name="file"
                :limit="1"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            
            <!-- 时间选择器 -->
            <keep-alive> <el-time-picker
                is-range
                v-model="time"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
            </el-time-picker>
            </keep-alive> 
            <el-button type="primary" @click="addType">提交</el-button>
        </div> 
    </div>
</template>

<script>
export default {
    name:"addType",
    data() {
        return {
            //类别名称
            typeName:"",
            //上传文件列表
            fileList:[],
            //timerPicker
            time:"",
            //logo图片的服务器地址
            logo:"",
            tokenID:localStorage.admin_tokenID
        }
    },
    methods:{
        show(){
            this.$parent.show(false)
        },
        handlePreview(file){console.log(file)},
        handleRemove(){},
        handleBeforeRemove(file,files){
            this.$http.delPic({
                url:file.name
            }).then(res=>{
                console.log(res);
            })
        },
        handleSuccess(response,file,files){
            this.logo = response.files.url;
        },
        addType(){
            let start = this.time[0];
            let end = this.time[1];
            start = start.getHours()+start.getMinutes()/60;
            end = end.getHours()+end.getMinutes()/60;
            this.$http.addType({
                typeName:this.typeName,
                typeLogo:this.logo,
                typeStart:start,
                typeEnd:end
            }).then(res=>{
                this.$message({
                    message: '添加成功',
                    duration:1500,
                    type:"success"
                })
            })
        },
        isok(){
            this.$http.isTypeNameOk({
                typeName:this.typeName
            }).then(res=>{
                console.log(res);
            })
        } 
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