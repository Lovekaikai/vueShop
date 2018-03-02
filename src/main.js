import Vue from 'vue';
import App from './components/App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api, { domain } from './js/api'
import store from "./components/store/index"
import axios from 'axios'

import  'normalize.css'
import  './less/index.less'

Vue.prototype.$http=axios;
axios.defaults.baseURL = domain;
axios.defaults.withCredentials = true;
Vue.prototype.$api=api;

Vue.use(ElementUI)

new  Vue({
    el:'#app',
    store,
    router: router,
    render: createElement => createElement(App)
})