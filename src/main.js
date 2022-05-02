// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 项目核心文件
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store';

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({  //定义了一个VUE对象
  el: '#app',  //vue对象的id是app
  store,
  router,
  components: { App },  //vue的组件名是APP
  template: '<App/>'  //template 名是APP
})
