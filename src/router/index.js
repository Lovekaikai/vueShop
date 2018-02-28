import Vue from 'vue' 
import VueRouter from 'Vue-router'//基于vue的插件
import Login from '../components/login/Login.vue';
import admin from '../components/admin/admin.vue';
import Header from '../components/admin/subCom/Header.vue';
import Aside from '../components/admin/subCom/Aside.vue';



Vue.use(VueRouter);


export default new VueRouter({
    routes:[
        {
            name: 'login', path: '/login', component: Login
        },
        {
            name: 'admin', path: '/admin', component: admin
        }
    ]    
})