<template>
    <div>
            <app-header></app-header>
            <app-aside></app-aside>
            <router-view></router-view>
    </div>
</template>

<script>
    import Header from './subCom/Header.vue'
    import Aside from './subCom/Aside.vue'
    export default {
        components: {
          appHeader:Header,
          appAside:Aside  
        }
    }
</script>

<style scoped>

</style>