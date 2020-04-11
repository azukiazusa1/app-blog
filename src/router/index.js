import Vue from 'vue'
import VueRouter from 'vue-router'
import User from './user'
import Admin from './admin'
import Login from '@/views/Login'
import { auth } from '@/plugins/auth'

Vue.use(VueRouter)

const routes = [User, Admin, 
  {
    name: 'login',
    path: '/admin/login',
    component: Login,
    beforeEnter: ((to, from, next) => {
      auth().then(user => {
        // すでにログイン済
        if (user) {
          next({ path: '/admin'})
        } else {
          next()
        }
      })
    }),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
