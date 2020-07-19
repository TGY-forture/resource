import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'   //引入axios

import Antd from 'ant-design-vue'   //引入全部ant-design-vue组件
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

axios.defaults.baseURL = 'http://localhost:3000';  //axois默认配置
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true  //跨域时使用凭证
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
