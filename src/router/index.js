import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../components/home/home.vue')
const search = () => import('../components/search/search.vue')

Vue.use(VueRouter)

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
    component: () => import('../components/plus/plus.vue'),
    children: [
      {
        path: 'stepone',
        name: 'stepone',
        component: () => import('../components/plus/steps/stepone.vue')
      },
      {
        path: 'steptwo',
        name: 'steptwo',
        component: () => import('../components/plus/steps/steptwo.vue')
      },
      {
        path: 'stepthree',
        name: 'stepthree',
        component: () => import('../components/plus/steps/stepthree.vue')
      }
    ]
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../components/edit/edit.vue')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
