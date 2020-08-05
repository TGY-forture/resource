import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {axios} from './assets/js/axios'

import Antd from 'ant-design-vue'   //引入全部ant-design-vue组件
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

Vue.prototype.$axios = axios;     //将axios绑定到Vue的原型上

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
