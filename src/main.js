import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'   //引入全部ant-design-vue组件
import 'ant-design-vue/dist/antd.css'
import {notification} from 'ant-design-vue'
Vue.use(Antd)
Vue.prototype.$notification = notification

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
