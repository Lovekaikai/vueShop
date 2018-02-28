<template>
    <div>
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
         },
         created(){
        
         }
    }
</script>
<style>


</style>
