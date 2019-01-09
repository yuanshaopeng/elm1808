<template>
    <div class="shopItem">
        {{data.shopName}}
    </div>
</template>
<script>

export default {
    name:"shopItem",
    props:["data"]
}
</script>
<style>
    .shopItem{
        height: 3.5rem;
        border-bottom: 1px solid #ccc;
    }
</style>
