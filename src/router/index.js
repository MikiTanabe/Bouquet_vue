import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import BootstrapVue from 'bootstrap-vue'
import Signup from '@/views/Signup.vue'
import Signin from '@/views/Signin.vue'
import Home  from '@/views/Home.vue'
import MyEventInfo from '@/views/MyEventInfo'
import EventInfoEdit from '@/views/EventInfoEdit'
import ProfileSample from '@/views/ProfileSample'
import MyPageTop from '@/components/MyPageTop'
import Profile from '@/components/ProfilePanel'
import SalonInfoPanel from '@/components/SalonInfoPanel'

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
    meta: { requiresAuth: true },
    children: [
      {
        path: 'mysaloninfo',
        component: SalonInfoPanel
      },
      {
        path: 'mypagetop',
        component: MyPageTop
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'myeventinfo',
        component: MyEventInfo
      },
      {
        path: 'eventinfoedit',
        name: 'EventEdit',
        component: EventInfoEdit,
        props: true
      },
      {
        path: 'profilesample',
        component: ProfileSample
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
