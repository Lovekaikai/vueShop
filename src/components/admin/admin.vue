<template>
    <div class="admin">
        <el-container>
            <el-aside width="200px" ref="aside">
                <app-aside></app-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <app-header>
                    </app-header>
                </el-header>
                <el-main>
                        <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import Header from './subCom/Header.vue'
    import Aside from './subCom/Aside.vue'
    import {mapState} from 'vuex'
    export default {
        components: {
          appHeader:Header,
          appAside:Aside  
        },
        computed: {
        getUserIcons() {
            return this.$store.state.isCollapse;
        }
        },
        watch: {
        getUserIcons(val) {
            if(val){
                 this.$refs.aside.$el.style.transition="all .1s"   
                this.$refs.aside.$el.style.width="60px";
            }else{
                 this.$refs.aside.$el.style.transition="all .03s" 
                 this.$refs.aside.$el.style.width="200px";
            }
         }   
        }
    }
</script>

<style scoped lang="less">
    .admin{
        height: 100%;
        
    }
  .el-header{
    background-color: #B3C0D1;
    color: #a6a9ad;
    line-height: 60px;
  }
  .el-container{
      height: 100%;
  }
  
  .el-aside {
    overflow: hidden;
    background-color: #545c64;
    color: #a6a9ad;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #a6a9ad;
  }
</style>