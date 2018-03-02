<template>
    <div class="aside">
        <img class="aside_logo" src="../../assets/images/logo.png" alt="" srcset="">  
        <el-menu default-active="2" class="aside_menu"
            background-color="#545c64" 	 text-color="#fff" active-text-color="#ffd04b" :unique-opened="isuniqueopened" :collapse="isCollapse">
         
            <!-- subnav: key属性需要一个唯一值用于for循环渲染时性能优化, index属性同样需要一个唯一值用于展开导航列表 -->
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item v-for="subItem in item.submenu" :key="subItem.text" :index="subItem.text">
             
                    <router-link :to="subItem.path">
                        <i class="el-icon-document"></i>
                        <span class="title-text">{{ subItem.text }}</span>
                    </router-link>
                </el-menu-item>


            </el-submenu>
        </el-menu>
     
    </div>
</template>
<script>
  export default {
    data() {
      return {  
        isuniqueopened:true,
        collapse:false,
        menu:[
                     { title: '学员问题', submenu:
                        [
                            { text: '内容管理', path: '/admin/student/content/list' },
                            { text: '类别管理', path: '/admin/student/category/list' },
                            { text: '评论管理', path: '/admin/student/comment/list' },
                        ]
                    },
                    { title: '前端技术', submenu:
                        [
                            { text: '内容管理', path: '/admin/web/content/list' },
                            { text: '类别管理', path: '/admin/web/category/list' },
                            { text: '评论管理', path: '/admin/web/comment/list' },
                        ]
                    },
                    { title: '难点答疑', submenu:
                        [
                            { text: '内容管理', path: '/admin/difficulty/content/list' },
                            { text: '类别管理', path: '/admin/difficulty/category/list' },
                            { text: '评论管理', path: '/admin/difficulty/comment/list' },
                        ]
                    },
                    { title: '资源下载', submenu:
                        [
                            { text: '内容管理', path: '/admin/assets/content/list' },
                            { text: '类别管理', path: '/admin/assets/category/list' },
                            { text: '评论管理', path: '/admin/assets/comment/list' },
                        ]
                    },
                    { title: '商品管理', submenu:
                        [
                            { text: '内容管理', path: '/admin/goods/comment' },
                            { text: '类别管理', path: '/admin/goods/list' },
                            { text: '评论管理', path: '/admin/goods/detail' },
                        ]
                    },
                    { title: '订单管理', submenu:
                        [
                            { text: '订单列表', path: '/admin/order/content/list' },
                        ]
                    }
        ],
        
      };
    },
    computed: {
        isCollapse(){
            return this.$store.state.isCollapse
        }  
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .aside{
        line-height: 0;
        .aside_logo{
            width: 100%;
            height: 60px;
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        }
        .el-menu-vertical-demo{
            background-color: #267cb7;
        }
        .el-menu{
            border: none;
        }
        .el-icon-document{
            padding-left: 30px;
        }
        
    }
</style>