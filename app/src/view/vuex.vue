<template>
    <div v-if="num">
        {{num}}
        {{geter}}
        
        <button @click="fn1"></button>
    </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from "vuex";
export default {
    computed: {
        ...mapState(["num"]),
        ...mapGetters(["geter"])
    },
    methods:{
        ...mapMutations(['fn1']),
        ...mapActions(["fn2"])
    }
}
</script>