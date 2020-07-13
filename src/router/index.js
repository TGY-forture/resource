import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../components/home/home.vue')
const search = () => import('../components/search/search.vue')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
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
    component: () => import('../components/plus/plus.vue')
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('../components/record/record.vue')
  },
  {
    path: '/user',
    name: 'user',
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
