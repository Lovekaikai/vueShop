import Vue from 'vue' 
import VueRouter from 'Vue-router'//基于vue的插件
import Login from '../components/login/Login.vue';
import admin from '../components/admin/admin.vue';
import Header from '../components/admin/subCom/Header.vue';
import Aside from '../components/admin/subCom/Aside.vue';

import goodComment from '../components/goods/comment/comment.vue'
import goodDetail from '../components/goods/detail/detail.vue'
import goodList from '../components/goods/list/list.vue'


const goods=[
    {"name":'goodComment',path:'goods/comment',component:goodComment},
    { "name": 'goodList', path: 'goods/list', component:goodList},
    { "name": 'goodDetail', path: 'goods/detail/:id', component: goodDetail},
]
Vue.use(VueRouter);


let router= new VueRouter({
    routes:[
        {
            path:'/',redirect: "/login"
        },
        {
            name: 'login', path: '/login', component: Login
        },
        {
            name: 'admin', path: '/admin', component: admin,
            children:[...goods]
        }
    ]    
})


router.beforeEach((to, from, next) => {

           Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res => {
                   let isLogin = false;
                       if (res.data.code == 'logined') {
                               isLogin = true;
                           }
                       if (to.name == 'login') {
                               if (isLogin) {
                                       next({ name: 'admin'});
                                   } else {
                                       next();
                                   }
                           }
                       if (to.name != 'login') {
                               if (isLogin) {
                                       next();
                                   } else {
                                       next({ name: 'login',query:{next:to.fullPath} });
                                   }
                           }
               })
       }); 
export default router;