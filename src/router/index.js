import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import BootstrapVue from 'bootstrap-vue'
import Signup from '@/views/Signup.vue'
import Signin from '@/views/Signin.vue'
import MySalonInfo from '@/views/MySalonInfo.vue'
import Home  from '@/views/Home.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

  const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/mysaloninfo',
    name: 'MySalonInfo',
    component: MySalonInfo,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
