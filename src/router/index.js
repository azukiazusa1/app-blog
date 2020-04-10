import Vue from 'vue'
import VueRouter from 'vue-router'
import User from './user'
import Admin from './admin'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [User, Admin, 
  {
    name: 'login',
    path: '/admin/login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
