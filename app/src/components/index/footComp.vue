<template>
        <footer>
            <router-link to="/miste">
            <dl>
                <dt></dt>
                <dd>首页</dd>
            </dl>
            </router-link>
            <router-link to="/discover">
            <dl>
                <dt></dt>
                <dd>发现</dd>
            </dl>
            </router-link>
            <router-link to="/order">
            <dl>
                <dt></dt>
                <dd>订单</dd>
            </dl>
            </router-link>
            <router-link to="/profiles">
            <dl>
                <dt></dt>
                <dd>我的</dd>
            </dl>
            </router-link>
        </footer>
</template>
<style>
    footer{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        height: 1.5rem;
        position: fixed;
        width: 100%;
        bottom: 0;
        border-top:1px solid #cccccc; 
        z-index: 22;
        background: white
    }
    footer a{
        display: inline-block;
        flex: 1;
        text-align: center;
    }
</style>
