<template>
    <div class="home">
        <div class="content">
            <v-head :adminopt="adminopt"></v-head>
            <section>
                <div class="leftMunu">
                    <v-menu :data="menuTree" >
                    </v-menu>
                </div>
                <div class="rightView">
                    <router-view></router-view>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import vHead from "@/components/home/head.vue";
    import vMenu from "@/components/home/menu.vue";
    export default {
        name:"home",
        data() {
            return {
                //用户详情
                adminopt:{
                    tx:"",
                    admin_name:localStorage.admin_name
                },
                //树形控件数据；
                menuTree:[],
            }
        },
        components:{
            vHead,
            vMenu
        },
        mounted() {
            Promise.all([this.$http.getAdminOpt({
                admin_ID:localStorage.admin_ID,
                admin_jsID:localStorage.admin_jsID
            }),this.$http.getMenu({
                admin_ID:localStorage.admin_ID,
                admin_jsID:localStorage.admin_jsID
            })]).then(res=>{
                this.adminopt = res[0].data[0];
                this.menuTree = res[1].data;
            })
            
        },
    }
</script>
<style>
    .home{
        width:100%;
        height:100%;
    }
    .content{
        min-width:1200px;
        width:90%;
        margin:0 auto;
        height:100%;
        position:relative;
    }
    .leftMunu{
        width:200px;
        position:absolute;
        top:90px;
        bottom:0px;
        left:0px;
        background:rgb(168, 176, 184);

    }
    .rightView{
        position:absolute;
        top:90px;
        bottom:0px;
        left:200px;
        right:0px;
        
    }

</style>