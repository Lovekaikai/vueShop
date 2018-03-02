<template>
    <div class="header" >
        <i class="el-icon-menu admin_elft" @click="increment"></i>
        <el-dropdown split-button type="primary"  @command="handleCommand">
           <span class="el-dropdown-link ">
                你好 {{username}}
        </span>
            <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="changUsername">修改用户</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                    username:(()=>{
                            if(!localStorage.getItem("username")&&localStorage.getItem("username")===""){
                                      this.$router.push({"name":"login"})
                            }else{
                                return localStorage.getItem("username")
                            }
                    })()
                }
            },
          methods:{
            increment(){
                this.$store.commit("increment")
            },
            logout(){
                this.$http.get(this.$api.logout).then((res)=>{
                    if(res.data.status==0){
                        this.$router.push({'name':"login"})
                    }
                })
            },
            handleCommand(val){
                if(val==="logout"){
                    this.logout()
                } 
            }
        }
    }
</script>

<style scoped lang="less">
    .header{
        padding-right: 50px;
       
        .el-icon-menu{
            text-align: left;
            cursor: pointer
        }
        .el-dropdown-link {
            cursor: pointer;
            color: white;
           
        }
        .el-dropdown{
            float: right;
        }
    }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>