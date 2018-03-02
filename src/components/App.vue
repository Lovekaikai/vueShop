<template>
    <div class="app">  
        <router-view></router-view>
    </div>
</template>
<script>

    export default{
      data(){
            return {
                   user: {
                    uname: "admin",
                    upwd: "123456"
                }
            }
         }
    }
</script>
<style>
    .app{
        height: 100%;

    }

</style>
