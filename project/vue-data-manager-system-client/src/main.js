import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import axios from 'axios'
import VueAxios from 'vue-axios';
import {routes} from "./routes/routes.js";
import VueRouter from "vue-router";
import store from "./store/store.js";


import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)
console.log(routes)
Vue.use(VueRouter)
var router = new VueRouter({
    routes
})
console.log(router)
Vue.use(VueAxios, axios)

Vue.use(iView);

new Vue({
  el: '#app',
    router,
    store,
  render: h => h(App)
})
