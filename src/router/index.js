import Vue from 'vue'
import VueRouter from 'vue-router'
import {docCookies} from '../assets/js/cookie'
import {message} from 'ant-design-vue'
import store from '../store/index'

const home = () => import('../components/home/home.vue')
const search = () => import('../components/search/search.vue')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;  //同路径跳转报错解决
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

function beforeEnter(to, from, next) {  //注意跳转逻辑，防止递归跳转，-_-
  const username = docCookies.getItem('username')
  if (!from.name) { //通过浏览器URL访问时，直接回到首页
    next('/home');
    return
  }
  let toroute = to.name
  if (username && store.getters.stranger === false) {
    next()
  } else if (!username) {
    message.warning('请先去登录')
    next(false)
  } else {
    if (toroute === 'user') {
      next()
    } else {
      message.warning('请完成员工认证')
      next(false)
    }
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/log',
    name: 'log',
    component: () => import('../components/home/log.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../components/home/sign.vue')       
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }, 
  {
    path: '/plus',
    name: 'plus',
    beforeEnter,
    component: () => import('../components/plus/plus.vue')
  },
  {
    path: '/record',
    name: 'record',
    beforeEnter,
    component: () => import('../components/record/record.vue')
  },
  {
    path: '/user',
    name: 'user',
    beforeEnter,
    component: () => import('../components/user/user.vue')
  },
  {
    path: '/safety-certificate',
    name: 'safety-certificate',
    component: () => import('../components/safety-certificate/safety-certificate.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../components/help/help.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
