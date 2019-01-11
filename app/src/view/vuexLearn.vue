<template>
    <div>
        <router-link to="/">回首页</router-link>
        <h1>vuex学习</h1>
        <h2>state</h2>
        <button @click="change">30</button>
        <p>
            {{num}}
            <!-- {{$store}} -->
            {{get2}}
        </p>
    </div>
</template>
<script>
import {mapActions,mapGetters,mapState,mapMutations} from "vuex";
export default {
    data() {
        return {
           
        }
    },
    computed: {
        ...mapState(["num","count"]),
        ...mapGetters(["get2"])
    },
    methods:{
        ...mapMutations(["NUM"]),
        ...mapActions(["fn"]),
        change(){
            // this.$store.state.num = 30;
            this.NUM(2222);
            // this.fn()
        }
    },
    mounted(){
        console.log(this);
        // 派发mutatuons中的方法
        // this.$store.commit("NUM",{a:10,b:30})
        this.$store.commit("COUNT",3)
        // this.$store.commit("fn");
        // this.$store.commit("fn2");
        // 通过dispatch派发actions方法
        this.$store.dispatch("fn",{x:"xxx"});
    }
}
</script>